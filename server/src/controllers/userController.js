const User = require('../models/User');

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private (MEMBER/ADMIN)
const getMe = async (req, res) => {
    res.json(req.user);
};

// @desc    Get all users
// @route   GET /api/users
// @access  Private (ADMIN)
const getUsers = async (req, res, next) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @desc    Create a new user (Admin only)
// @route   POST /api/users
// @access  Private (ADMIN)
const createUser = async (req, res, next) => {
    try {
        const { name, email, password, role } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400);
            throw new Error('User already exists');
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || 'MEMBER'
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(400);
            throw new Error('Invalid user data');
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { getMe, getUsers, createUser };
