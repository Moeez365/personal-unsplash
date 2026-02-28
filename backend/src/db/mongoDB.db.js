import mongoose from "mongoose";

export const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/unsplash");
    console.log("Database connected sucessfully...");
  } catch (error) {
    console.log("Mongo Db connection error");
  }
};
