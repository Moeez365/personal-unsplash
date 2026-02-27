import express from "express";
import { mongoDB } from "./db/mongoDB.db.js";
import { router } from "./router.js";
import { ApiError } from "./utils/errors.utils.js";

const app = express();
app.use(express.json());
const PORT = 5000;
app.use(router);

mongoDB();

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

app.listen(PORT, () => {
  console.log(`your app is running on port http://localhost:${PORT}`);
});
