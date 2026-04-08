/**
 * WhatsApp Multi-Step Onboarding Bot for KRGO
 * ─────────────────────────────────────────────
 * Conversation flow:
 *
 *  STEP 0: User sends trigger → Bot asks for name
 *  STEP 1: User replies with name → Bot asks website type
 *  STEP 2: User selects type (1-6) → Bot asks time slot
 *  STEP 3: User selects time (1-8) → Bot asks date
 *  STEP 4: User selects date (1-5) → Bot confirms & schedules Google Calendar
 */

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

import {
  TRIGGER_MESSAGE,
  ASK_NAME_MESSAGE,
  WEBSITE_TYPE_MESSAGE,
  TIME_SLOT_MESSAGE,
  DATE_MESSAGE,
  INVALID_NUMBER_MESSAGE,
  MAX_ATTEMPTS_MESSAGE,
  BOOKING_CONFIRMED,
  COOLDOWN_MS,
  WEBSITE_TYPES,
  VALID_TIME_SLOTS,
  getNext5WorkingDays,
} from "../config/whatsappConfig.js";

// ── Conversation State ────────────────────────────────────────────────────────
// Tracks each contact's position in the flow:
//   step        → 0=idle, 1=name, 2=website, 3=time, 4=date
//   name        → User's name
//   websiteType → Selected website type
//   timeSlot    → Selected time slot
//   date        → Selected date
//   dates       → Array of dates sent to user
//   attempts    → invalid attempts in current step
//   lastDone    → timestamp when flow last completed (for cooldown)

const conversations = new Map();

function getState(contactId) {
  if (!conversations.has(contactId)) {
    conversations.set(contactId, { 
      step: 0, 
      attempts: 0, 
      lastDone: null,
      name: "",
      websiteType: "",
      timeSlot: "",
      dateLabel: "",
      dateObj: null,
      dates: []
    });
  }
  return conversations.get(contactId);
}

function resetState(state) {
  state.step = 0;
  state.attempts = 0;
  state.name = "";
  state.websiteType = "";
  state.timeSlot = "";
  state.dateLabel = "";
  state.dateObj = null;
  state.dates = [];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function isInCooldown(state) {
  if (!state.lastDone) return false;
  return Date.now() - state.lastDone < COOLDOWN_MS;
}

function parseNumber(text) {
  const num = parseInt(text.trim(), 10);
  return isNaN(num) ? null : num;
}

async function handleInvalidAttempt(state, message, maxOptions, contactId) {
  state.attempts++;
  if (state.attempts >= 3) {
    await message.reply(MAX_ATTEMPTS_MESSAGE);
    console.log(`⚠️  [${contactId}] Max attempts reached. Resetting flow.`);
    resetState(state);
  } else {
    await message.reply(INVALID_NUMBER_MESSAGE(maxOptions));
    console.log(`⚠️  [${contactId}] Invalid attempt ${state.attempts}`);
  }
}

// ── Bot Client ────────────────────────────────────────────────────────────────

let botClient = null;

export async function stopWhatsAppBot() {
  if (botClient) {
    try {
      console.log("🛑 Shutting down WhatsApp Bot...");
      await botClient.destroy();
      console.log("✅ WhatsApp Bot stopped cleanly.");
    } catch {
      try { botClient.pupBrowser?.process()?.kill("SIGKILL"); } catch {}
    }
    botClient = null;
  }
}

export function startWhatsAppBot() {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
  });

  botClient = client;

  client.on("qr", (qr) => {
    console.log("\n╔══════════════════════════════════════════════╗");
    console.log("║   Scan this QR code with WhatsApp to login   ║");
    console.log("╚══════════════════════════════════════════════╝\n");
    qrcode.generate(qr, { small: true });
  });

  client.on("ready", () => console.log("✅ WhatsApp Bot is connected and ready!"));
  client.on("authenticated", () => console.log("🔐 WhatsApp session authenticated."));
  client.on("auth_failure", (msg) => console.error("❌ WhatsApp authentication failed:", msg));
  client.on("disconnected", (reason) => console.warn("⚠️  WhatsApp disconnected:", reason));

  client.on("message", async (message) => {
    try {
      if (message.from.includes("@g.us")) return;
      if (message.fromMe) return;

      const contactId = message.from;
      const text = message.body.trim();
      const state = getState(contactId);

      // ── STEP 0: Trigger message ──────────────────────────────────
      if (text === TRIGGER_MESSAGE) {
        if (isInCooldown(state)) {
          console.log(`⏳ Cooldown active for ${contactId}, ignoring.`);
          return;
        }
        resetState(state);
        state.step = 1;
        await message.reply(ASK_NAME_MESSAGE);
        console.log(`🟢 [${contactId}] Flow started → Awaiting Name`);
        return;
      }

      // ── STEP 1: Awaiting Name ────────────────────────────────────
      if (state.step === 1) {
        state.name = text;
        state.step = 2;
        state.attempts = 0;
        await message.reply(WEBSITE_TYPE_MESSAGE(state.name));
        console.log(`📋 [${contactId}] Name received: ${state.name} → Sent Website Type Menu`);
        return;
      }

      // ── STEP 2: Awaiting Website Type (1-6) ──────────────────────
      if (state.step === 2) {
        const choice = parseNumber(text);
        if (choice && choice >= 1 && choice <= WEBSITE_TYPES.length) {
          state.websiteType = WEBSITE_TYPES[choice - 1];
          state.step = 3;
          state.attempts = 0;
          await message.reply(TIME_SLOT_MESSAGE);
          console.log(`💻 [${contactId}] Website type: ${state.websiteType} → Sent Time Slot Menu`);
        } else {
          await handleInvalidAttempt(state, message, WEBSITE_TYPES.length, contactId);
        }
        return;
      }

      // ── STEP 3: Awaiting Time Slot (1-8) ─────────────────────────
      if (state.step === 3) {
        const choice = parseNumber(text);
        if (choice && choice >= 1 && choice <= VALID_TIME_SLOTS.length) {
          state.timeSlot = VALID_TIME_SLOTS[choice - 1].label;
          state.dates = getNext5WorkingDays();
          state.step = 4;
          state.attempts = 0;
          await message.reply(DATE_MESSAGE(state.dates));
          console.log(`🕒 [${contactId}] Time slot: ${state.timeSlot} → Sent Date Menu`);
        } else {
          await handleInvalidAttempt(state, message, VALID_TIME_SLOTS.length, contactId);
        }
        return;
      }

      // ── STEP 4: Awaiting Date (1-5) ──────────────────────────────
      if (state.step === 4) {
        const choice = parseNumber(text);
        if (choice && choice >= 1 && choice <= state.dates.length) {
          const selectedDate = state.dates[choice - 1];
          
          // Get the actual real phone number instead of the @lid or @c.us ID
          const contact = await message.getContact();
          const realPhoneNumber = contact.number || contactId.split("@")[0];

          // Cache the data locally and immediately reset state
          // This prevents concurrency issues if the user replies 'ok' while the webhook is running
          const finalData = {
            name: state.name,
            phone: realPhoneNumber,
            websiteType: state.websiteType,
            timeSlot: state.timeSlot,
            dateLabel: selectedDate.label
          };
          
          state.lastDone = Date.now();
          resetState(state); 
          
          await message.reply(BOOKING_CONFIRMED(finalData.name, finalData.websiteType, finalData.timeSlot, finalData.dateLabel));
          console.log(`📅 [${contactId}] Date: ${finalData.dateLabel}. Booking complete!`);

          // Send Google Sheet Notification via Webhook
          console.log(`🌐 [${contactId}] Sending data to Google Sheets webhook...`);
          try {
            const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
            if (webhookUrl) {
              const bookingData = {
                Name: finalData.name,
                Phone: finalData.phone,
                WebsiteType: finalData.websiteType,
                TimeSlot: finalData.timeSlot,
                DateLabel: finalData.dateLabel,
                Timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
              };

              await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
              });
              console.log(`✅ [${contactId}] Google Sheet updated successfully.`);
            } else {
              console.warn(`⚠️ [${contactId}] GOOGLE_SHEETS_WEBHOOK_URL is missing in .env! Data not saved to sheet.`);
            }
          } catch (sheetError) {
            console.error(`❌ [${contactId}] Failed to update Google Sheet:`, sheetError.message);
          }
        } else {
          await handleInvalidAttempt(state, message, state.dates.length, contactId);
        }
        return;
      }

    } catch (error) {
      console.error("❌ Error handling message:", error);
    }
  });

  console.log("🤖 Initializing WhatsApp Bot...");
  client.initialize().catch((err) => {
    console.error("❌ WhatsApp Bot failed to initialize:", err.message);
  });

  return client;
}
