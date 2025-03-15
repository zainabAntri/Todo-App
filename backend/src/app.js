// const express = require("express"); // CommonJS (Node.js)
import express from "express"; // ESM (ES6 Modules)
/**
 * What type of module loading is used in Node.js?
 * ESM (ES6 Modules)
 *
 * CommonJS (Node.js)
 */
import getTodo from "./controllers/getTodo.js";
import addTodo from "./controllers/addTodo.js";
import deleteTodo from "./controllers/deleteTodo.js";
import cors from "cors";
const app = express();
const port = 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(express.json());
app.use(cors());

app.get("/api/todos", getTodo);
app.post("/api/todos", addTodo);
app.delete("/api/todos/:id", deleteTodo);

// app.post("/api/todos", (req, res) => {
//   res.send("Hello World");
// });

// app.put("/api/todos/:id", (req, res) => {
//   res.send("Hello World");
// });

// app.delete("/api/todos/:id", (req, res) => {
//   res.send("Hello World");
// });
