import mongoose from "mongoose";

export const mongoDB = () => {
  try {
    mongoose.connect("mongodb://localhost:27017/unsplash");
    console.log("Database connected sucessfully...");
  } catch (error) {
    console.log("Mongo Db connection error");
  }
};
