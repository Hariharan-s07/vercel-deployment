This project is set up as a standard MERN stack application. To deploy the frontend to Vercel, you need to ensure the Vercel build process knows how to handle the Vite build and where to find the output.

### 1. Add `vercel.json` (Optional but Recommended)
Create a `vercel.json` file in the `client` directory to handle single-page application routing (so refreshing pages works).

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### 2. Configure Vercel Project
1.  **Login to Vercel**: Go to [vercel.com](https://vercel.com) and log in.
2.  **Add New Project**: Click "Add New..." -> "Project".
3.  **Import Repository**: Select the Git repository containing your project.
4.  **Configure Project Settings**:
    *   **Root Directory**: Click "Edit" and select `client`. (This is crucial because your frontend is in a subdirectory).
    *   **Framework Preset**: Select "Vite".
    *   **Build Command**: `npm run build` (Default should be correct).
    *   **Output Directory**: `dist` (Default should be correct).
5.  **Environment Variables**:
    *   You likely need to set the API URL so your frontend knows where the backend is.
    *   In your code (`client/src/api/axios.js`), you are currently pointing to `http://localhost:5000/api`. You will need to change this to an environment variable.
    *   Update `client/src/api/axios.js`:
        ```javascript
        const api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', // Use env var
            withCredentials: true,
        });
        ```
    *   In Vercel Settings -> Environment Variables, add:
        *   `VITE_API_URL`: The URL of your **deployed backend** (e.g., `https://my-task-api.onrender.com/api`).
        *   *Note: You cannot put localhost here. You MUST deploy the backend first (e.g. to Render).*

### 3. Deploy
Click **Deploy**. Vercel will install dependencies, run the build script, and host the `dist` folder.
