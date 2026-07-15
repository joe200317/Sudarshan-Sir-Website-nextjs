import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { connectDb } from "./lib/db.js";
import { errorHandler } from "./middleware/error.js";
import authRoutes from "./routes/auth.js";
import usersRoutes from "./routes/users.js";
import programsRoutes from "./routes/programs.js";
import workshopsRoutes from "./routes/workshops.js";
import eventsRoutes from "./routes/events.js";
import uploadRoutes from "./routes/upload.js";

const PORT = Number(process.env.PORT || 4000);
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mindtrainer";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

async function main() {
  await connectDb(MONGODB_URI);

  const app = express();

  app.use(
    cors({
      origin: FRONTEND_URL,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "2mb" }));
  app.use(cookieParser());
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, service: "mindtrainer-api" });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/users", usersRoutes);
  app.use("/api/programs", programsRoutes);
  app.use("/api/workshops", workshopsRoutes);
  app.use("/api/events", eventsRoutes);
  app.use("/api/upload", uploadRoutes);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`API running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
