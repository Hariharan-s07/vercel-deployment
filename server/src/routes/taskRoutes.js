const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, admin } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createTaskSchema, updateTaskSchema } = require('../utils/validationSchemas');

router.route('/')
    .get(protect, getTasks)
    .post(protect, admin, validate(createTaskSchema), createTask);

router.route('/:id')
    .put(protect, validate(updateTaskSchema), updateTask)
    .delete(protect, admin, deleteTask);

module.exports = router;
