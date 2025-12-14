# 🍬 Sweet Shop Management System (TDD Kata)

## 📌 Overview

The Sweet Shop Management System is a full-stack web application designed as a **Test-Driven Development (TDD) Kata**.  
The goal of this project is to design, build, and test a clean, maintainable system that manages sweets inventory while following software craftsmanship principles.

This application allows:
- Users to browse and purchase sweets
- Admin users to manage sweets inventory (add, update, delete)
- Secure access via JWT-based authentication
- Clean separation of concerns between frontend and backend

---

## 🧱 Tech Stack

### Backend
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT Authentication**
- **Jest + Supertest**
- **mongodb-memory-server** (for isolated tests)

### Frontend
- **React (Vite)**
- **React Router**
- **Context API**
- **Custom CSS (Responsive & Colorful UI)**

---

## 🔐 Authentication & Authorization

- Single **Register** and **Login** flow for both Users and Admins
- Role (`user` or `admin`) selected at registration
- JWT-based authentication
- Role-based access control:
  - **User**: View & purchase sweets
  - **Admin**: Add, update, delete sweets

---

## 📦 Features

### 👤 User Features
- Register & Login
- View all available sweets
- Search sweets by name
- Purchase sweets (disabled when stock is 0)

### 👮 Admin Features
- Add new sweets
- Update sweet details (name, category, price, quantity)
- Delete sweets
- All admin features are hidden from normal users

---

## 🎨 UI & UX

- Modern and colorful UI
- Responsive layout (works on desktop, tablet, and mobile)
- Gradient navigation bar
- Card-based sweet listing
- Clear user feedback and disabled states

---

## 🧪 Test-Driven Development (TDD)

The backend logic was developed following a **TDD mindset**:

- Tests written before or alongside implementation
- Clear validation of business rules
- In-memory MongoDB used for isolated and repeatable tests

### Covered Test Cases:
- User registration & login
- Protected routes authorization
- Add, update, delete sweets
- Purchase & restock inventory logic
- Search sweets by name

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

---

## 🔧 Backend Setup

```bash
cd backend
npm install

 Create a .env file:

PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:
npm run dev


Run tests:
npm test

🎨 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:
http://localhost:5173

📸 Screenshots

![alt text](<Screenshot 2025-12-15 000918.png>)
![alt text](<Screenshot 2025-12-15 000844.png>)
![alt text](<Screenshot 2025-12-15 000801.png>)

Dashboard (Admin logged in)
Admin Add / Edit / Delete sweets
Search functionality
Purchase disabled when stock is zero


🧾 Test Report
![alt text](<Screenshot 2025-12-14 122052.png>)
![alt text](<Screenshot 2025-12-14 224431.png>)

All backend tests were executed using Jest and mongodb-memory-server.
All tests passed successfully
Business logic, authentication, and inventory operations are covered
Tests are isolated and repeatable without affecting real database data

🤖 My AI Usage

I used AI tools as a productivity and learning aid, while ensuring full understanding and ownership of the code.

Tools Used

ChatGPT – for:
Brainstorming API structure
Generating initial boilerplate for controllers and tests
Improving test coverage ideas
UI and UX suggestions

How AI Helped
Reduced time spent on repetitive setup
Helped validate TDD approach and test scenarios
Assisted in improving code readability and design clarity

Reflection

AI significantly improved my workflow efficiency, but all architectural decisions, business logic, and final code were reviewed, understood, and refined by me.
I ensured that AI was used responsibly and transparently, aligned with modern software development practices.

📂 Project Structure
sweet-shop-management-system/
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   └── tests/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── api/
│
└── README.md

Conclusion

This project demonstrates:
Clean API design
Test-driven development
Role-based authorization
Simple yet effective UI

Responsible AI usage

The focus was on clarity, correctness, and craftsmanship rather than over-engineering.
