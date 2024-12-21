const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

router.get('/todos', todoController.getTodos);
router.post('/todos', todoController.createTodo);
router.delete('/todos/:id', todoController.deleteTodo);

module.exports = router;