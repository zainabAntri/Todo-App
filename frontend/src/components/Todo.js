import React, { useState } from "react";

const Todo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title, description);
    addTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};

export default Todo;
