Music Streamer
A music and podcast streaming platform built with Next.js, Node.js, Express, Oracle Database, and PL/SQL.
Features
User registration and login
JWT authentication
Music browsing and playback
Artist and album browsing
Search
Playlist creation and song management
Follow/unfollow artists
Podcast and episode browsing
Premium subscription
Payment history
Tech Stack
Frontend: Next.js, React, TypeScript
Backend: Node.js, Express.js
Database: Oracle Database Free 23.x
Database Programming: SQL and PL/SQL
Authentication: JWT + bcryptjs
Project Structure
```text
music-streaming/
├── frontend/
├── backend/
└── database/
    ├── 01\\\_tables.sql
    ├── 02\\\_constraints.sql
    ├── 02\\\_procedures.sql
    ├── 03\\\_functions.sql
    ├── 04\\\_triggers.sql
    └── 05\\\_seed.sql
```
Database
Main tables:
APP_USER
ARTIST
ALBUM
SONG
PLAYLIST
PLAYLIST_SONG
USER_ARTIST
SUBSCRIPTION
PAYMENT
DEVICE
PODCAST_CREATOR
PODCAST
EPISODE
The database also contains PL/SQL procedures, functions, and triggers for application operations and data validation.
PL/SQL
Procedures
REGISTER_USER
CREATE_PLAYLIST
ADD_SONG_TO_PLAYLIST
FOLLOW_ARTIST
UNFOLLOW_ARTIST
SUBSCRIBE_USER
Functions
GET_TOTAL_SONGS
GET_PLAYLIST_SONG_COUNT
GET_ARTIST_FOLLOWER_COUNT
GET_USER_PLAN
GET_TOTAL_PAYMENT
Triggers
TRG_PLAYLIST_CREATED_DATE
TRG_PLAYLIST_VISIBILITY
TRG_PAYMENT_DATE
TRG_SUBSCRIPTION_DATES
TRG_SONG_DURATION
Media Files
```text
frontend/public/
├── audio/
│   ├── Fur Elise.mp3
│   ├── Passacaglia.mp3
│   ├── Running Night.mp3
│   └── Tell Me What.mp3
└── images/
    ├── Fur Elise.jpg
    ├── Passacaglia.jpg
    ├── Running Night.jpg
    └── Tell Me What.jpg
```
Setup
1. Database
Start Oracle Database and connect to `FREEPDB1`.
Run the SQL files in order:
```text
01\\\_tables.sql
02\\\_constraints.sql
02\\\_procedures.sql
03\\\_functions.sql
04\\\_triggers.sql
05\\\_seed.sql
```
`02\\\_constraints.sql` is currently an empty file and is kept as part of the project structure.
2. Backend
```bash
cd backend
npm install
```
Create `.env`:
```env
PORT=5000
DB\\\_USER=STREAM\\\_APP
DB\\\_PASSWORD=your\\\_database\\\_password
DB\\\_CONNECT\\\_STRING=127.0.0.1:1521/freepdb1
JWT\\\_SECRET=your\\\_jwt\\\_secret
```
Start the backend:
```bash
node server.js
```
Backend URL:
```text
http://localhost:5000
```
3. Frontend
```bash
cd frontend
npm install
npm run dev
```
API Routes
```text
/api/auth
/api/songs
/api/artists
/api/albums
/api/playlists
/api/podcasts
/api/episodes
/api/users
/api/subscriptions
/api/payments
```
Authentication
Passwords are hashed using bcryptjs.
Login returns a JWT token.
The frontend stores the token in localStorage.
Protected requests use the `Authorization: Bearer <token>` header.
Subscription and Payment
The application supports a Premium subscription flow with payment recording and payment history stored in Oracle.
Git
The root `.gitignore` excludes development files and environment variables such as:
```text
node\\\_modules/
.env
.next/
dist/
build/
\\\*.log
```
Project Purpose
This project demonstrates frontend development, REST APIs, Oracle database design, SQL, PL/SQL procedures, functions, triggers, authentication, playlists, artist follows, subscriptions, payments, music playback, and podcast functionality.
Repository
https://github.com/jovanajeboy/Music-Streamer-using-SQL-PL-SQL.git
