⚖️ JustiSync - Smart Judiciary Case Management System
Synchronizing Justice, Digitally. > Official Submission for INNOVIT 2026 by Team NO IDEA

![React] ![Node.js] ![Express.js] ![PostgreSQL]

📌 The Problem
India's judicial system is overwhelmed with over 4.5 Crore pending cases. A massive root cause of this delay isn't just the lack of laws, but administrative inefficiencies:

Manual scheduling leading to overlapping dates.
Lack of synchronization between Judges' and Lawyers' calendars.
Zero transparency for the clients/citizens.
💡 The Solution: JustiSync
JustiSync is a centralized, digital Case Management platform built on the robust PERN Stack. It eliminates administrative bottlenecks by providing a unified ecosystem for Judges, Lawyers, and Clients.

🌟 Key Features (Our USP)
⚙️ Smart Conflict Detection Algorithm: The backend proactively checks for overlapping schedules. It physically prevents a Judge from double-booking a time slot, ensuring 0% scheduling conflicts.
🔒 Role-Based Access Control: Secure JWT authentication granting specific dashboard access to Judges, Lawyers, and Clients.
📅 Interactive Calendar: Real-time, asynchronous UI updates powered by React Virtual DOM.
🛢️ Relational Data Integrity: Built on PostgreSQL to ensure case files and hearing dates are strictly linked and never orphaned.
🏛️ System Architecture
Frontend (React.js + Vite): Role-specific Glassmorphism Dashboards.
Backend (Node.js + Express): RESTful API handling Auth Middleware and the Conflict Detection Engine.
Database (PostgreSQL): ACID compliant storage for maximum legal data security.
🚀 Getting Started (Run Locally)
Follow these steps to run the JustiSync prototype on your local machine.

Prerequisites
Node.js installed
PostgreSQL & pgAdmin installed
1. Database Setup
Open your pgAdmin, create a database named justisync_db, open the Query Tool, and run the following SQL commands to create the schema:

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

CREATE TABLE cases (
    case_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Pending'
);

CREATE TABLE schedules (
    schedule_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    type VARCHAR(50) NOT NULL,
    case_id INT REFERENCES cases(case_id)
);

-- Insert a Dummy Judge for testing
INSERT INTO users (name, email, password, role) 
VALUES ('Judge Sharma', 'judge@justisync.com', 'password123', 'Judge');
