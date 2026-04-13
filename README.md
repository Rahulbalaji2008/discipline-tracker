# Discipline Tracker

A full-stack modern MERN application designed to help you stay disciplined, track points and streaks, and compete with friends on a leaderboard.

## Features
- JWT Authentication
- Dynamic Point and Streak tracking
- Fully responsive dark mode ready UI built with React + Tailwind + Vite
- Leaderboard for friends
- Dynamic charts for performance tracking

---

## Local Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or MongoDB Atlas)

### Backend Setup
1. Open a terminal and navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file referencing the given `.env.example` file and configure it:
   ```
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/discipline-tracker
   JWT_SECRET=supersecretjwtkey_replace_me_in_production
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a terminal and navigate to the `frontend` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the frontend root and set the API URL:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend Vite server:
   ```bash
   npm run dev
   ```

---

## Deployment Requirements (Step-by-Step)

### 1. Database Setup (MongoDB Atlas)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign in/register.
2. Create a new project and build a Free Tier cluster.
3. In **Database Access**, create a database user with a secure password.
4. In **Network Access**, add `0.0.0.0/0` to allow access from anywhere (for deployment to work easily).
5. Go to Databases -> **Connect** -> **Connect your application**.
6. Copy the connection string. It will look like: 
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/discipline?retryWrites=true&w=majority`
7. Replace `<password>` with your database user password. This is your `MONGO_URI`.

### 2. Backend Deployment (Render)
1. Push this whole `discipline tracker` repository to GitHub.
2. Go to [Render](https://render.com/) and create a new **Web Service**.
3. Connect your GitHub repository.
4. Set the Root Directory to `backend` (or leave it blank and set the Build/Start commands to run from `backend`). Assuming you set it to `backend`:
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Go to **Environment Variables** in Render and add:
   - `MONGO_URI`: *Your MongoDB connection string from Atlas*
   - `JWT_SECRET`: *A long secure random string*
6. Deploy the service. Copy the resulting Backend URL (e.g., `https://discipline-api.onrender.com`).

### 3. Frontend Deployment (Vercel)
1. Go to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import the same GitHub repository.
3. Set the **Root Directory** to `frontend`.
4. The Build settings should automatically detect Vite (Build Command: `npm run build`, Output Directory: `dist`).
5. Open **Environment Variables** and add:
   - Name: `VITE_API_URL`
   - Value: `<Your Render Backend URL>/api` *(e.g., `https://discipline-api.onrender.com/api`)*
6. Click **Deploy**. Vercel will build and provide a working public URL.

### Final Verification
- Access the Vercel URL.
- Try signing up, logging in, adding habits, and checking points!

Enjoy the Discipline Tracker!
