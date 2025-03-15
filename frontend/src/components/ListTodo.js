import React from "react";

const ListTodo = ({ todo, updateTodo, deleteTodo }) => {
  return (
    <div>
      <h2>{todo.title}</h2>
      <p>{todo.description}</p>
      <p>Status: {todo.isCompleted ? "Completed" : "Not Completed"}</p>
      <button onClick={() => updateTodo(todo._id)}>Update</button>
      <button onClick={() => deleteTodo(todo._id)}>Delete</button>
    </div>
  );
};

export default ListTodo;
