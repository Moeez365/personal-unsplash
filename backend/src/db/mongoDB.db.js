import mongoose from "mongoose";
import { Image } from "../models/collecton.models.js";

export const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://moeeznadeem58_db_user:xpRlRiWNHSUQ1Bzc@unsplash.ev77qjb.mongodb.net/?appName=Unsplash");
    console.log("Database connected sucessfully...");
  } catch (error) {
    console.log("Mongo Db connection error");
  }
};
