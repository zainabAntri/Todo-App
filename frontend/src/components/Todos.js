import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import ListTodo from "./ListTodo";
import EditTodo from "./EditTodo";

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch todos from backend
  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/todos");
      const data = await response.json();
      setTodos(data.todos || []);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Add new todo
  const addTodo = async (title, description = "") => {
    try {
      const response = await fetch("http://localhost:5001/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        setTodos((prev) => [...prev, data.todo]);
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  // Update todo
  const updateTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      const response = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });
      const data = await response.json();
      if (response.ok) {
        setTodos((prev) => prev.map((t) => (t._id === id ? data.todo : t)));
      }
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Edit todo
  const editTodo = (todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  // Save edited todo
  const saveEditedTodo = async (id, title, description) => {
    try {
      const response = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });
      const data = await response.json();
      if (response.ok) {
        setTodos((prev) => prev.map((t) => (t._id === id ? data.todo : t)));
        setIsEditModalOpen(false);
        setEditingTodo(null);
      }
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  // Load todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const completedCount = todos.filter((todo) => todo.isCompleted).length;
  const pendingCount = todos.length - completedCount;

  return (
    <div className="todo-app-wrapper">
      {/* Add Todo Form */}
      <Todo addTodo={addTodo} />

      {/* Todo List */}
      <div className="todos-container">
        <div className="todos-header">
          <h2>Your Tasks</h2>
          <div className="todos-stats">
            <span className="todos-count pending">{pendingCount} Pending</span>
            <span className="todos-count completed">{completedCount} Done</span>
          </div>
        </div>

        {todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📝</div>
            <div className="empty-state-text">No tasks yet!</div>
            <div className="empty-state-subtext">
              Add your first task above to get started
            </div>
          </div>
        ) : (
          <div className="todos-list">
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
        )}
      </div>

      {/* Edit Modal */}
      <EditTodo
        todo={editingTodo}
        onSave={saveEditedTodo}
        onCancel={cancelEdit}
        isOpen={isEditModalOpen}
      />
    </div>
  );
};

export default Todos;
