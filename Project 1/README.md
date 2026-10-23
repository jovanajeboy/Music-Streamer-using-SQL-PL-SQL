# Music Streamer — Music & Podcast Streaming Platform

A relational database-driven music and podcast streaming platform built as an academic DBMS project. Features a Next.js single-page client, a Node.js/Express REST API, and an Oracle Database layer where all write operations run through **PL/SQL stored procedures**, backed by **stored functions** and **row-level triggers**.

---

## Table of Contents

[Project Overview](#project-overview) · [System Architecture](#system-architecture) · [Tech Stack](#tech-stack) · [Key Features](#key-features) · [Database Design](#database-design) · [Subscription & Payment Logic](#subscription--payment-logic) · [Sample Workflow](#sample-workflow) · [API Documentation](#api-documentation) · [Frontend Overview](#frontend-overview) · [Authentication Flow](#authentication-flow) · [Project Structure](#project-structure) · [Local Setup Guide](#local-setup-guide) · [Environment Variables](#environment-variables) · [Sample Data](#sample-data) · [Security Considerations](#security-considerations) · [Known Limitations](#known-limitations) · [Future Improvements](#future-improvements)

---

## Project Overview

In most academic DBMS submissions, database objects are demonstrated only through CLI queries. This project couples an Oracle Database with a working web interface where every user action — creating a playlist, following an artist, subscribing to Premium, recording a payment — is routed through a **PL/SQL stored procedure** called via an anonymous `BEGIN ... END;` block with bind variables, rather than a raw `INSERT` from application code.

**Core capabilities:** register/login with bcrypt-hashed passwords and 7-day JWT sessions · browse songs joined with artist and album metadata, with real MP3 playback · create `PUBLIC`/`PRIVATE` playlists with server-side ownership verification · follow and unfollow artists via a composite-key junction table · browse podcasts and drill into their episodes · activate `FREE`/`PREMIUM` plans with duplicate-subscription detection · record payments and view full payment history.

---

## System Architecture

```text
+-------------------------------------------------------------+
|                     Client Web Browser                      |
|        (Next.js App Router / React 19 / TypeScript SPA)     |
|   - HTML5 <audio> playback  - localStorage JWT persistence  |
+-------------------------------------------------------------+
                               │ REST JSON + Bearer <JWT>
                               ▼
+-------------------------------------------------------------+
|              Node.js + Express Backend (Port 5000)          |
|   - CORS + JSON parsing      - 10 routers under /api/*      |
|   - bcryptjs + jsonwebtoken  - Ownership checks on writes   |
+──────────────────────────────┬──────────────────────────────+
                               │ node-oracledb / Port 1521
                               ▼
+-------------------------------------------------------------+
|            Oracle Database Free 23.x (FREEPDB1)             |
|   - 13 Tables with Integrity Constraints                    |
|   - 7 Stored Procedures  - 5 Functions  - 5 Triggers        |
|   - IDENTITY columns, CHECK constraints, CASCADE FKs        |
+-------------------------------------------------------------+
```

The **frontend** is an SPA rendered from a single `page.tsx` with auth and subscription modals, using React hooks only. The **backend** validates payloads, enforces resource ownership, delegates writes to PL/SQL, and closes connections in `finally` blocks. The **database** holds all business rules; reads use parameterised `SELECT` with joins, and CLOBs are read via `DBMS_LOB.SUBSTR`.

---

## Tech Stack

| Component | Technology | Purpose |
|---|---|---|
| Frontend | Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4 | SPA shell, component model, typed API shapes, responsive styling |
| Backend | Node.js, Express.js 5 | REST routing, JSON parsing, middleware |
| DB Driver | node-oracledb 7 | Official Oracle client for Node.js |
| Database | Oracle Database Free 23.x | Relational DBMS, ACID transactions |
| Procedural Language | Oracle PL/SQL | Procedures, functions, triggers |
| Auth | bcryptjs, jsonwebtoken | Password hashing (cost 10), 7-day JWTs |
| Middleware | cors, dotenv | Cross-origin handling, env config |

---

## Key Features

| Feature | Implementation Detail |
|---|---|
| **Music Playback** | HTML5 `<audio>` driven by a React ref — play/pause, live position tracking, seek. Durations stored in seconds, formatted to `mm:ss` client-side. |
| **Catalogue Browsing** | Artist name and album title resolved via `LEFT JOIN` at the database level, so the client gets denormalised rows in one round trip. Bios and descriptions read from `CLOB` columns. |
| **Search** | Instant client-side filtering across the loaded catalogue without refetching. |
| **Playlist Management** | Visibility flag normalised to uppercase by both the procedure and a trigger. Songs added only after the backend confirms ownership (`403` otherwise). |
| **Artist Following** | Re-following is caught by `DUP_VAL_ON_INDEX` in PL/SQL; unfollowing a non-followed artist raises `-20001`. |
| **Subscription & Premium** | UPI and CARD modes with client-side validation (16-digit card, 3-digit CVV, UPI ID containing `@`). Duplicate active Premium rejected with `409`. Premium gets a one-year end date; Free is `NULL` (ongoing). |
| **Payment Ledger** | Payments written through `MAKE_PAYMENT`, retrievable newest-first, with subscription ownership verified first. |
| **Session Persistence** | JWT and user object in `localStorage` (`musicstream_token`, `musicstream_user`), restored on page load. |

---

## Database Design

**13 normalised tables** created in strict referential dependency order. All primary keys use `GENERATED BY DEFAULT AS IDENTITY`.

### Entity Relationship Summary

```text
APP_USER (1) ──< PLAYLIST (M) ──< PLAYLIST_SONG (M) >── SONG >── ALBUM >── ARTIST
    │                                                                        ▲
    ├──< USER_ARTIST (M) >──────────────────────────────────────────────────┘
    ├──< SUBSCRIPTION (M) ──< PAYMENT (M)
    └──< DEVICE (M)              │
         (PAYMENT also references APP_USER directly)

PODCAST_CREATOR (1) ──< PODCAST (M) ──< EPISODE (M)
```

### Relational Schema

| # | Table | Purpose | Primary Key | Foreign Keys & Constraints |
|---|---|---|---|---|
| 1 | `APP_USER` | User profiles and credentials | `user_id` | `UNIQUE (email)` |
| 2 | `ARTIST` | Musicians and song creators | `artist_id` | — |
| 3 | `PODCAST_CREATOR` | Podcast publisher accounts | `creator_id` | `UNIQUE (email)` |
| 4 | `PLAYLIST` | User song collections | `playlist_id` | `user_id` → `APP_USER`; `CHECK (visibility IN ('PUBLIC','PRIVATE'))` |
| 5 | `SUBSCRIPTION` | Plan history per user | `subscription_id` | `user_id` → `APP_USER` |
| 6 | `DEVICE` | Devices linked to a user | `device_id` | `user_id` → `APP_USER` |
| 7 | `ALBUM` | Albums by an artist | `album_id` | `artist_id` → `ARTIST` |
| 8 | `SONG` | Individual tracks | `song_id` | `album_id` → `ALBUM`, `artist_id` → `ARTIST` |
| 9 | `PLAYLIST_SONG` | Junction: songs in playlists | `(playlist_id, song_id)` | Both FKs `ON DELETE CASCADE` |
| 10 | `USER_ARTIST` | Junction: followed artists | `(user_id, artist_id)` | Both FKs `ON DELETE CASCADE` |
| 11 | `PODCAST` | Podcast shows | `podcast_id` | `creator_id` → `PODCAST_CREATOR` |
| 12 | `EPISODE` | Episodes in a podcast | `episode_id` | `podcast_id` → `PODCAST` CASCADE; `UNIQUE (podcast_id, episode_no)` |
| 13 | `PAYMENT` | Payment ledger | `payment_id` | `user_id` → `APP_USER`, `subscription_id` → `SUBSCRIPTION`; `CHECK (amount >= 0)` |

> The `password` column on `APP_USER` is appended by an `ALTER TABLE` at the end of `01_tables.sql`, added after the base schema to support authentication.

### Stored Procedures (`02_procedures.sql`)

Each procedure commits on success, rolls back on failure, and traps exceptions so errors surface as readable messages instead of raw `ORA-` codes.

| # | Procedure | Behaviour |
|---|---|---|
| 1 | `REGISTER_USER` | Inserts an `APP_USER` profile row. Traps `DUP_VAL_ON_INDEX` for duplicate emails. |
| 2 | `CREATE_PLAYLIST` | Inserts a playlist, normalising visibility with `UPPER()`; defaults to `PRIVATE`. |
| 3 | `ADD_SONG_TO_PLAYLIST` | Inserts into `PLAYLIST_SONG`; traps duplicates ("already in this playlist"). |
| 4 | `FOLLOW_ARTIST` | Inserts into `USER_ARTIST`; traps duplicates ("already following"). |
| 5 | `UNFOLLOW_ARTIST` | Deletes the follow row; checks `SQL%ROWCOUNT` and raises `-20001` if nothing was deleted. |
| 6 | `SUBSCRIBE_USER` | Inserts a subscription; `NULL` end date means an ongoing plan. |
| 7 | `MAKE_PAYMENT` | Inserts a payment row stamped with `SYSDATE`. |

### Database Functions (`03_functions.sql`)

| # | Function | Returns | Purpose |
|---|---|---|---|
| 1 | `GET_TOTAL_SONGS` | `NUMBER` | Total songs in the catalogue |
| 2 | `GET_PLAYLIST_SONG_COUNT(p_playlist_id)` | `NUMBER` | Songs inside a given playlist |
| 3 | `GET_ARTIST_FOLLOWER_COUNT(p_artist_id)` | `NUMBER` | Followers of a given artist |
| 4 | `GET_USER_PLAN(p_user_id)` | `VARCHAR2` | Latest plan type; returns `'NO ACTIVE PLAN'` via a `NO_DATA_FOUND` handler |
| 5 | `GET_TOTAL_PAYMENT(p_user_id)` | `NUMBER` | Sum of all payments, `NVL`-guarded to return `0` |

### Triggers (`04_triggers.sql`)

Row-level triggers act as a second line of defence, applying defaults and rejecting invalid data regardless of what the application sends.

| # | Trigger | Timing & Table | Rule Enforced |
|---|---|---|---|
| 1 | `TRG_PLAYLIST_CREATED_DATE` | `BEFORE INSERT ON PLAYLIST` | Auto-fills `created_date` with `SYSDATE` |
| 2 | `TRG_PLAYLIST_VISIBILITY` | `BEFORE INSERT OR UPDATE ON PLAYLIST` | Defaults to `'PRIVATE'`, else uppercases |
| 3 | `TRG_PAYMENT_DATE` | `BEFORE INSERT ON PAYMENT` | Auto-fills `payment_date` with `SYSDATE` |
| 4 | `TRG_SUBSCRIPTION_DATES` | `BEFORE INSERT OR UPDATE ON SUBSCRIPTION` | Raises `-20001` if `end_date < start_date` |
| 5 | `TRG_SONG_DURATION` | `BEFORE INSERT OR UPDATE ON SONG` | Raises `-20002` if `duration <= 0` |

---

## Subscription & Payment Logic

Upgrading to Premium is a two-call chain — the subscription must exist before a payment can reference it. Coordinated by `SubscriptionModal.tsx` and enforced server-side:

1. **Plan check (on modal open):** `GET /api/subscriptions/my`. A `404` means no active subscription and is treated as "Free tier", not an error.
2. **Client validation:** UPI ID format or card number (16 digits), name, expiry, and CVV (3 digits) checked before any network call.
3. **Subscription creation:** `POST /api/subscriptions` — backend rejects plan types outside `FREE`/`PREMIUM`, returns `409` if an active Premium exists, computes `start_date = today` and `end_date = today + 1 year`, calls `SUBSCRIBE_USER(...)`, then re-queries the newest row so the client receives the generated `SUBSCRIPTION_ID`.
4. **Payment recording:** `POST /api/payments` with that `subscription_id` — backend verifies ownership (`403` otherwise), then calls `MAKE_PAYMENT(...)`. `TRG_PAYMENT_DATE` and `CHK_PAYMENT_AMOUNT` provide database-level backup validation. The modal then refreshes the displayed plan via an `onSuccess()` callback.

---


## API Documentation

Server runs at `http://localhost:5000`. Routes marked **🔒** require `Authorization: Bearer <token>`.

### Authentication — `/api/auth`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Creates an account, hashes the password, returns a JWT |
| `POST` | `/api/auth/login` | Verifies credentials with `bcrypt.compare`, returns a JWT |

```jsonc
// POST /api/auth/register
{ "first_name": "Arun", "last_name": "Kumar",
  "email": "arun@example.com", "password": "secret123" }

// Response (201)
{ "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "user_id": 1, "first_name": "Arun",
            "last_name": "Kumar", "email": "arun@example.com" } }
```

Validation: all fields required; password min 6 chars; email normalised with `TRIM` + `LOWER`; duplicate email → `409`; bad credentials → generic `401` (no account enumeration).

### Catalogue

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/songs` | All songs left-joined with artist name and album title |
| `GET` | `/api/artists` | All artists; `bio` via `DBMS_LOB.SUBSTR(bio, 4000, 1)` |
| `GET` | `/api/albums` | All albums with release dates and cover paths |
| `POST` 🔒 | `/api/artists/:id/follow` | Calls `follow_artist(user_id, artist_id)` |
| `DELETE` 🔒 | `/api/artists/:id/follow` | Calls `unfollow_artist(user_id, artist_id)` |

### Playlists — `/api/playlists` 🔒

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/playlists` | The user's playlists, newest first |
| `POST` | `/api/playlists` | Calls `create_playlist(...)` |
| `POST` | `/api/playlists/:id/songs` | Ownership-checked, then `add_song_to_playlist(...)` |
| `GET` | `/api/playlists/:id/songs` | Songs in a playlist, scoped to the owner |

```jsonc
// POST /api/playlists
{ "playlist_name": "Late Night Study", "visibility": "PRIVATE" }

// POST /api/playlists/1/songs
{ "song_id": 3 }
```

### Podcasts & Episodes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/podcasts` | All podcast shows; `description` from CLOB |
| `GET` | `/api/episodes` | All episodes across all podcasts |
| `GET` | `/api/episodes/podcast/:podcastId` | Episodes for one show, ordered by `episode_no` |

### Users — `/api/users`

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/users/register` | Alternate path calling the `REGISTER_USER` procedure (profile only, no password/JWT) |
| `GET` | `/api/users` | All user profiles |
| `GET` | `/api/users/:id` | Single profile, `404` if not found |

### Subscriptions & Payments 🔒

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/subscriptions/my` | Active subscription, preferring `PREMIUM` over `FREE`; `404` if none |
| `POST` | `/api/subscriptions` | Validates plan, blocks duplicate Premium (`409`), calls `subscribe_user(...)` |
| `GET` | `/api/payments/my` | Payment history ordered by `payment_date DESC` |
| `POST` | `/api/payments` | Verifies subscription ownership (`403`), then `make_payment(...)` |

```jsonc
// POST /api/subscriptions
{ "plan_type": "PREMIUM" }

// POST /api/payments
{ "subscription_id": 1, "amount": 999, "payment_mode": "CARD" }
```

**Error format:** `{ "error": "...", "details": "ORA-20001: ...", "oracleCode": 20001 }`

---

## Frontend Overview

**Main Dashboard (`page.tsx`)**

| Section | Description |
|---|---|
| Music & Podcasts | Top-level toggle between catalogue and podcast library |
| Popular Songs | Song grid with cover art, artist, formatted duration, click-to-play |
| Artists | Artist cards with bio and a Follow / Following toggle |
| Albums | Album grid with cover art and release info |
| Your Library | Create playlists inline; select one to view its songs |
| Podcasts | Podcast list; selecting a show loads its episodes |
| Search Bar | Instant filtering of the loaded catalogue |
| Player Bar | Persistent bottom player with play/pause, seek, track metadata |

**`AuthModel.tsx`** toggles between `login` and `register` from one component, validates required fields, writes both `localStorage` keys, then lifts state via `onSuccess(token, user)`. **`SubscriptionModal.tsx`** fetches the current plan on open and presents a two-step flow (plan view → payment form) with per-mode validation, blocking upgrades when Premium is already active. **`lib/api.ts`** is an `apiFetch()` wrapper that reads the JWT from `localStorage` and attaches the `Authorization` header, so route files never handle token plumbing manually.

---

## Authentication Flow

```text
Client Modal ──1. credentials──► Express /api/auth ──2. SELECT by email──► APP_USER
                                        │  ◄──3. row + password hash──────────┘
                                        ▼  4. bcrypt.compare(plain, hash)
                                 jwt.sign({ user_id, email }, JWT_SECRET, 7d)
                                        │
     ◄──────────5. { token, user }──────┘
     ▼  6. localStorage.setItem("musicstream_token", ...)

All later protected calls send Authorization: Bearer <token>
  ──► decoded to req.user ──► scopes playlists, subscriptions, payments
```

Plaintext passwords are never persisted. On mount, a `useEffect` rehydrates React state from both `localStorage` keys; logout clears them and resets follow/playlist state.

---

## Project Structure

```text
Music-Streamer-using-SQL-PL-SQL/
├── backend/
│   ├── server.js              # Express entry point, mounts 10 routers
│   ├── db.js                  # node-oracledb helper, OUT_FORMAT_OBJECT
│   ├── middleware/auth.js     # Imported by routes as authenticateToken
│   ├── routes/                # auth, users, songs, artists, albums,
│   │                          # playlists, podcasts, episodes,
│   │                          # subscriptions, payments
│   ├── package.json           # express, oracledb, bcryptjs, jsonwebtoken, cors, dotenv
│   └── .env                   # Credentials (git-ignored)
├── database/
│   ├── 01_tables.sql          # 13 tables, constraints, password ALTER
│   ├── 02_procedures.sql      # 7 stored procedures
│   ├── 03_functions.sql       # 5 stored functions
│   ├── 04_triggers.sql        # 5 row-level triggers
│   └── 05_seed.sql            # Sample data across all tables
├── frontend/
│   ├── app/
│   │   ├── page.tsx           # Main SPA: player, catalogue, playlists, podcasts
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── components/        # AuthModel.tsx, SubscriptionModal.tsx
│   │   └── lib/api.ts         # JWT-aware fetch wrapper
│   └── public/
│       ├── audio/             # 4 sample MP3 tracks
│       └── images/            # Matching album cover art
├── .gitignore                 # node_modules, .env, .next, dist, build, *.log
└── README.md
```

---

## Local Setup Guide

**Prerequisites:** Node.js v18+, Oracle Database Free 23.x (`FREEPDB1`), SQL*Plus / SQL Developer / SQLcl, Git.

### 1. Clone the repository

```bash
git clone https://github.com/jovanajeboy/Music-Streamer-using-SQL-PL-SQL.git
cd Music-Streamer-using-SQL-PL-SQL
```

### 2. Database Initialisation

```sql
CREATE USER STREAM_APP IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE TO STREAM_APP;
GRANT UNLIMITED TABLESPACE TO STREAM_APP;
```

Run the scripts **in order** — procedures reference tables, and seed data depends on both:

```bash
cd database
sqlplus STREAM_APP/your_password@127.0.0.1:1521/freepdb1
SQL> @01_tables.sql
SQL> @02_procedures.sql
SQL> @03_functions.sql
SQL> @04_triggers.sql
SQL> @05_seed.sql
```

### 3. Backend

```bash
cd ../backend
npm install
node server.js          # → http://localhost:5000
```

Verify: `curl http://localhost:5000` → `{ "message": "Music Streaming API is running" }`

### 4. Frontend

```bash
cd ../frontend
npm install
npm run dev             # → http://localhost:3000
```

### Verification — confirm all objects compiled cleanly

```sql
SELECT object_name, object_type, status FROM user_objects
WHERE object_type IN ('PROCEDURE','FUNCTION','TRIGGER')
ORDER BY object_type, object_name;
```

Expected: **7 procedures, 5 functions, 5 triggers**, all `VALID`.

---

## Environment Variables

Create `backend/.env`:

```env
PORT=5000
DB_USER=STREAM_APP
DB_PASSWORD=your_database_password
DB_CONNECT_STRING=127.0.0.1:1521/freepdb1
JWT_SECRET=your_jwt_secret
```

| Variable | Description |
|---|---|
| `PORT` | Express listening port |
| `DB_USER` / `DB_PASSWORD` | Oracle schema credentials |
| `DB_CONNECT_STRING` | Easy Connect string (`host:port/service_name`) |
| `JWT_SECRET` | Signing secret for JSON Web Tokens |

> Never commit `.env` — it is already in `.gitignore`.

---

## Security Considerations

**Implemented:**

| Practice | Implementation |
|---|---|
| Password hashing | `bcryptjs` cost factor 10; plaintext never stored |
| SQL injection prevention | All queries and procedure calls use bind variables — no string concatenation into SQL |
| Credential isolation | DB credentials and JWT secret loaded from an untracked `.env` |
| Resource ownership | Playlist and payment writes verify ownership before proceeding (`403` otherwise) |
| Account enumeration defence | Login returns one generic `401` for both unknown email and wrong password |
| Connection hygiene | Every route closes its Oracle connection in a `finally` block |

**Recommended before production use:** remove verbose `console.log` statements echoing email addresses and login outcomes · stop returning raw `error.message` / `oracleCode` to clients, since these leak schema internals · add rate limiting on the login endpoint · replace per-request connections with a connection pool · restrict CORS to a specific origin, serve over HTTPS, and consider `httpOnly` cookies over `localStorage`.

---

## Known Limitations

- **Duplicate auth code:** `middleware/auth.js` contains near-identical register/login handlers to `routes/auth.js` and exports an Express **router**, yet route files import it as `authenticateToken` and use it as middleware. It should be replaced with a proper `verifyToken(req, res, next)` that decodes the bearer token and populates `req.user`.
- **`02_constraints.sql`** is referenced in the original setup notes but is an empty placeholder.
- **Hardcoded values:** `http://localhost:5000` appears in `page.tsx`, both modals, and `lib/api.ts` rather than an env variable, and the ₹999 Premium price is hardcoded client-side rather than driven by a pricing table.
- **Follow state is client-side only:** `followedArtists` is not hydrated from the database on load, so follows don't persist visually across a refresh.
- **Stray test block:** `02_procedures.sql` ends with an anonymous `BEGIN make_payment(61, 21, 999, 'CARD'); END;` call and contains a duplicated `UNFOLLOW_ARTIST` definition.
- **Public catalogue endpoints:** Songs, artists, albums, podcasts, episodes, and user listings need no auth; only playlists, subscriptions, payments, and follows are protected.

---

## Future Improvements

- [ ] Replace `middleware/auth.js` with a dedicated JWT verification middleware
- [ ] Introduce an `oracledb` connection pool; move the API base URL into `NEXT_PUBLIC_API_URL`
- [ ] Persist and hydrate follow state from `USER_ARTIST` on page load
- [ ] Expose the PL/SQL functions through API endpoints as live UI statistics
- [ ] Add a `PLAN` / pricing table so subscription amounts are database-driven
- [ ] Add listening-history tracking for "recently played" and recommendations
- [ ] Implement playlist deletion and song removal (`PLAYLIST_SONG` already cascades)
- [ ] Add server-side search endpoints so filtering scales beyond the loaded page

---


**Repository:** <https://github.com/jovanajeboy/Music-Streamer-using-SQL-PL-SQL> — created for academic/college project purposes.
