import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://server:5000/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const addTask = (text) => {
    fetch("http://server:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    })
      .then((res) => res.json())
      .then((newTask) => setTasks((prev) => [...prev, newTask]))
      .catch((err) => console.error("Error adding task:", err));
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} />
    </div>
  );
}

export default App;
