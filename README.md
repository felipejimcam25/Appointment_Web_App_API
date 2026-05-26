# Barbershop Appointment Backend

This repository contains the backend API for a Barbershop Appointment system built with Express.js, PostgreSQL, and JWT-based authentication.

## 🚀 Project Overview

The backend provides endpoints for:
- User authentication and registration
- Role-based access control for admin functionality
- Managing barbers and available services
- Scheduling, updating, and canceling appointments
- Querying available time slots and working hours
- Retrieving loyalty and barber-specific appointment data

## 🧩 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- dotenv
- CORS
- Morgan

## 📁 Project Structure

Key folders and files:

- `src/app.js` - Express application setup
- `src/server.js` - Server bootstrap and environment loading
- `src/routes/users.routes.js` - API route definitions
- `src/controllers/` - Request handlers and application logic
- `src/services/` - Business logic and token generation
- `src/models/` - Database access layer
- `src/config/db.js` - PostgreSQL pool configuration
- `src/middlewares/auth.middleware.js` - Authentication and admin authorization
- `src/utils/hash.js` - Password hashing utilities

## ⚙️ Requirements

- Node.js 18+ (or compatible)
- PostgreSQL database
- A `.env` file with database credentials and JWT secret

## 🔧 Environment Variables

Create a `.env` file in the `backend` folder with the following values:

```env
PORT=3000
DBUSER=your_database_user
DBHOST=localhost
DBPASS=your_database_password
DBNAME=your_database_name
DBPORT=5432
JWT_SECRET_KEY=your_jwt_secret
```

## 🧪 Install and Run

From the `backend` folder:

```bash
npm install
npm start
```

The server will start on `http://localhost:3000/api` by default.

## 🔐 Authentication

The API uses JWT authentication. After login or registration, clients receive a bearer token.

Include the token in requests requiring authentication:

```http
Authorization: Bearer <token>
```

## 📌 Main API Endpoints

### Auth
- `POST /api/login` - Authenticate user
  - Body: `{ identifier, password }`
- `POST /api/register` - Create a new user
  - Body: `{ name, username, email, password, phone }`
- `POST /api/logout` - Logout endpoint (returns success response)

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID (admin)
- `GET /api/users/loyalty` - Get loyalty users (admin)
- `PUT /api/users/:id` - Update user by ID
- `DELETE /api/users/:id` - Delete user by ID (admin)

### Appointments
- `GET /api/appointments` - Get all appointments (admin)
- `GET /api/appointments/me` - Get current user's appointments
- `GET /api/appointments/barber/:id` - Get appointments for a barber (admin)
- `GET /api/appointments/barber/total/:id` - Get total appointments by barber (admin)
- `POST /api/appointments` - Book a new appointment
- `PUT /api/appointments/:id` - Update an appointment
- `PUT /api/appointments/:id/status` - Update appointment status
- `DELETE /api/appointments/:id` - Cancel an appointment

### Barbers
- `GET /api/barbers` - List all barbers
- `GET /api/barbers/:id` - Get barber by ID (admin)
- `POST /api/barbers` - Create a barber (admin)
- `PUT /api/barbers` - Update barber details (admin)

### Working Hours
- `GET /api/working-hours/:day` - Get working hours for a day (admin)
- `POST /api/working-hours` - Add working hours (admin)

### Availability
- `GET /api/available-slots` - Get available appointment slots

## 💡 Notes

- This backend is designed as an API-only service.
- Admin-protected routes require both a valid JWT and an `admin` role.
- Error handling is provided through JSON responses.

## 📈 Improvements

Potential next steps:
- Add API documentation with OpenAPI
- Implement automated unit and integration tests
- Add pagination for listing endpoints
