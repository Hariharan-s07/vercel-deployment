const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Define allowed origins
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5000'
        ];

        // Allow Vercel deployments
        if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // For now, to prevent blocking valid deployments during testing, 
            // you might want to log this or be more permissive if needed.
            // But strict CORS is better.
            console.log('Blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Logger Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rate Limiting
const limiter = require('./middleware/rateLimit');
app.use(limiter);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
const { errorHandler } = require('./middleware/errorMiddleware');
app.use(errorHandler);

module.exports = app;
