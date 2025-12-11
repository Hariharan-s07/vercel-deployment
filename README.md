# MERN Task Management System

A production-grade Task Management Application built with the MERN stack (MongoDB, Express, React, Node.js). 🚀 Deployed & Live!

## Features

- **Authentication**: Secure JWT-based auth with Refresh Tokens and HttpOnly cookies.
- **Role-Based Access Control**:
    - **Admin**: Create users, create/delete tasks, assign tasks to members.
    - **Member**: View assigned tasks, update task status (Todo/In Progress/Done).
- **Task Management**: Create, Read, Update, Delete (CRUD) with strict validation.
- **Security**: Rate limiting, Helmet protections, Zod input validation.
- **Responsive Design**: Modern glassmorphism UI with React and Redux Toolkit.

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Router, Vite, Axios, React Toastify.
- **Backend**: Node.js, Express, MongoDB (Mongoose), BCrypt, JWT.
- **Styling**: Vanilla CSS with CSS Variables and Flexbox/Grid.

## Getting Started

1.  **Server Setup**:
    ```bash
    cd server
    npm install
    npm run dev
    ```
2.  **Client Setup**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

## Deployment

 See `DEPLOY_FRONTEND.md` for frontend deployment instructions.
