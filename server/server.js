const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const TaskSchema = new mongoose.Schema({
    text: String,
    completed: Boolean,
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

app.post('/tasks', async (req, res) => {
    const task = new Task({ text: req.body.text, completed: false });
    await task.save();
    res.json(task);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    await task.save();
    res.json(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
