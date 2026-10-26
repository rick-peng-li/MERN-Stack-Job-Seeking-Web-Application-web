import app from "./app.js";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { autoSeed } from "./utils/seed.js";

const startServer = async () => {
  await connectDB();
  await autoSeed();
  app.listen(config.port, () => {
    console.log(`Server running at port ${config.port}`);
  });
};

startServer();
