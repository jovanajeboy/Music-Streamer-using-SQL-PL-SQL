# Music Streamer — Full-Stack Music & Podcast Platform

This repository contains two implementations of a full-stack music streaming platform. Both projects provide music streaming functionality but use different backend technologies and database systems.

## 📁 Repository Structure

```text
Music-Streamer-using-SQL-PL-SQL/
│
├── Project 1/
│   ├── frontend/          # Next.js, React, TypeScript
│   ├── backend/           # Node.js and Express
│   ├── database/          # Oracle SQL and PL/SQL scripts
│   └── README.md          # Project 1 documentation
│
├── Project 2/
│   ├── frontend/          # Next.js frontend
│   ├── backend/           # Java REST API
│   └── README.md          # Project 2 documentation
│
└── README.md              # Common documentation
```


## 🚀 Project Overview

| Feature | Project 1 | Project 2 |
|---|---|---|
| Frontend | Next.js, React, TypeScript | Next.js 15 |
| Backend | Node.js and Express | Java REST API |
| Database | Oracle Database Free 23.x | CockroachDB / PostgreSQL-compatible database |
| Database Programming | SQL and PL/SQL | Relational SQL |
| Authentication | JWT and bcrypt | See Project 2 documentation |

## 🎵 Project 1 — Music Streaming Application

Project 1 is a full-stack music streaming application built with a Next.js frontend, a Node.js and Express backend, and Oracle Database.

### Technologies Used

- **Frontend:** Next.js, React, TypeScript
- **Backend:** Node.js and Express
- **Database:** Oracle Database Free 23.x
- **Database Programming:** SQL, PL/SQL stored procedures, functions, and triggers
- **Authentication:** JWT and bcrypt

### Key Features

- User authentication and account management
- Music streaming application functionality
- Frontend and backend API integration
- Relational database management
- Database operations using PL/SQL

For installation instructions, database configuration, API documentation, and additional features, refer to [`Project 1/README.md`](Project%201/README.md).

## 🎧 Project 2 — Sonicly

Project 2, named **Sonicly**, is a separate implementation of the music streaming platform. It uses a Next.js frontend, a Java REST API backend, and a CockroachDB/PostgreSQL-compatible database.

### Technologies Used

- **Frontend:** Next.js 15
- **Backend:** Java REST API
- **Database:** CockroachDB / PostgreSQL-compatible database
- **Architecture:** Frontend, backend API, and relational database

### Key Features

- Music streaming platform functionality
- REST API-based communication
- Relational database with 13 tables
- Frontend and backend integration

For installation instructions, environment configuration, API documentation, and additional features, refer to [`Project 2/README.md`](Project%202/README.md).

## 🏗️ Application Architecture

Both projects follow a layered full-stack architecture:

```text
          User
            |
            v
   Frontend Application
         (Next.js)
            |
            v
       Backend API
            |
            v
   Relational Database
```

- **Frontend:** Provides the user interface and interacts with the backend.
- **Backend:** Processes requests and implements application logic.
- **Database:** Stores and manages application data.

The two projects use different backend technologies and database systems while following a similar overall architecture.

## ⚙️ Prerequisites

Install the tools required for the project you want to run.

Common prerequisites include:

- Git
- Node.js and npm
- Visual Studio Code or another code editor

Additional requirements depend on the selected project:

- **Project 1:** Oracle Database Free 23.x and the required Node.js dependencies.
- **Project 2:** Java development tools, the required Node.js dependencies, and a configured CockroachDB/PostgreSQL-compatible database.

Refer to each project's README for exact setup instructions.

## 💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/jovanajeboy/Music-Streamer-using-SQL-PL-SQL.git
```

### 2. Navigate to the Repository

```bash
cd Music-Streamer-using-SQL-PL-SQL
```

### 3. Choose a Project

Navigate to the project you want to run:

**Project 1**

```bash
cd "Project 1"
```

**Project 2**

```bash
cd "Project 2"
```

Follow the setup instructions in the selected project's README to install dependencies, configure the database, and start the application.

## 🔐 Security Notes

- Do not commit passwords, API keys, database credentials, JWT secrets, or environment files containing sensitive information.
- Use environment variables for sensitive configuration.
- Keep generated build files and framework cache directories out of version control when appropriate.
- Review the `.gitignore` file before committing changes.

## 🎓 Project Purpose

This repository demonstrates two approaches to building a full-stack music streaming application, including frontend development, backend API integration, relational database design, and database operations.

Project 1 focuses on **Node.js, Express, Oracle Database, and PL/SQL**, while Project 2 focuses on **Java REST APIs and CockroachDB/PostgreSQL-compatible database technology**.

## 📄 Documentation

- [Project 1 README](Project%201/README.md)
- [Project 2 README](Project%202/README.md)

Each project has its own documentation covering its implementation and setup.

## 📌 Repository

GitHub: [Music-Streamer-using-SQL-PL-SQL](https://github.com/jovanajeboy/Music-Streamer-using-SQL-PL-SQL)

---

**Note:** Project 1 and Project 2 are separate implementations maintained within the same repository. Their dependencies, configuration, backend services, and database setup may differ.
