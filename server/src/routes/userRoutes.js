const express = require('express');
const router = express.Router();
const { getMe, getUsers, createUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { createUserSchema } = require('../utils/validationSchemas');

router.get('/me', protect, getMe);
router.route('/')
    .get(protect, admin, getUsers)
    .post(protect, admin, validate(createUserSchema), createUser);

module.exports = router;
