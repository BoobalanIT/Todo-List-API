# MEAN Stack Todo List Application

A robust, full-stack Task Management application built with the **MEAN stack** (MongoDB, Express.js, Angular, Node.js). This project features a secure RESTful API backend and a responsive, modern Angular frontend.

## 🚀 Features

-   **Full-Stack Architecture**: Clean separation of concerns with a dedicated `backend` API and `frontend` client.
-   **Secure Authentication**: robust user registration and login using **JWT (JSON Web Tokens)** and **bcrypt** for password hashing.
-   **CRUD Operations**: Create, Read, Update, and Delete todos seamlessly.
-   **Modern UI**: Built with **Angular** and styled for a premium user experience (dark mode, glassmorphism).
-   **Security Best Practices**:
    -   Data validation
    -   Rate limiting
    -   Helmet for HTTP headers
    -   CORS configuration

## 🛠️ Tech Stack

### Backend
-   **Node.js** & **Express.js**
-   **MongoDB** & **Mongoose** (Data modeling)
-   **jsonwebtoken** (Authentication)
-   **bcryptjs** (Security)

### Frontend
-   **Angular** (Framework)
-   **RxJS** (Reactive programming)
-   **TypeScript**

## 📦 Project Structure

```bash
TODO-LIST-API/
├── backend/    # Node.js/Express API
└── frontend/   # Angular Application
```

## 🏁 Getting Started

### Prerequisites
-   Node.js (v18+ recommended)
-   MongoDB (Local or Atlas URI)
-   Angular CLI

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/todo-list-api.git
    cd todo-list-api
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create a .env file with:
    # PORT=5000
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_jwt_secret
    npm run dev
    ```

3.  **Setup Frontend**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

## 📝 License

This project is licensed under the ISC License.
