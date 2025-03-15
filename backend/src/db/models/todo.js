import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    isCompleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todos", todoSchema);

export default Todo;
