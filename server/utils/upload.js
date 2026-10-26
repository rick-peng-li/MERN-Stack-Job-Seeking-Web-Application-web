import cloudinary from "cloudinary";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import { ApiError } from "../middleware/errorHandler.js";
import { config } from "../config/env.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resumes are stored locally when Cloudinary is not configured
export const uploadsDir = path.resolve(__dirname, "../uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const cloudinaryConfigured = Boolean(config.cloudinary.cloudName);

if (cloudinaryConfigured) {
  cloudinary.v2.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
  });
}

export const RESUME_MIME_TYPES = ["image/png", "image/jpeg", "image/webp"];

export const uploadResume = async (file) => {
  if (cloudinaryConfigured) {
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath);
    if (!result || result.error) {
      throw new ApiError("Failed to upload Resume to Cloudinary", 500);
    }
    return { public_id: result.public_id, url: result.secure_url };
  }

  const ext = path.extname(file.name) || ".png";
  const fileName = `resume_${Date.now()}_${Math.round(Math.random() * 1e9)}${ext}`;
  await file.mv(path.join(uploadsDir, fileName));
  return { public_id: fileName, url: `/uploads/${fileName}` };
};
