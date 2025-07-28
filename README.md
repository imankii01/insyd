# MERN Stack Insyd Notification System

A real-time Insyd-Notification networking application built with MongoDB, Express.js, React, and Node.js, featuring live notifications using Socket.IO.

## Features

- 🔐 Simple authentication with demo users
- 📝 Create and share posts in real-time
- ❤️ Like and comment on posts
- 🔔 Real-time notifications with sound alerts
- 📱 Responsive design with Tailwind CSS
- ⚡ Socket.IO for instant updates

## Demo Users

- **John Doe**: john@demo.com
- **Jane Smith**: jane@demo.com  
- **Mike Johnson**: mike@demo.com

Password for all demo users: `password123`

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Manual Setup

If you prefer to start servers individually:

1. **Start MongoDB** (if running locally)

2. **Start the backend:**
   ```bash
   cd server
   npm install
   npm run dev
   ```
   This will start:
- Backend server on http://localhost:5000

3. **Start the frontend:**
   ```bash
   cd client
   npm install
   npm start
   ```
   This will start:
- React frontend on http://localhost:3000

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── utils/          # Utility functions
│   │   └── ...
├── server/                 # Express backend
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   └── server.js           # Main server file
```

## Technologies Used

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Socket.IO Client** - Real-time client
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `GET /api/auth/demo-users` - Get demo users

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create post
- `POST /api/posts/:id/like` - Like/unlike post
- `POST /api/posts/:id/comment` - Add comment

### Notifications
- `GET /api/notifications` - Get user notifications
- `GET /api/notifications/unread-count` - Get unread count
- `PUT /api/notifications/:id/read` - Mark as read
- `PUT /api/notifications/mark-all-read` - Mark all as read

## Socket.IO Events

### Client to Server
- `join` - Join user's notification room

### Server to Client
- `newPost` - New post created
- `postUpdated` - Post liked/commented
- `newNotification` - New notification received

# insyd
