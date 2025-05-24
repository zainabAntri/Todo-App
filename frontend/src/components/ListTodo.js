import React from "react";

const ListTodo = ({ todo, updateTodo, deleteTodo, editTodo }) => {
  return (
    <div className={`todo-item ${todo.isCompleted ? "completed" : ""}`}>
      <div className="todo-content">
        <h3 className="todo-item-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-item-description">{todo.description}</p>
        )}
      </div>

      <div className="todo-actions">
        <button
          className={`action-btn ${todo.isCompleted ? "complete" : "complete"}`}
          onClick={() => updateTodo(todo._id)}
          title={todo.isCompleted ? "Mark as incomplete" : "Mark as complete"}
        >
          {todo.isCompleted ? "↩ Undo" : "✓ Done"}
        </button>

        <button
          className="action-btn edit"
          onClick={() => editTodo(todo)}
          title="Edit task"
        >
          ✏️ Edit
        </button>

        <button
          className="action-btn delete"
          onClick={() => deleteTodo(todo._id)}
          title="Delete task"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default ListTodo;
