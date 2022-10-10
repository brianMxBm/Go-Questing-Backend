import mongoose from "mongoose";

const connectDB = () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI not found");
    }

    mongoose.connect(process.env.MONGO_URI);
  } catch (e) {
    if (typeof e === "string") {
      throw new Error(e);
    } else if (e instanceof Error) {
      throw new Error(e.message);
    }

    process.exit(1);
  }
};

export { connectDB };
