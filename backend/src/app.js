import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import leadRoutes from "./routes/leadRoutes.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10kb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

app.use("/api/leads", leadRoutes);

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
