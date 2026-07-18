# 🚀 Avinya

**Avinya** is a modern career guidance platform that brings together **Jobs**, **Internships**, and **Courses** in a single application. Instead of searching across multiple websites, users can explore opportunities from one centralized platform with a clean, responsive, and user-friendly interface.

---

## 📖 Project Overview

Students and professionals often visit different websites to find jobs, internships, and courses. **Avinya** solves this problem by providing a unified platform where users can:

* Browse Jobs
* Explore Internships
* Discover Courses
* Receive Personalized Recommendations (Upcoming)
* Save Opportunities (Upcoming)
* Analyze Resume & Get Career Suggestions (Upcoming)

---

## ✨ Features

### ✅ Current Features

* User Authentication (Login/Register)
* User Profiles
* Responsive Dashboard
* Sidebar Navigation with Routing
* Jobs Module
* Internships Module
* Courses Module
* Modern UI using Tailwind CSS
* REST API using Express.js
* MongoDB Atlas Cloud Database
* Dynamic data fetching from Backend APIs

### 🚧 Upcoming Features

* Resume Analyzer
* AI-based Recommendations
* Unified Search
* Saved Jobs & Courses
* Admin Dashboard
* External API Integration

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* Lucide React

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Tools

* Git & GitHub
* Thunder Client
* Visual Studio Code

---

## 📂 Project Structure

```text
Avinya
│
├── src/                 # React Frontend
│   ├── components
│   ├── layouts
│   ├── pages
│   └── App.jsx
│
├── server/              # Backend
│   ├── config
│   │   └── db.js
│   ├── models
│   │   ├── User.js
│   │   ├── Job.js
│   │   ├── Internship.js
│   │   └── Course.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── internshipRoutes.js
│   │   └── courseRoutes.js
│   ├── server.js
│   └── .env
│
├── package.json
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
```

### 2. Navigate to the Project

```bash
cd Avinya
```

### 3. Install Frontend Dependencies

```bash
npm install
```

### 4. Install Backend Dependencies

```bash
cd server
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the **server** folder.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

> **Note:** The `.env` file is not included in GitHub for security reasons. Contact the project owner to obtain the required values.

---

## ▶️ Running the Project

### Start Backend

```bash
cd server
node server.js
```

Backend runs on:

```
http://localhost:5000
```

### Start Frontend

Open another terminal.

```bash
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🌐 API Endpoints

### Authentication

| Method | Endpoint              |
| ------ | --------------------- |
| POST   | `/api/auth/register`  |
| POST   | `/api/auth/login`     |
| GET    | `/api/auth/profile`   |

### Jobs

| Method | Endpoint    |
| ------ | ----------- |
| GET    | `/api/jobs` |
| POST   | `/api/jobs` |

### Internships

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | `/api/internships` |
| POST   | `/api/internships` |

### Courses

| Method | Endpoint       |
| ------ | -------------- |
| GET    | `/api/courses` |
| POST   | `/api/courses` |

---

## 👥 Team Collaboration

1. Pull the latest code:

```bash
git pull origin main
```

2. Install frontend dependencies:

```bash
npm install
```

3. Install backend dependencies:

```bash
cd server
npm install
```

4. Create the `server/.env` file with the MongoDB connection string.

5. Start the backend:

```bash
node server.js
```

6. Start the frontend:

```bash
npm run dev
```

---

## 📌 Future Roadmap

* Resume Upload & Analysis
* AI Recommendation Engine
* Unified Search
* Saved Opportunities
* Admin Dashboard
* External API Integration
* Notifications
* Company Profiles

---

## 🤝 Contributors

Developed as a collaborative MERN Stack project.

Contributions are welcome through feature branches and pull requests.

---

## 📄 License

This project is developed for educational purposes.
