import mongoose from "mongoose";

export const ConnectToDB = async () => {
  try {
    // await mongoose.connect(process.env.DATABASE_URL);
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DB connection established");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
