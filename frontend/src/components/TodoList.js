import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${config.apiUrl}/todos`);
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
    window.addEventListener('todoUpdated', fetchTodos);
    return () => window.removeEventListener('todoUpdated', fetchTodos);
  }, []);

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${config.apiUrl}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <div key={todo._id} className="todo-item">
          <span>{todo.text}</span>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;