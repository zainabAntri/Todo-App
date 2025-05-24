import React from "react";
import { useState } from "react";

const ListEditForm = () => {
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(description);
    setDescription("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Update Todo</h2>
        <input
          type="text"
          placeholder="Enter updated description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="update-btn" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default ListEditForm;
