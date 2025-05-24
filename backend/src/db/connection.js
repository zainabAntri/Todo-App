import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // mongodb connection string mongodb://localhost:27017/
    const MONGO_URI = "mongodb://localhost:27017/todos-db";
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log(error);
  }
};

export { connectDB };
