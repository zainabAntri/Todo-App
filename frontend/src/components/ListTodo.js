import React from "react";

const ListTodo = ({ todo, updateTodo, deleteTodo, editTodo }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
      <div className="todo-content">
        <div className="todo-checkbox-wrapper">
          <input
            type="checkbox"
            className="todo-checkbox"
            checked={todo.isCompleted}
            onChange={() => updateTodo(todo._id)}
            id={`todo-${todo._id}`}
          />
          <label htmlFor={`todo-${todo._id}`} className="checkbox-label">
            <span className="checkmark">✓</span>
          </label>
        </div>

        <div className="todo-text">
          <h3 className="todo-item-title">{todo.title}</h3>
          {todo.description && (
            <p className="todo-item-description">{todo.description}</p>
          )}
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="action-btn edit"
          onClick={() => editTodo(todo)}
          title="Edit task"
          disabled={todo.isCompleted}
        >
          <span className="btn-icon">✏️</span>
          <span className="btn-text">Edit</span>
        </button>

        <button
          className="action-btn delete"
          onClick={() => deleteTodo(todo._id)}
          title="Delete task"
        >
          <span className="btn-icon">🗑️</span>
          <span className="btn-text">Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ListTodo;
