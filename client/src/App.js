import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');

  // Fetch ToDo items from the backend
  useEffect(() => {
    axios.get('/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add a new ToDo item
  const addTodo = () => {
    axios.post('/api/todos', { text })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.error(err));
    setText('');
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
      <input 
        value={text} 
        onChange={e => setText(e.target.value)} 
        placeholder="Add a new task"
      />
      <button onClick={addTodo}>Add Todo</button>
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