import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://backend:5000";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    axios.get(`${BASE_URL}/todos`).then((response) => setTodos(response.data));
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      axios.post(`${BASE_URL}/todos`, { title: newTodo }).then((response) => {
        setTodos([...todos, response.data]);
        setNewTodo("");
      });
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`${BASE_URL}/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.title}
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
