import { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./Todo";
import ListTodo from "./ListTodo";
const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (title, description) => {
    console.log(title, description);
    await axios.post("http://localhost:5001/api/todos", { title, description });
    await fetchTodos();
  };

  const updateTodo = (id) => {
    console.log(id);
  };

  const deleteTodo = async (id) => {
    console.log(id);
    await axios.delete(`http://localhost:5001/api/todos/${id}`);
    await fetchTodos();
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/todos");
      const data = await response.json();
      console.log(data);
      setTodos(data.todos);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch todos");
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <Todo addTodo={addTodo} />
        <br />
        <br />
        <br />
        {todos.map((todo) => (
          <ListTodo
            key={todo._id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
      {todos.length === 0 && <p>No todos found</p>}
    </div>
  );
};

export default Todos;
