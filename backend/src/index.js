import express from "express";
import { mongoDB } from "./db/mongoDB.db.js";
import { router } from "./router.js";
import { ApiError } from "./utils/errors.utils.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");

app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(router);

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.use((error, req, res, next) => {
  if (error instanceof ApiError) {
    console.log(error);
    res.status(error.statuscode).json({
      error: error.message,
      success: false,
    });
    return;
  }

  console.log(error);
  res.status(500).json({
    error: "internal server error",
    success: false,
  });
});

mongoDB();
app.listen(PORT, () => {
  console.log(`your app is running on port http://localhost:${PORT}`);
});
