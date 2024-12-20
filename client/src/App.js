import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetch ToDo items from the backend when the component mounts
  useEffect(() => {
    axios.get('/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle form submission to add a new ToDo item
  const addTodo = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (text.trim() === '') return; // Prevent adding empty todos

    // Post the new ToDo item to the backend
    axios.post('/api/todos', { text })
      .then(res => {
        setTodos([...todos, res.data]); // Update the state with the new ToDo item
        setText(''); // Clear the input field after adding
      })
      .catch(err => console.error(err));
  };

  // Toggle the completed status of a ToDo item
  const toggleTodo = (id, completed) => {
    axios.patch(`/api/todos/${id}`, { completed })
      .then(res => setTodos(todos.map(todo => todo._id === id ? res.data : todo)))
      .catch(err => console.error(err));
  };

  // Delete a ToDo item
  const deleteTodo = id => {
    axios.delete(`/api/todos/${id}`)
      .then(() => setTodos(todos.filter(todo => todo._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={addTodo}>
        <input 
          value={text} 
          onChange={e => setText(e.target.value)} 
          placeholder="Add a new task"
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button onClick={() => toggleTodo(todo._id, !todo.completed)}>
              {todo.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;