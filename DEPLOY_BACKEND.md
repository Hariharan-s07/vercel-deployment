### Deploying Backend to Render.com

1.  **Preparation**:
    *   Ensure your code is pushed to GitHub.
    *   You need a MongoDB Database URL (connection string). If you are using local MongoDB, you need a cloud one. 
    *   **Get Free MongoDB**: Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register), create a free cluster, and get the connection string (username/password).

2.  **Create Service on Render**:
    *   Go to [dashboard.render.com](https://dashboard.render.com/).
    *   Click "New +" -> **Web Service**.
    *   Connect your GitHub Repository.

3.  **Configure Settings**:
    *   **Name**: `my-task-api` (or unique name).
    *   **Root Directory**: `server` (Important!).
    *   **Runtime**: Node.
    *   **Build Command**: `npm install`.
    *   **Start Command**: `npm start`.

4.  **Environment Variables** (Click "Add Environment Variable"):
    *   `NODE_ENV` = `production`
    *   `MONGO_URI` = `mongodb+srv://<user>:<password>@cluster0...` (Your Cloud DB URL).
    *   `JWT_SECRET` = `something_super_secret_and_long`.
    *   `JWT_REFRESH_SECRET` = `another_super_secret_string`.

5.  **Deploy**:
    *   Click **Create Web Service**.
    *   Wait for the deployment to finish.
    *   Copy the URL (e.g., `https://my-task-api.onrender.com`).

6.  **Final Step (Link Frontend)**:
    *   Go back to Vercel.
    *   Add Environment Variable: `VITE_API_URL` = `https://my-task-api.onrender.com/api`.
    *   Redeploy Frontend.
