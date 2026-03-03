import mongoose from "mongoose";

export const mongoDB = async () => {
  try {
    await mongoose.connect(process.meta.MONGODB_URI);
    console.log("Database connected sucessfully...");
  } catch (error) {
    console.log("Mongo Db connection error");
  }
};
