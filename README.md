# Blog Application

A modern, full-stack blog application built with React, Node.js, Express, and MongoDB. This application allows users to create, read, update, and delete blog posts with user authentication.

## Features

- User Authentication (Login/Register)
- Create and Read Blog Posts
- Responsive Design with Tailwind CSS
- Pagination for Blog Listings (currently 3 blogs per page)
- Modern UI with Material-UI Components
- Protected Routes for Authenticated Users
- Real-time Error Handling
- Loading States and Animations

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repo_url>
cd blog-app
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Create environment variables:

Backend (.env):
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm start
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment

### Backend (Render.com)
1. Create a MongoDB Atlas account and database
2. Deploy to Render:
   - Connect your GitHub repository
   - Set environment variables
   - Deploy the service

### Frontend (Netlify)
1. Deploy to Netlify:
   - Connect your GitHub repository
   - Set environment variables
   - Deploy the project

## Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 5000)

### Frontend
- `REACT_APP_API_URL`: Backend API URL

## Project Structure

```
blog-app/
├── backend/
│   ├── models/
│   │   ├── Blog.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── blogs.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user

### Blogs
- GET /api/blogs - Get all blogs (paginated)
- GET /api/blogs/:id - Get a single blog
- POST /api/blogs - Create a new blog

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Live Project URL

https://bloganza.netlify.app/ 
