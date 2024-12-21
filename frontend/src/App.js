import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const res = await axios.get('http://localhost:5000/api/tasks');
        setTasks(res.data);
    };

    const addTask = async () => {
        if (!task) return;
        await axios.post('http://localhost:5000/api/tasks', { task });
        setTask('');
        fetchTasks();
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add a new task..."
            />
            <button onClick={addTask}>Add</button>
            <ul>
                {tasks.map((t) => (
                    <li key={t._id}>
                        {t.task}
                        <button onClick={() => deleteTask(t._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;