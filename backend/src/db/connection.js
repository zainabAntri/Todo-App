import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // mongodb connection string
    const MONGO_URI = "mongodb://todoUser:todoPassword@localhost:27017/todo-db";
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
