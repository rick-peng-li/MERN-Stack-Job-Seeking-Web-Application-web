import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { config } from "./config/env.js";
import { uploadsDir } from "./utils/upload.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(
  cors({
    origin: config.frontendUrls.length ? config.frontendUrls : true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

// Uploaded resumes (local storage fallback)
app.use("/uploads", express.static(uploadsDir));

// API routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/api/v1/application", applicationRoutes);

// Serve the built client (production / Docker single-container mode)
const publicDir = path.resolve(__dirname, "public");
if (fs.existsSync(path.join(publicDir, "index.html"))) {
  app.use(express.static(publicDir));
  app.use((req, res, next) => {
    const isApiOrUploads = req.path.startsWith("/api/") || req.path.startsWith("/uploads/");
    if (req.method === "GET" && !isApiOrUploads) {
      return res.sendFile(path.join(publicDir, "index.html"));
    }
    next();
  });
}

app.use(notFound);
app.use(errorHandler);

export default app;
