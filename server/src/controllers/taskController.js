const Task = require('../models/Task');
const User = require('../models/User');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res, next) => {
    try {
        let query = {};
        if (req.user.role !== 'ADMIN') {
            query = { assignedTo: req.user._id };
        }

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const tasks = await Task.find(query)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 }) // Newest first
            .skip(skip)
            .limit(limit);

        const total = await Task.countDocuments(query);

        res.json({
            tasks,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create task
// @route   POST /api/tasks
// @access  Private (ADMIN)
const createTask = async (req, res, next) => {
    try {
        const { title, description, assignedTo } = req.body;

        const assignedUser = await User.findById(assignedTo);
        if (!assignedUser) {
            res.status(404);
            throw new Error('Assigned user not found');
        }

        const task = await Task.create({
            title,
            description,
            assignedTo,
            createdBy: req.user._id,
        });

        const populatedTask = await Task.findById(task._id)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email');

        res.status(201).json(populatedTask);
    } catch (error) {
        next(error);
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        if (req.user.role === 'ADMIN') {
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.status = req.body.status || task.status;
            // Handle assignedTo update if needed
            if (req.body.assignedTo) {
                const assignedUser = await User.findById(req.body.assignedTo);
                if (!assignedUser) {
                    res.status(404);
                    throw new Error('Assigned user not found');
                }
                task.assignedTo = req.body.assignedTo;
            }
        } else {
            if (task.assignedTo.toString() !== req.user._id.toString()) {
                res.status(403);
                throw new Error('Not authorized to update this task');
            }
            if (req.body.status) {
                task.status = req.body.status;
            }
        }

        const updatedTask = await task.save();
        const populatedTask = await Task.findById(updatedTask._id)
            .populate('assignedTo', 'name email')
            .populate('createdBy', 'name email');

        res.json(populatedTask);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (ADMIN)
const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            res.status(404);
            throw new Error('Task not found');
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        next(error);
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
