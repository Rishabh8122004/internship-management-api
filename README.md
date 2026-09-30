# Internship Management API

A RESTful backend API built with **Node.js and Express.js** for managing students, internships, and internship applications.

This project was developed as part of the **InternNova Full Stack Web Development Internship — Week 5** and demonstrates REST API development, CRUD operations, authentication, validation, filtering, persistence, error handling, CORS, API testing, and frontend integration.

---

## Features

- RESTful API using Express.js
- Student CRUD operations
- Internship CRUD operations
- Internship application CRUD operations
- Filtering and search
- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected profile endpoint
- Request validation
- Duplicate and relationship validation
- Centralized error handling
- 404 route handling
- Request logging
- CORS support
- JSON-file data persistence
- Postman API testing
- React frontend integration
- Environment-variable configuration

---

## Tech Stack

- **Node.js**
- **Express.js**
- **JavaScript**
- **bcryptjs** — password hashing
- **jsonwebtoken** — JWT authentication
- **cors** — cross-origin requests
- **dotenv** — environment variables
- **JSON files** — lightweight persistent storage
- **Postman** — API testing
- **React + Vite** — frontend integration

---

## Project Structure

```text
internship-management-api/
│
├── data/
│   ├── applications.json
│   ├── internships.json
│   ├── students.json
│   └── users.json
│
├── src/
│   ├── controllers/
│   │   ├── applicationController.js
│   │   ├── authController.js
│   │   ├── internshipController.js
│   │   ├── profileController.js
│   │   └── studentController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── loggerMiddleware.js
│   │
│   ├── models/
│   │   ├── applicationModel.js
│   │   ├── internshipModel.js
│   │   ├── studentModel.js
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── applicationRoutes.js
│   │   ├── authRoutes.js
│   │   ├── internshipRoutes.js
│   │   └── profileRoutes.js
│   │   └── studentRoutes.js
│   │
│   ├── utils/
│   │   ├── AppError.js
│   │   ├── applicationValidator.js
│   │   ├── authValidator.js
│   │   ├── dateUtils.js
│   │   ├── internshipValidator.js
│   │   ├── jsonDb.js
│   │   ├── studentValidator.js
│   │   └── validation.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── postman_testing_collection.json
└── README.md
```

---

## Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Rishabh8122004/internship-management-api.git
cd internship-management-api
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env` file in the project root.

You can use `.env.example` as a template:

```env
PORT=5000
JWT_SECRET=replace_with_a_long_random_string
JWT_EXPIRES_IN=1d
CLIENT_ORIGIN=http://localhost:5173
```

### Variables

| Variable | Purpose |
|---|---|
| `PORT` | Port used by the Express server |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `JWT_EXPIRES_IN` | JWT expiration duration |
| `CLIENT_ORIGIN` | Frontend origin allowed by CORS |

The real `.env` file is excluded from Git.

---

## Running the Server

### Development

```bash
npm run dev
```

The API runs on:

```text
http://localhost:5000
```

### Production-style start

```bash
npm start
```

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "success": true,
  "message": "API is running"
}
```

---

# API Endpoints

## Authentication

Base URL:

```text
/api/auth
```

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive a JWT |

### Registration

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
```

Passwords are hashed using bcrypt before being stored.

The API never returns the stored password hash in the registration response.

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "demo@example.com",
  "password": "password123"
}
```

A successful login returns a JWT:

```json
{
  "success": true,
  "message": "Login successful",
  "token": "..."
}
```

---

## Protected Profile

```http
GET /api/profile
```

This endpoint requires a valid JWT.

Send the token using:

```text
Authorization: Bearer <JWT_TOKEN>
```

The authentication middleware verifies the token before allowing access to the profile controller.

Expired or invalid tokens return an appropriate `401 Unauthorized` response.

---

# Students API

Base URL:

```text
/api/students
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Get all students |
| GET | `/api/students/:id` | Get a student by ID |
| POST | `/api/students` | Create a student |
| PUT | `/api/students/:id` | Replace/update a student |
| DELETE | `/api/students/:id` | Delete a student |

### Supported Filters

The student listing endpoint supports filters such as:

```text
/api/students?course=CSE
/api/students?college=MLVTEC
/api/students?graduationYear=2027
/api/students?skill=JavaScript
```

Multiple query parameters can be combined.

---

# Internships API

Base URL:

```text
/api/internships
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/internships` | Get all internships |
| GET | `/api/internships/:id` | Get an internship by ID |
| POST | `/api/internships` | Create an internship |
| PUT | `/api/internships/:id` | Replace/update an internship |
| DELETE | `/api/internships/:id` | Delete an internship |

### Supported Filters

The API supports filtering by:

- Domain
- Mode
- Status
- Required skill
- Title search

Examples:

```text
/api/internships?domain=Web Development
/api/internships?mode=Remote
/api/internships?status=Open
/api/internships?skill=React
/api/internships?search=frontend
```

---

# Applications API

Base URL:

```text
/api/applications
```

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/applications` | Get applications |
| GET | `/api/applications/:id` | Get an application by ID |
| POST | `/api/applications` | Create an application |
| PUT | `/api/applications/:id` | Update an application |
| DELETE | `/api/applications/:id` | Delete an application |

### Supported Filters

Applications can be filtered using:

```text
/api/applications?status=Applied
/api/applications?studentId=1
/api/applications?internshipId=2
```

The API also validates relationships between students and internships.

For example, an application cannot be created for a student or internship that does not exist.

Duplicate student/internship applications are rejected.

---

# Validation and Error Handling

The API validates incoming data before modifying the stored data.

Examples include:

- Required fields
- Email format
- Password requirements
- Valid internship modes
- Valid internship statuses
- Valid application statuses
- Valid IDs
- Valid application dates
- Duplicate email detection
- Duplicate application detection
- Student/internship relationship validation

Errors use appropriate HTTP status codes such as:

- `400` — Bad Request
- `401` — Unauthorized
- `404` — Not Found
- `409` — Conflict
- `500` — Internal Server Error

The application also has centralized error handling and a dedicated 404 handler.

---

# Authentication Flow

```text
Register
   ↓
Validate input
   ↓
Hash password with bcrypt
   ↓
Store password hash
   ↓
Login
   ↓
Verify password with bcrypt
   ↓
Generate JWT
   ↓
Client sends JWT
   ↓
JWT middleware verifies token
   ↓
Protected route is accessed
```

Passwords are never stored as plain text.

JWTs contain the authenticated user's ID and email and expire according to the configured `JWT_EXPIRES_IN` value.

---

# Data Persistence

For this internship project, data is persisted using JSON files instead of a database.

Data files are stored in:

```text
data/
```

The backend provides a small JSON database utility responsible for:

- Reading JSON data
- Creating missing data files
- Writing updated data
- Generating the next available numeric ID

This keeps the project lightweight while demonstrating persistence and CRUD functionality.

---

# CORS

The API supports Cross-Origin Resource Sharing so that the React frontend can communicate with the Express backend during development.

The allowed frontend origin is configured through:

```env
CLIENT_ORIGIN=http://localhost:5173
```

Multiple origins can be provided as comma-separated values.

---

# Request Logging

Each incoming request is logged with:

- HTTP method
- Request URL
- Response status
- Response time

Example:

```text
GET /api/students 200 - 3ms
```

---

# Postman Testing

The repository includes:

```text
postman_testing_collection.json
```

The API was tested using Postman.

Current test result:

**129 tests passed  
0 failed  
0 skipped**

The collection covers the implemented API functionality including authentication, CRUD operations, validation, filtering, protected routes, error cases, and persistence-related behavior.

---

# React Frontend Integration

The API is integrated with the React portfolio project:

```text
https://github.com/Rishabh8122004/react-portfolio
```

The frontend uses:

```env
VITE_API_URL=http://localhost:5000
```

The React `/internships` page fetches live internship data from:

```http
GET /api/internships
```

The page demonstrates:

- API requests using `fetch`
- Loading state
- Successful response handling
- Empty-data state
- Error handling
- Retry functionality
- CORS communication
- Responsive presentation

The frontend also displays a clear notice that the internship records shown through the API are sample/demo data.

**Only the InternNova Full Stack Web Development Internship represents actual professional experience. Other internship entries are sample data used to demonstrate the application's backend/API functionality.**

---

# Development Scripts

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server with Node watch mode |
| `npm start` | Start the server |

---

# Project Status

The Week 5 implementation demonstrates a complete backend API integrated with the existing React portfolio frontend.

### Verified functionality

- REST API
- CRUD operations
- Authentication
- JWT authorization
- bcrypt password hashing
- Protected route
- Validation
- Filtering
- JSON persistence
- CORS
- Error handling
- Request logging
- Postman testing
- React API integration
- Loading/success/error frontend states

---

## Internship Context

This project was developed as part of the **InternNova Full Stack Web Development Internship — Week 5**.

The project focuses on backend development using Node.js and Express while integrating the API with the React frontend developed during the previous week.