const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Todo = require("./models/Todo");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.json(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(5000, "0.0.0.0", () => console.log("Server running on port 5000"));
