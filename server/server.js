const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://mongo:27017/todo', { useNewUrlParser: true, useUnifiedTopology: true });

const Task = mongoose.model('Task', new mongoose.Schema({ text: String, completed: Boolean }));

app.get('/tasks', async (req, res) => res.json(await Task.find()));
app.post('/tasks', async (req, res) => res.json(await new Task(req.body).save()));
app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    task.completed = !task.completed;
    res.json(await task.save());
});
app.delete('/tasks/:id', async (req, res) => res.json(await Task.findByIdAndDelete(req.params.id)));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
