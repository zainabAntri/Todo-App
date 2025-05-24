import { connectDB } from "../db/connection.js";
import Todo from "../db/models/todo.js";

const updateTodo = async (req, res) => {
  try {
    // Step1: Connect to the database
    await connectDB();

    // Step2: Get the todo ID from the request parameters
    const { id } = req.params;

    // Step3: Get the update data from the request body
    const updateData = req.body;

    // Validate that we have some data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "No update data provided" });
    }

    // Step4: Find and update the todo
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      updateData,
      { new: true } // This option returns the updated document
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    // Step5: Send the updated todo back to the client
    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default updateTodo;
