/**
 * WhatsApp Conversation Flow for KRGO
 * ─────────────────────────────────────
 * Multi-step onboarding bot:
 *  Step 0 → Trigger message → Ask for Name
 *  Step 1 → Save Name → Send Website Type Menu
 *  Step 2 → Save Website Type → Send Time Slot Menu
 *  Step 3 → Save Time Slot → Send Date Menu
 *  Step 4 → Save Date → Confirm Booking + Google Calendar
 */

// ── Step 0: Trigger & Name ───────────────────────────────────────────────────

export const TRIGGER_MESSAGE = "Hi, I want to get a website for my business.";

export const ASK_NAME_MESSAGE = `Hey! 👋 *Thanks for reaching out to KRGO!*
We'd love to help you build an amazing website for your business.

To get started, what is your name?`;

// ── Step 1: Website Type Menu ─────────────────────────────────────────────────

export const WEBSITE_TYPES = [
  "Portfolio/Resume",
  "E-commerce Store",
  "Landing Page",
  "Business/Corporate",
  "Blog/News",
  "Other",
];

export const WEBSITE_TYPE_MESSAGE = (name) => `Nice to meet you, *${name}*!

What kind of website do you need?
Please reply with a number:

1️⃣ Portfolio/Resume
2️⃣ E-commerce Store
3️⃣ Landing Page
4️⃣ Business/Corporate
5️⃣ Blog/News
6️⃣ Other`;

// ── Step 2: Time Slot Menu ────────────────────────────────────────────────────

export const VALID_TIME_SLOTS = [
  { label: "10:00 AM – 11:00 AM" },
  { label: "11:00 AM – 12:00 PM" },
  { label: "12:00 PM – 01:00 PM" },
  { label: "01:00 PM – 02:00 PM" },
  { label: "02:00 PM – 03:00 PM" },
  { label: "03:00 PM – 04:00 PM" },
  { label: "04:00 PM – 05:00 PM" },
  { label: "05:00 PM – 06:00 PM" },
];

export const TIME_SLOT_MESSAGE = `Great choice! When would you like to schedule a quick call to discuss the requirements?

Please reply with a number:

1️⃣ 10:00 AM – 11:00 AM
2️⃣ 11:00 AM – 12:00 PM
3️⃣ 12:00 PM – 01:00 PM
4️⃣ 01:00 PM – 02:00 PM
5️⃣ 02:00 PM – 03:00 PM
6️⃣ 03:00 PM – 04:00 PM
7️⃣ 04:00 PM – 05:00 PM
8️⃣ 05:00 PM – 06:00 PM`;

// ── Step 3: Date Menu (Dynamic) ───────────────────────────────────────────────

export function getNext5WorkingDays() {
  const dates = [];
  let d = new Date();
  while (dates.length < 5) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) { // Skip Sunday (0) and Saturday (6)
      // Format: "Mon, Apr 8"
      const options = { weekday: "short", month: "short", day: "numeric" };
      const formattedDate = d.toLocaleDateString("en-US", options);
      // We will also keep the raw Date object for calendar API
      dates.push({ label: formattedDate, dateObj: new Date(d) });
    }
  }
  return dates;
}

export const DATE_MESSAGE = (dates) => {
  let msg = `Which date works best for you?\n\nPlease reply with a number:\n\n`;
  dates.forEach((date, i) => {
    msg += `${i + 1}️⃣ ${date.label}\n`;
  });
  return msg;
};

// ── Response Templates ────────────────────────────────────────────────────────

export const INVALID_NUMBER_MESSAGE = (max) => `Invalid selection. Please reply with a number from 1 to ${max}.`;

export const BOOKING_CONFIRMED = (name, websiteType, timeSlot, dateLabel) =>
  `All set, *${name}*! ✅\n\nYour call to discuss a *${websiteType}* website has been scheduled for *${dateLabel} at ${timeSlot}*.\n\nWe look forward to speaking with you! 🚀\n\nThank you for choosing KRGO, have a wonderful day!`;

export const MAX_ATTEMPTS_MESSAGE = `It seems we're having trouble. Let's start over later. You can always reply with "${TRIGGER_MESSAGE}" when you're ready!`;

// Cooldown in ms — after completing the full flow, don't restart for 30 minutes
export const COOLDOWN_MS = 30 * 60 * 1000;
