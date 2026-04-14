import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// Webhook handling (Placeholder for external integrations)
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  res.status(200).json({ success: true });
});

// Serve frontend static files
const distPath = path.join(__dirname, "../../../dist");
app.use(express.static(distPath));

// Handle React routing, return all requests to React app
app.get("*", (req, res, next) => {
  if (req.url.startsWith("/api") || req.url.startsWith("/webhook")) {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) {
      // If index.html not found, fall back to 404
      next();
    }
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});

export default app;
