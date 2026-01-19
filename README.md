# Authentication & Authorization Backend

A Node.js backend API with authentication, authorization, and image upload functionality.

## Features

- User authentication (register/login)
- JWT-based authorization
- Admin role management
- Image upload with Cloudinary integration
- MongoDB database

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (jsonwebtoken)
- Bcrypt for password hashing
- Cloudinary for image storage
- Multer for file uploads

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd revise_authentication_authorization
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

4. Run the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Home

- `GET /api/home` - Home route

### Admin

- Admin protected routes (requires admin role)

### Images

- Image upload and management routes

## Project Structure

```
├── config/          # Configuration files
├── controllers/     # Request handlers
├── database/        # Database connection
├── helpers/         # Helper functions
├── middleware/      # Authentication & upload middleware
├── models/          # Database models
├── routes/          # API routes
├── uploads/         # Local upload directory (gitignored)
└── server.js        # Entry point
```
