# 🏥 Healthcare Management System – Professional Documentation

## 🔷 Introduction

The **Healthcare Management System** is a full-featured web application designed to streamline the interaction between **patients, doctors, and administrators**. Built using modern technologies and industry best practices, the platform provides a **secure, scalable, and user-friendly environment** for managing doctor registrations, appointment bookings, notifications, and payments.

The system is divided into three primary modules:

* **Frontend Panel** – Interface for patients to register, search doctors, book appointments, and make payments
* **Admin Panel** – Interface for administrators to manage doctors, monitor system activity, and view analytics
* **Backend Server** – Handles API requests, authentication, file uploads, email delivery, and payment processing

---

## 🏗️ Tech Stack Overview

| Layer           | Technologies                              |
| --------------- | ----------------------------------------- |
| Frontend        | React.js, Vite, Tailwind CSS, Zustand     |
| Backend         | Node.js, Express.js, MongoDB, Mongoose    |
| Authentication  | JWT, Bcrypt, Secure Cookies               |
| Image Storage   | Multer, Cloudinary                        |
| Email Services  | SendGrid (Production), Mailtrap (Testing) |
| Payment Gateway | Razorpay                                  |
| UI Icons        | FontAwesome, Lucide Icons                 |

---

## 🔐 Authentication & Security

* **JWT-based Authentication** with secure HTTP-only cookie sessions
* **Role-Based Access Control (RBAC)** – Different access levels for patients, doctors, and admins
* **Password Encryption** using Bcrypt
* **Input Validation** for all client-side forms and backend routes
* **Helmet & CORS Middleware** to enhance HTTP security and restrict cross-origin requests
* **Secure File Uploads** using Multer
* **Cloud-based Storage** with Cloudinary for profile images

---

## ✉️ Email Notification System (SendGrid)

Transactional and system-triggered emails are delivered through **SendGrid**, with **Mailtrap** and **Brevo** used in development/testing environments.

Email triggers include:

* **Welcome Emails** (for patients and doctors)
* **Email Verification** (post-registration)
* **Appointment Confirmations**
* **Payment Confirmations**
* **Password Reset Requests**
* **Successful Password Reset Notifications**
* **Doctor Approval/Rejection Notifications**

---

## 🔄 Module Responsibilities

### 🎯 Patient Panel (`/frontend`)

**Target Role:** Patients

| Feature                   | Description                                             |
| ------------------------- | ------------------------------------------------------- |
| User Registration & Login | With secure email verification via SendGrid             |
| Doctor Search & Filters   | Filter by specialization, name, and availability        |
| Appointment Booking       | Book appointments with preferred doctors and time slots |
| Appointment Management    | View and cancel booked appointments                     |
| Email Notifications       | Confirmation emails for appointments and payments       |
| Profile Management        | Upload profile photo via Multer and Cloudinary          |
| Payments                  | Secure transactions through Razorpay                    |
| State Management          | Zustand ensures reactive and smooth user experience     |

---

### 🛡️ Admin & Doctor Panel (`/admin`)

**Target Roles:** Administrators and Doctors

| Feature                            | Description                                                  |
| ---------------------------------- | ------------------------------------------------------------ |
| Admin Login                        | Secure login with access control                             |
| Doctor Management                  | Add, approve/reject doctors, set availability                |
| User & Appointment Monitoring      | View all users, appointments, and statuses                   |
| Admin Dashboard & Analytics        | Insights into total users, appointments, and doctor earnings |
| Appointment Control                | Admin can cancel or update appointment statuses              |
| Role & Access Control (RBAC)       | Admin-only privileges and controls                           |
| Doctor Profile Management          | Doctors can update profile images and personal information   |
| Doctor Earnings Tracking           | Doctors can view their total earnings from appointments      |
| Appointment Management for Doctors | Doctors can manage upcoming appointments                     |

---

### ⚙️ Backend Server (`/backend`)

**Target Role:** API and Server Logic

| Feature                | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| Authentication APIs    | Handles login, registration, JWT creation, and role-based access |
| Appointment APIs       | Book, cancel, reschedule, and track appointments                 |
| Doctor Management APIs | Admin controls for verifying, approving, or rejecting doctors    |
| Upload APIs            | Multer and Cloudinary integration for profile image uploads      |
| Email APIs             | SendGrid-based system for all automated emails                   |
| Payment APIs           | Razorpay integration and webhook handling for payments           |
| Middleware             | Authentication, authorization, and role verification             |
| Database Operations    | Handled using Mongoose models and queries on MongoDB             |

---

## 📌 Key Features Overview

| Feature                      | Description                                                 |
| ---------------------------- | ----------------------------------------------------------- |
| Role-Based Authentication    | JWT tokens with RBAC for patients, doctors, and admins      |
| Doctor Approval Workflow     | Admin can add doctors; welcome email sent with credentials  |
| Appointment Booking System   | Patients can browse, book, and cancel appointments          |
| Email Notification System    | Signup verification, booking confirmations, password resets |
| Razorpay Payment Integration | Real-time secure payment processing and confirmation emails |
| Profile Image Management     | Uploads stored securely on Cloudinary                       |
| Admin Dashboard & Analytics  | Visual overview of user base and system activity            |
| Mobile-Responsive Design     | Tailwind CSS ensures fluid experience across devices        |

---

## 📁 Folder Structure

```
project-root/
│
├── frontend/               # Patient interface
│   └── src/
│       ├── pages/
│       ├── components/
│       └── store/
│
├── admin/                  # Admin and Doctor dashboard
│   └── src/
│       ├── pages/
│       └── components/
│
├── backend/                # Express server and business logic
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   ├── config/
│   └── server.js
```

---

## ⚙️ Scripts & Commands

**Frontend / Admin Panels:**

```bash
npm run dev       # Start development server
npm run build     # Create production-ready build
npm run preview   # Preview production build locally
```

**Backend Server:**

```bash
npm start         # Start the server in production
npm run server    # Start server with nodemon in development
```

---
