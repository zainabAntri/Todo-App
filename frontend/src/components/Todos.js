import { useState, useEffect } from "react";
import axios from "axios";
import Confetti from "react-confetti";
import Todo from "./Todo";
import ListTodo from "./ListTodo";
import EditTodo from "./EditTodo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  // Hide confetti after 3 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const addTodo = async (title, description) => {
    try {
      await axios.post("http://localhost:5001/api/todos", {
        title,
        description,
      });
      await fetchTodos();
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const updateTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      await axios.put(`http://localhost:5001/api/todos/${id}`, {
        isCompleted: !todo.isCompleted,
      });
      await fetchTodos();

      // Trigger confetti animation only when marking task as completed
      if (!todo.isCompleted) {
        setShowConfetti(true);
      }
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/todos/${id}`);
      await fetchTodos();
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  const editTodo = (todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const saveEditedTodo = async (id, title, description) => {
    try {
      await axios.put(`http://localhost:5001/api/todos/${id}`, {
        title,
        description,
      });
      await fetchTodos();
      setIsEditModalOpen(false);
      setEditingTodo(null);
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/todos");
      const data = await response.json();
      setTodos(data.todos);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch todos");
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="glass-container">
        <div className="empty-state">
          <div className="empty-state-icon">⏳</div>
          <div className="empty-state-text">Loading your tasks...</div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="glass-container">
        <div className="empty-state">
          <div className="empty-state-icon">⚠️</div>
          <div className="empty-state-text" style={{ color: "#f56565" }}>
            {error}
          </div>
        </div>
      </div>
    );

  return (
    <div className="App">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
        />
      )}
      <Todo addTodo={addTodo} />

      <div className="glass-container">
        <div className="todo-list-container">
          {todos.length > 0 ? (
            <div className="todo-list">
              {todos.map((todo) => (
                <ListTodo
                  key={todo._id}
                  todo={todo}
                  updateTodo={updateTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">🌟</div>
              <div className="empty-state-text">
                No tasks yet! Add your first task above to get started.
              </div>
            </div>
          )}
        </div>
      </div>

      <EditTodo
        todo={editingTodo}
        isOpen={isEditModalOpen}
        onSave={saveEditedTodo}
        onCancel={cancelEdit}
      />
    </div>
  );
};

export default Todos;
