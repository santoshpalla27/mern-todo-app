import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then((response) => response.json())
            .then((data) => setTasks(data));
    }, []);

    const addTask = () => {
        if (taskText.trim() === '') return;
        fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText }),
        }).then((res) => res.json()).then((task) => {
            setTasks([...tasks, task]);
            setTaskText('');
        });
    };

    const toggleTask = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, { method: 'PUT' })
            .then((res) => res.json())
            .then((updatedTask) => {
                setTasks(tasks.map((task) => task._id === updatedTask._id ? updatedTask : task));
            });
    };

    const deleteTask = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
            .then(() => setTasks(tasks.filter((task) => task._id !== id)));
    };

    return (
        <div className="container">
            <h1>To-Do List</h1>
            <div className="task-input">
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Add a task"
                />
                <button onClick={addTask}>Add</button>
            </div>
            <ul className="task-list">
                {tasks.map((task) => (
                    <li
                        key={task._id}
                        className={task.completed ? 'completed' : ''}
                        onClick={() => toggleTask(task._id)}
                    >
                        {task.text}
                        <button onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task._id);
                        }}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
