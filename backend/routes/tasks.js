const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// POST /api/tasks: Add a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to add task', details: err });
  }
});

// GET /api/tasks: Retrieve all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ error: 'Failed to fetch tasks', details: err });
  }
});

// PUT /api/tasks/:id: Update a task by its ID
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update task', details: err });
  }
});
// PUT: Update a task by ID
router.put('/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(task);
    } catch (err) {
      res.status(400).json({ message: 'Error updating task', error: err });
    }
  });
  
// DELETE /api/tasks/:id: Delete a task by its ID
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete task', details: err });
  }
});

module.exports = router;
