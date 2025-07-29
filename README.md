# 🚀 Insyd - MERN Stack Real-time Notification System

**Insyd** is a real-time social notification app built using the MERN stack: **MongoDB**, **Express.js**, **React**, and **Node.js** — with **Socket.IO** powering instant live updates and notifications.

🌐 **Live Demo**: [insyd.snapstay.in](https://insyd.snapstay.in)

🖥️ **Frontend Deployed On**: [Netlify](https://insyd.snapstay.in)  
🔧 **Backend Deployed On**: [Render](https://insyd-04ii.onrender.com)

---

## ✨ Features

- 🔐 Simple authentication with demo users
- 📝 Create and share posts in real-time
- ❤️ Like and comment on posts
- 🔔 Real-time notifications with sound alerts
- 📱 Fully responsive with Tailwind CSS
- ⚡ Instant updates via **Socket.IO**

---

## 👥 Demo Users

You can test the app using the following **demo accounts**:  
(Use 2 different browsers or incognito tabs for real-time testing)

```js
const demoUsers = [
  { name: 'John Doe', email: 'john@demo.com', password: 'password123' },
  { name: 'Jane Smith', email: 'jane@demo.com', password: 'password123' },
  { name: 'Mike Johnson', email: 'mike@demo.com', password: 'password123' }
];
````

These are also displayed on the login page.

---

## 🧪 How to Test

1. Go to **[insyd.snapstay.in](https://insyd.snapstay.in)**
2. Use **any two demo users** in **two different browsers** (or incognito)
3. Post, like, or comment as one user — the other receives real-time notifications

---

## ⚙️ Quick Start (Manual Setup)

### Prerequisites

* Node.js v14+
* MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### 1. Start Backend

```bash
cd server
npm install
npm run dev
```

Backend will run at: `http://localhost:5000`

### 2. Start Frontend

```bash
cd client
npm install
npm start
```

Frontend will run at: `http://localhost:3000`

---

## 📁 Project Structure

```
├── client/                 # React frontend
│   └── src/
│       ├── components/     # UI components
│       ├── contexts/       # Global state (Auth, Socket, etc.)
│       ├── utils/          # Helper functions
│       └── ...
├── server/                 # Express backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API route handlers
│   ├── middleware/         # Auth & error handling
│   └── server.js           # Main server entry
```

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/login` – Login user
* `GET /api/auth/me` – Get current logged-in user
* `GET /api/auth/demo-users` – Get list of demo users

### Posts

* `GET /api/posts` – Get all posts
* `POST /api/posts` – Create a new post
* `POST /api/posts/:id/like` – Like/unlike post
* `POST /api/posts/:id/comment` – Add a comment

### Notifications

* `GET /api/notifications` – Get user's notifications
* `GET /api/notifications/unread-count` – Unread count
* `PUT /api/notifications/:id/read` – Mark one as read
* `PUT /api/notifications/mark-all-read` – Mark all as read

---

## 🔄 Socket.IO Events

### 📤 Client to Server

* `join` – Join a user-specific room

### 📥 Server to Client

* `newPost` – When a new post is created
* `postUpdated` – When post is liked or commented
* `newNotification` – Push a new notification

---

## 🛠️ Tech Stack

### Backend

* **Express.js** – Server framework
* **MongoDB + Mongoose** – NoSQL database
* **Socket.IO** – Real-time communication
* **JWT + bcryptjs** – Authentication and password hashing

### Frontend

* **React.js** – UI framework
* **Tailwind CSS** – Utility-first styling
* **Axios** – API requests
* **Socket.IO Client** – Real-time event listening
* **React Hot Toast** – Toast notifications

---

## 📦 Deployment

| Layer    | Platform | URL                                                                |
| -------- | -------- | ------------------------------------------------------------------ |
| Frontend | Netlify   | [https://insyd.snapstay.in](https://insyd.snapstay.in)             |
| Backend  | Render   | [https://insyd-04ii.onrender.com](https://insyd-04ii.onrender.com) |

---

