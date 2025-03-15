import { connectDB } from "../db/connection.js";
import Todo from "../db/models/todo.js";

async function getTodo(req, res) {
  try {
    // Step1 : Connect to the database
    await connectDB();

    // Step2 : Fetch all todos from the database
    const todos = await Todo.find({});

    // Step3 : Send the todos to the client
    res.status(200).json({
      todos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default getTodo;
