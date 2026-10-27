# StaffSync - Modern Human Resource Management Solution (MERN Stack)

**StaffSync** is a comprehensive web-based Human Resource Management (HRM) platform built using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)** following the **Model-View-Controller (MVC)** architecture. It provides distinct roles and access levels for **HR Personnel**, **Managers**, and **Employees** to streamline employee directory management, leave requests & approvals, daily attendance tracking, training & development programs, and company-wide announcements.

---

## Roles & Key Capabilities

1. **HR Personnel (`role: 'hr'`)**
   - Full access to Employee Directory (add, update, remove employee records, departments, designations, and salaries).
   - Approve or reject employee leave requests across all departments.
   - Monitor organization-wide daily attendance logs and check-in/check-out records.
   - Publish and manage company announcements and HR policy updates.
2. **Department Manager (`role: 'manager'`)**
   - Oversee team members and review/approve pending leave requests.
   - Create and manage **Training & Development Programs**, assign modules, and track employee enrollment.
   - View team attendance analytics and announcements.
3. **Employee (`role: 'employee'`)**
   - Mark daily attendance (Check-In / Check-Out with automatic working-hours calculation).
   - Apply for leaves (Sick, Casual, Paid, Work From Home) and track approval status in real time.
   - Enroll in Training & Development programs and update personal profile records.
   - Stay informed via the live Company Announcements feed.

---

## Project Architecture & Folder Structure

```text
StaffSync/
├── index.html                  # Standalone Interactive Live Demo App (GitHub Pages / Netlify Ready)
├── README.md                   # Complete Project Documentation
├── client/                     # React + Vite Frontend (Port 5173)
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       │   └── axios.js        # Axios instance with JWT Bearer token interceptor
│       ├── components/
│       │   ├── Header.jsx      # Role-aware top navigation bar (HR / Manager / Employee)
│       │   └── Footer.jsx      # Platform footer
│       ├── context/
│       │   └── AuthContext.jsx # Global authentication & role context
│       ├── pages/
│       │   ├── Dashboard.jsx   # Unified HRM dashboard (KPIs, Attendance, Leaves, Trainings, News)
│       │   ├── Employees.jsx   # HR Employee Directory & Onboarding CRUD
│       │   ├── Leaves.jsx      # Leave Application & Manager/HR Approval Workflow
│       │   ├── Attendance.jsx  # Daily Check-In/Out & Attendance Log Tracker
│       │   ├── Trainings.jsx   # Manager Training & Development Programs & Enrollment
│       │   ├── Announcements.jsx # Company News & HR Announcements Board
│       │   ├── Profile.jsx     # Personal Record & Profile Management
│       │   ├── Login.jsx       # Role-based Sign In with 1-Click Demo Logins
│       │   └── Register.jsx    # Employee / Manager / HR Registration
│       ├── App.jsx             # React Router configuration & protected routes
│       ├── App.css             # Modern enterprise HRM styling
│       └── main.jsx            # React DOM entry point
└── server/                     # Node.js + Express Backend (Port 8000)
    ├── config/
    │   └── db.js               # Mongoose connection to mongodb://127.0.0.1:27017/StaffSync
    ├── controllers/
    │   ├── authController.js   # Registration, Login, Profile update
    │   ├── employeeController.js # HR Employee Directory CRUD & KPI summary
    │   ├── leaveController.js  # Apply leave, view leaves, HR/Manager approve/reject
    │   ├── attendanceController.js # Mark check-in/out & view attendance logs
    │   ├── trainingController.js # Create training programs & employee enrollment
    │   └── announcementController.js # Post & list company announcements
    ├── middleware/
    │   ├── authMiddleware.js   # JWT verification & role-based access guard (HR / Manager)
    │   └── errorMiddleware.js  # Centralized error handling middleware
    ├── models/
    │   ├── User.js             # User/Employee schema (name, email, role, department, designation, salary)
    │   ├── Leave.js            # Leave schema (employee, leaveType, startDate, endDate, reason, status)
    │   ├── Attendance.js       # Attendance schema (employee, date, checkIn, checkOut, status, hoursWorked)
    │   ├── Training.js         # Training schema (title, instructor, department, duration, enrolledEmployees)
    │   └── Announcement.js     # Announcement schema (title, category, content, postedBy, priority)
    ├── routes/
    │   ├── authRoutes.js       # /api/auth/*
    │   ├── employeeRoutes.js   # /api/employees/*
    │   ├── leaveRoutes.js      # /api/leaves/*
    │   ├── attendanceRoutes.js # /api/attendance/*
    │   ├── trainingRoutes.js   # /api/trainings/*
    │   └── announcementRoutes.js # /api/announcements/*
    ├── seed/
    │   └── seedData.js         # Auto-seeds demo HR, Manager, Employees, Leaves, Attendance, Trainings, News
    ├── .env                    # Environment variables (PORT=8000, MONGO_URI, JWT_SECRET)
    ├── index.js                # Main Express server entry point (run via nodemon index.js)
    ├── server.js               # Alias entry point
    └── package.json
```

---

## Steps for Project Execution

### Step 1: Set Up the Backend (`server`)
1. Open a terminal and navigate into the `server` folder:
   ```bash
   cd server
   npm install
   ```
2. Check `.env` inside `server/`:
   ```env
   PORT=8000
   MONGO_URI=mongodb://127.0.0.1:27017/StaffSync
   JWT_SECRET=staffsync_super_secret_jwt_key_2026
   ```
3. Start the backend server:
   ```bash
   npx nodemon index.js
   ```
   The server runs on **`http://localhost:8000`** and automatically seeds initial HR, Manager, and Employee accounts, attendance records, leave requests, training modules, and announcements.

### Step 2: Set Up the Frontend (`client`)
1. Open a second terminal and navigate into the `client` folder:
   ```bash
   cd client
   npm install
   npm run dev
   ```
2. Open **`http://localhost:5173`** in your browser.

---

## Pre-Configured Demo Accounts (Auto-Seeded)
- **HR Admin**: `hr@staffsync.com` / `hr1234`
- **Manager**: `manager@staffsync.com` / `manager123`
- **Employee**: `employee@staffsync.com` / `emp123`
