# Full-Stack Blog Application

This is a full-stack blog application with a **React (Vite)** frontend and a **Node.js (Express)** backend.  
It allows users to create, manage, and view blog posts with secure authentication and image uploads.

---

## ✨ Features

- User authentication (Signup & Login)
- JWT-based authorization
- Create, read, update, and delete (CRUD) blog posts
- Image uploads for blog posts using Cloudinary
- Dashboard for managing user-specific blog posts
- Public blog page to view all posts
- Protected routes for authenticated users

---

## 📄 Pages

### Blog Page (`/blog`)

- Displays all blog posts created by all users
- Users can view blog details by clicking on a post
- Data is fetched from:
  ```
  GET /api/posts
  ```

---

### Blog Management Page (`/blog-management`)

- Protected route (authentication required)
- Displays all blog posts created by the logged-in user in a table
- Users can manage their own posts

#### Actions

- **Create**
  - Modal form with:
    - Title
    - Excerpt
    - Content
    - Featured Image

- **Update**
  - Modal opens with pre-filled existing data

- **Delete**
  - Confirmation dialog before deletion

#### APIs Used

```
GET    /api/posts/user/my-posts
POST   /api/posts
PUT    /api/posts/:id
DELETE /api/posts/:id
```

---

## 🛠 Technologies Used

### Backend

- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT + bcryptjs
- **File Uploads:** Multer & Cloudinary
- **View Engine:** EJS

---

### Frontend

- **Framework:** React with Vite
- **Routing:** React Router
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Linting:** ESLint

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm installed
- MongoDB (local or cloud)
- Cloudinary account

---

## 🔧 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend` directory:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=day
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

Backend runs on:
```
http://localhost:3000
```

---

## 🎨 Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Fronted
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `Fronted` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

Frontend runs on:
```
http://localhost:5173
```

---

## 📡 Backend API Endpoints

### Authentication

| Method | Endpoint | Description |
|------|--------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/me | Get logged-in user profile |
| PUT | /api/auth/profile | Update user profile |

---

### Posts

| Method | Endpoint | Description |
|------|--------|-------------|
| GET | /api/posts | Get all posts |
| GET | /api/posts/:id | Get post by ID |
| POST | /api/posts | Create a new post |
| PUT | /api/posts/:id | Update a post |
| DELETE | /api/posts/:id | Delete a post |
| GET | /api/posts/user/my-posts | Get user's posts |

---

## 🔐 Authentication Notes

- JWT token is stored in `localStorage`
- Token must be sent in headers:
  ```
  Authorization: Bearer <token>
  ```
- Protected routes are secured on both frontend and backend

---

## 📌 Project Status

- Authentication: ✅ Completed
- CRUD Operations: ✅ Completed
- Image Uploads: ✅ Cloudinary Integrated
- Dashboard: ✅ Working

---

## 📜 License

This project is for learning and demonstration purposes.
