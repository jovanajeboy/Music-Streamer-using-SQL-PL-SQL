# Sonicly — Full-Stack Music & Podcast Streaming Platform (Project 2)

Welcome to **Sonicly (Project 2)**, a full-stack, distributed music and podcast streaming application built with **Next.js 15**, a high-performance **Java HTTP REST Backend**, and a distributed **CockroachDB** SQL database.

---

## 1. Architecture Overview

```
┌──────────────────────────────────────┐
│        Next.js Frontend (3000)       │  Sonicly SPA · Multi-Source Audio Player
│       Tailwind CSS + Lucide Icons    │  Electric Violet & Cosmic Indigo Theme
└──────────────────┬───────────────────┘
                   │ HTTP / JSON (Bearer JWT Auth)
┌──────────────────▼───────────────────┐
│         Java Backend (8080)          │  Generic Dynamic CRUD (/api/{table})
│         MusicStreamServer            │  PBKDF2 Password Hashing · HMAC-SHA256 Tokens
└──────────────────┬───────────────────┘
                   │ PostgreSQL Wire Protocol (Port 26257)
┌──────────────────▼───────────────────┐
│     CockroachDB Database (26257)     │  13 Relational Tables (musicstream database)
│       Distributed SQL Engine         │  Single-Node Insecure Mode (Port 26257/26258)
└──────────────────────────────────────┘
```

---

## 2. Directory Structure

```
Project 2/
├── frontend/                  # Next.js 15 web application
│   ├── app/                   # App Router pages (Home, Playlists, Artists, Albums, Podcasts, Billing, Login, Premium)
│   ├── components/            # UI components (Player, DataManager, Navbar, Cards)
│   ├── lib/                   # API client (api.ts) & utility helpers
│   ├── public/                # Static brand assets & icons
│   └── package.json           # Frontend dependencies
├── backend/                   # Java REST API backend
│   ├── src/main/java/         # MusicStreamServer.java & TestConnection.java
│   ├── lib/                   # PostgreSQL JDBC driver (postgresql-42.7.14.jar)
│   └── pom.xml                # Maven project definition
├── database/                  # CockroachDB / PostgreSQL database scripts
│   ├── schema.sql             # 13 relational tables DDL
│   ├── seed_catalog.sql       # Demo songs, artists, albums, podcasts, creators
│   ├── update_audio_urls.sql  # High-quality audio preview streams
│   └── song_previews.json     # Metadata and track references
├── .gitignore                 # Excludes node_modules, .next, target, build logs
└── README.md                  # Project documentation (this file)
```

---

## 3. Database Schema (13 Relational Tables)

The schema was migrated from relational Oracle DDL to CockroachDB / PostgreSQL standard syntax:

1. **`app_user`**: User accounts with PBKDF2 password hashes, country, and DOB.
2. **`artist`**: Musical artists, biographies, and social handles.
3. **`podcast_creator`**: Creators and hosts producing original podcasts.
4. **`playlist`**: User-curated playlists with privacy flags (`PUBLIC` / `PRIVATE`).
5. **`subscription`**: User subscription tiers (`FREE` / `PREMIUM`) and date ranges.
6. **`device`**: Active registered user playback devices and OS metadata.
7. **`album`**: Music albums linked to artists with cover art.
8. **`song`**: Track records, duration, release dates, and direct audio stream URLs.
9. **`playlist_song`**: Composite junction table mapping songs to playlists (`ON DELETE CASCADE`).
10. **`user_artist`**: Composite junction table tracking artist followers.
11. **`podcast`**: Podcast series, descriptions, and languages.
12. **`episode`**: Individual podcast episodes with audio URLs and episode numbering.
13. **`payment`**: Transaction records with payment modes (UPI, Card) and amounts.

---

## 4. Key Features

- **Multi-Source Audio Player**: Direct MP3 audio playback, responsive YouTube video embedding, and Spotify official embeds with interactive seek bar, volume control, auto-advance queue, and keyboard shortcuts (<kbd>Space</kbd>, <kbd>←</kbd>, <kbd>→</kbd>, <kbd>↑</kbd>, <kbd>↓</kbd>).
- **Database & CRUD Manager**: Direct interactive interface supporting generic `GET`, `POST`, `PUT`, `DELETE` operations across all 13 tables, with column guide chips, composite key handling, and automatic alias normalization (`title` $\to$ `name`, `album_title`, `playlist_name`).
- **Inline Playlist Renaming**: Live pencil edit button allowing users to rename playlists directly on the page with immediate database synchronization.
- **Authentication & Security**: PBKDF2-HMAC-SHA256 (120,000 iterations) password hashing and tamper-proof HMAC-SHA256 JWT tokens. Sensitive password hashes are permanently stripped from all query responses.
- **Data Isolation & Tier Limits**: User-owned tables enforce ownership verification. Free plan users are limited to 3 playlists and a maximum of 6 track skips per hour via an in-memory rolling rate limiter.
- **Simulated Payment Gateway**: Instant UPI QR code generation, card checkout simulation, and atomic transaction handling inserting both `subscription` and `payment` records.

---

## 5. Getting Started & Running Locally

### Prerequisites
- **CockroachDB** (v23+ or v24+)
- **Java Development Kit (JDK 17+)**
- **Node.js** (v18+) & **pnpm** (or npm)

---

### Step 1: Start CockroachDB & Apply Schema

```powershell
# 1. Start CockroachDB in insecure single-node mode
cockroach start-single-node --insecure --listen-addr=localhost:26257 --http-addr=localhost:26258

# 2. Create database and apply schema
cockroach sql --insecure --host=localhost:26257 -e "CREATE DATABASE IF NOT EXISTS musicstream;"
cockroach sql --insecure --host=localhost:26257 --database=musicstream -f database/schema.sql
cockroach sql --insecure --host=localhost:26257 --database=musicstream -f database/seed_catalog.sql
```

---

### Step 2: Compile & Start the Java Backend

```powershell
cd backend

# Compile Java server
javac -cp "lib/postgresql-42.7.14.jar;lib/*;target/classes" -d target/classes src/main/java/com/musicstream/MusicStreamServer.java

# Run Java server on port 8080
java -cp "target/classes;lib/postgresql-42.7.14.jar;lib/*" com.musicstream.MusicStreamServer
```
*The backend server will start listening at `http://localhost:8080`.*

---

### Step 3: Start the Next.js Frontend

```powershell
cd ../frontend

# Install dependencies
pnpm install   # or npm install

# Start development server
pnpm dev       # or npm run dev
```
*Open **http://localhost:3000** in your browser.*

---

## 6. REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/register` | `POST` | Create a new user account with hashed password |
| `/api/auth/login` | `POST` | Authenticate and obtain JWT bearer token |
| `/api/auth/me` | `GET` | Retrieve authenticated user profile |
| `/api/{table}` | `GET` | List all records (or user-scoped records) for a table |
| `/api/{table}` | `POST` | Insert a new record into table |
| `/api/{table}/{pk}` | `GET` | Fetch record by primary key |
| `/api/{table}/{pk}` | `PUT` | Update fields in record by primary key |
| `/api/{table}/{pk}` | `DELETE` | Delete record by primary key |
| `/api/subscription/status` | `GET` | Get current plan, expiry, playlist counts, and skips |
| `/api/subscription/cancel` | `POST` | Cancel active premium subscription |
| `/api/billing/checkout` | `POST` | Process atomic subscription + payment checkout |
| `/api/player/skip` | `POST` | Validate and register an hourly track skip |
| `/api/stats` | `GET` | Public counter of songs, artists, albums, playlists |
