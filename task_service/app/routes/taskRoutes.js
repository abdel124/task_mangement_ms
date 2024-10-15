const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Route to create a new task
router.post('/', taskController.createTask);

// Route to get all tasks by user ID
router.get('/user/:userId', taskController.getTasksByUserId);

// Route to get a specific task by user ID and task ID (optional)
router.get('/user/:userId/:taskId', taskController.getTaskById);

// Route to update a specific task by user ID and task ID (optional)
router.put('/user/:userId/:taskId', taskController.updateTask);

// Route to delete a specific task by user ID and task ID (optional)
router.delete('/user/:userId/:taskId', taskController.deleteTask);

module.exports = router;