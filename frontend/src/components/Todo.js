import React, { useState } from "react";

const Todo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="glass-container">
      <div className="todo-header">
        <h1 className="todo-title">✨ Todo Paradise</h1>
        <p className="todo-subtitle">Organize your life in style</p>
      </div>

      <form className="todo-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="todo-input"
            placeholder="What needs to be done today?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            className="todo-input"
            placeholder="Add some details... (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="todo-button">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default Todo;
