import "dotenv/config";

const env = (key, fallback = "") => process.env[key] || fallback;

export const config = {
  port: Number(env("PORT", "4000")),
  mongoUri: env("MONGO_URI", "mongodb://127.0.0.1:27017"),
  dbName: "MERN_JOB_SEEKING_WEBAPP",
  jwtSecret: env("JWT_SECRET_KEY", "jobzee_jwt_secret_key_2024"),
  jwtExpires: env("JWT_EXPIRES", "7d"),
  cookieExpireDays: Number(env("COOKIE_EXPIRE", "7")),
  frontendUrls: env("FRONTEND_URL")
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean),
  cloudinary: {
    cloudName: env("CLOUDINARY_CLIENT_NAME"),
    apiKey: env("CLOUDINARY_CLIENT_API"),
    apiSecret: env("CLOUDINARY_CLIENT_SECRET"),
  },
  isProduction: env("NODE_ENV") === "production",
};
