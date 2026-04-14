import dotenv from "dotenv";
import app from "./app.js";
import { startWhatsAppBot, stopWhatsAppBot } from "./services/whatsappBot.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

/**
 * Graceful shutdown — called on SIGINT / SIGTERM.
 * Stops the WhatsApp bot (destroys Puppeteer browser) before exiting
 * so nodemon restarts don't leave zombie Chrome processes.
 */
async function gracefulShutdown(signal) {
  console.log(`\n${signal} received — shutting down gracefully...`);
  await stopWhatsAppBot();
  process.exit(0);
}

process.on("SIGINT",  () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    // Start the WhatsApp auto-reply bot
    startWhatsAppBot();
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
