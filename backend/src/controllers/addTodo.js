import { connectDB } from "../db/connection.js";
import Todo from "../db/models/todo.js";

const addTodo = async (req, res) => {
  // Step1 : Connect to the database
  await connectDB();

  // Step2 : Get the title and description from the request body
  const { title, description } = req.body;
  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }
  // Step3 : Create a new todo
  const todo = new Todo({ title, description, isCompleted: false });
  await todo.save();
  // successfully created
  res.status(201).json({ message: "Todo created successfully", todo });
};

export default addTodo;
