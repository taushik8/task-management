const express = require('express');
const router = express.Router();
const Task = require('../schema/taskSchema');
const auth = require('../middelware/auth');
const { z } = require('zod');

const taskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    status: z.enum(['pending', 'in-progress', 'completed']),
    dueDate: z.string().optional(),
});

// Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
    console.log(req.user)
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a task
router.post('/', auth, async (req, res) => {
    try {
        const taskData = {
            ...req.body,
            status: req.body.status || 'pending',  
            user: req.user._id  
        };

        const result = taskSchema.safeParse(taskData);
        if (!result.success) {
            return res.status(400).json(result.error.errors);
        }

        const task = await Task.create(taskData);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.updateOne({ _id: task._id }, { $set: req.body });
        const updatedTask = await Task.findById(task._id);

        res.status(200).json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
