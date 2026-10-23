Music Streamer — Full-Stack Music & Podcast Platform

A repository containing two full-stack music and podcast streaming projects developed for academic and database management coursework. Both projects explore music playback, user authentication, playlist management, subscriptions, and relational database design using different backend and database technologies.

📌 Projects Overview

This repository contains two independent implementations of a music and podcast streaming platform.

Feature

Project 1 — Music Streamer

Project 2 — Sonicly

Frontend

Next.js, React, TypeScript

Next.js, React, TypeScript

Backend

Node.js, Express.js

Java REST API

Database

Oracle Database

CockroachDB / PostgreSQL-compatible SQL

Database logic

PL/SQL procedures, functions, triggers

SQL schema, constraints, application-level logic

Authentication

bcrypt password hashing, JWT

PBKDF2 password hashing, HMAC-SHA256 tokens

Main focus

Database programming with PL/SQL

Full-stack streaming application and API development

Each project has its own source code, database scripts, dependencies, and setup instructions.

📂 Repository Structure

Music-Streamer-using-SQL-PL-SQL/
│
├── Project 1/
│   ├── frontend/
│   ├── backend/
│   ├── database/
│   └── README.md
│
├── Project 2/
│   ├── frontend/
│   ├── backend/
│   ├── database/
│   └── README.md
│
├── .gitignore
└── README.md


🎧 Project 1 — Music Streamer

Focus: Relational database design and Oracle PL/SQL integration.

Project 1 combines a web-based music and podcast streaming interface with a Node.js/Express backend and an Oracle Database.

Key Features

User registration and login with password hashing and JWT authentication.

Music catalogue with songs, artists, and albums.

Audio playback through the web interface.

Playlist creation and management.

Artist following and podcast browsing.

Free and Premium subscription management.

Payment records and transaction history.

Database business logic implemented using PL/SQL stored procedures, functions, and triggers.

Technology Stack

Frontend: Next.js, React, TypeScript, Tailwind CSS.

Backend: Node.js, Express.js.

Database: Oracle Database.

Database programming: SQL and PL/SQL.

Authentication: bcrypt and JSON Web Tokens.

Documentation

See Project 1/README.md for detailed installation, configuration, database setup, and execution instructions.

🚀 Project 2 — Sonicly

Focus: Full-stack music and podcast streaming with a Java REST API and distributed SQL database.

Sonicly is a web-based streaming platform that combines a Next.js frontend, a Java HTTP REST backend, and CockroachDB.

Key Features

Music and podcast browsing and playback.

Multi-source audio support for direct audio streams and supported embedded players.

User authentication and token-based sessions.

Playlist and library management.

Interactive database CRUD management.

Free and Premium subscription handling.

Simulated payment checkout.

User ownership checks and subscription limits.

Relational data management across 13 database tables.

Technology Stack

Frontend: Next.js 15, React, TypeScript, Tailwind CSS.

Backend: Java REST API.

Database: CockroachDB with PostgreSQL-compatible SQL.

Database connectivity: PostgreSQL JDBC driver.

Authentication: PBKDF2-HMAC-SHA256 and HMAC-SHA256 token signing.

Documentation

See Project 2/README.md for detailed installation, database initialization, backend compilation, frontend setup, and API documentation.

🏗️ General Architecture

Both projects follow a three-layer application architecture:

┌─────────────────────────────┐
│       Frontend Layer        │
│     Next.js + React UI      │
└──────────────┬──────────────┘
               │ HTTP / JSON
┌──────────────▼──────────────┐
│       Backend Layer         │
│  REST API and Application   │
│           Logic             │
└──────────────┬──────────────┘
               │ SQL / DB Driver
┌──────────────▼──────────────┐
│       Database Layer        │
│ Relational Tables and Rules │
└─────────────────────────────┘

The exact implementation differs between Project 1 and Project 2, particularly in backend language, database platform, and where database business rules are implemented.

⚙️ General Prerequisites

Install the tools required by the project you want to run:

Git

Node.js and npm or pnpm

The appropriate Java JDK for Project 2

Oracle Database and SQL tools for Project 1

CockroachDB for Project 2

A suitable code editor, such as Visual Studio Code

Refer to each project's README for exact version requirements and configuration.

▶️ Getting Started

1. Clone the repository

git clone https://github.com/jovanajeboy/Music-Streamer-using-SQL-PL-SQL.git
cd Music-Streamer-using-SQL-PL-SQL

2. Choose a project

For Project 1:

cd "Project 1"

For Project 2:

cd "Project 2"

3. Follow the project-specific instructions

Each project has separate frontend dependencies, backend configuration, database setup, and startup commands. Follow its individual README before starting the application.

Important: The projects are separate implementations. Their backend services, database configurations, and environment variables are not automatically interchangeable.

🔐 Security Notes

Never commit database passwords, API secrets, JWT signing keys, or .env files.

Keep generated folders such as node_modules/, .next/, and build outputs out of version control.

Use local environment variables for machine-specific configuration.

Do not use simulated payment functionality for real transactions.

🎓 Purpose

This repository demonstrates practical concepts in:

Full-stack web application development.

Relational database design and normalization.

SQL and PL/SQL programming.

REST API design and integration.

Authentication and authorization.

CRUD operations and transaction management.

Music and podcast streaming interfaces.

👨‍💻 Repository

GitHub: Music-Streamer-using-SQL-PL-SQL

Developed for academic and learning purposes.
