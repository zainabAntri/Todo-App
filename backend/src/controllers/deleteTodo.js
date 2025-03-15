import Todo from "../db/models/todo.js";

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(200).json({ message: "Todo deleted successfully" });
};

export default deleteTodo;
