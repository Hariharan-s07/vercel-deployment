const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
    }),
});

const loginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    }),
});

const createTaskSchema = z.object({
    body: z.object({
        title: z.string().min(1, 'Title is required').max(100, 'Title cannot exceed 100 characters'),
        description: z.string().min(1, 'Description is required').max(500, 'Description cannot exceed 500 characters'),
        assignedTo: z.string().min(1, 'Assigned user ID is required'),
    }),
});

const updateTaskSchema = z.object({
    body: z.object({
        title: z.string().max(100).optional(),
        description: z.string().max(500).optional(),
        status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']).optional(),
        assignedTo: z.string().optional(),
    }),
});

const createUserSchema = z.object({
    body: z.object({
        name: z.string().min(1, 'Name is required'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        role: z.enum(['ADMIN', 'MEMBER']).optional(),
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
    createTaskSchema,
    updateTaskSchema,
    createUserSchema
};
