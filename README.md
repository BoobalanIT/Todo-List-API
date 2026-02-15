# Todo List API

A RESTful API for managing a to-do list with user authentication, built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Register, Login)
- JWT-based Authorization
- CRUD Operations for Todos
- Pagination, Filtering, and Sorting of Todos
- Rate Limiting and Security Headers
- Unit/Integration Tests

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/todo_list_api
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=30d
   ```

## Usage

### Run Development Server
```bash
npm run dev
```

### Run Production Server
```bash
npm start
```

### Run Tests
```bash
npm test
```

## API Endpoints

### Auth
- `POST /register`: Register a new user
- `POST /login`: Login user and get token

### Todos
- `GET /todos`: Get all todos (Logged in user only)
  - Query Params: `page`, `limit`, `title`, `sort`
- `POST /todos`: Create a new todo
- `PUT /todos/:id`: Update a todo
- `DELETE /todos/:id`: Delete a todo

## Technologies

- Node.js
- Express
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt.js
- Jest & Supertest
