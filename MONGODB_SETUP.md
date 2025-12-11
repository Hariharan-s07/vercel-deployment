### How to Get Your Free MongoDB Connection String

1.  **Create an Account**:
    *   Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
    *   Sign up (Google Sign-in is easiest).

2.  **Create a New Cluster**:
    *   You will see a "Deploy a cloud database" screen.
    *   Select **M0 Free** (the free tier option).
    *   Examples: Provider (AWS), Region (N. Virginia), Name (Cluster0).
    *   Click **Create**.

3.  **Setup Security (Crucial)**:
    *   **Username & Password**: You will be asked to create a database user.
        *   Enter a **Username** (e.g., `admin`).
        *   Enter a **Password** (e.g., `password123`). **WRITE THIS DOWN!**
        *   Click **Create User**.
    *   **IP Access List**:
        *   Scroll down to "IP Access List" or "Network Access" on the left.
        *   Click "Add IP Address".
        *   Select **Allow Access from Anywhere** (`0.0.0.0/0`). (Required for Render/Vercel to connect).
        *   Click **Confirm**.

4.  **Get the Connection String**:
    *   Go back to **Database** (on the left menu).
    *   Click the **Connect** button on your Cluster card.
    *   Select **Drivers** (Node.js, Go, Python, etc.).
    *   **Copy the Connection String**. It looks like this:
        `mongodb+srv://admin:<db_password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

5.  **Finalize**:
    *   Replace `<db_password>` in that string with the actual password you created in step 3.
    *   This is the value you use for `MONGO_URI` in Render.
