const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send("Error fetching tasks: " + error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).send("Error saving task: " + error.message);
  }
});

module.exports = router;
