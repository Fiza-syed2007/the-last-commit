# The Last Commit

> A high-concept hackathon platform built around the idea of a live Git repository approaching its final commit.

**The Last Commit** is a full-stack hackathon website developed for the Cherry Network WebDev Trainee Task.

The project combines an animated, Git-inspired frontend with a Node.js + TypeScript backend, PostgreSQL database, participant registration system, JWT-based admin authentication, and an admin dashboard for managing registrations.

---

## Live Demo

**Frontend:**
https://the-last-commit.onrender.com

**Backend API:**
https://the-last-commit-api.onrender.com

**Admin Portal:**
https://the-last-commit.onrender.com/admin/login

---

## Concept

The website treats the hackathon as if it were a live software repository approaching its final commit.

The interface uses Git and developer terminology throughout the experience:

* **Repository** → Hackathon
* **Commits** → Event history
* **Branches** → Hackathon tracks
* **Releases** → Prizes
* **Final Commit** → Registration
* **Repository Control Panel** → Admin dashboard

The visual direction focuses on a dark developer environment with green status indicators, terminal-inspired elements, sharp borders, animated transitions, and interactive UI states.

---

## Features

### Public Website

* Animated loading/boot sequence
* Git-inspired visual identity
* Animated hero section
* Repository-style event history
* Hackathon tracks / branches
* Prize / release section
* Final registration call-to-action
* Responsive design
* Smooth scrolling
* Mouse-following interaction
* Framer Motion animations
* Interactive registration experience

### Registration System

Participants can submit:

* Full name
* Email
* College
* Team name
* Team size
* Team members
* Project name
* Track
* Project description

Registration data is sent to the backend API and stored in PostgreSQL.

### Admin Portal

The admin portal provides:

* Secure admin login
* JWT authentication
* Registration statistics
* Total registrations
* Pending registrations
* Approved registrations
* Rejected registrations
* Registration table
* Detailed registration modal
* Approve registration
* Reject registration
* Refresh registrations
* Logout functionality

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React
* React Router

### Backend

* Node.js
* TypeScript
* Express
* JWT
* bcryptjs
* CORS

### Database

* PostgreSQL
* Prisma ORM

### Deployment

* Render — Frontend
* Render — Backend
* Neon — PostgreSQL database

---

## Project Structure

```text
the-last-commit/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── sections/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── src/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── package.json
│   └── tsconfig.json
│
├── README.md
├── prompts.md
└── .gitignore
```

---

## Architecture

```text
                 ┌─────────────────────────┐
                 │       React Frontend    │
                 │   Vite + TypeScript     │
                 └────────────┬────────────┘
                              │
                              │ HTTP / JSON
                              ▼
                 ┌─────────────────────────┐
                 │      Express API        │
                 │   Node.js + TypeScript  │
                 └────────────┬────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
                ▼                           ▼
       ┌─────────────────┐        ┌─────────────────┐
       │ Registration    │        │ Admin Auth      │
       │ Routes          │        │ JWT + bcrypt    │
       └────────┬────────┘        └─────────────────┘
                │
                ▼
       ┌─────────────────┐
       │ Prisma ORM      │
       └────────┬────────┘
                │
                ▼
       ┌─────────────────┐
       │ PostgreSQL      │
       │ Neon            │
       └─────────────────┘
```

---

## API Endpoints

### Health Check

```http
GET /api/health
```

Returns the current API status.

### Create Registration

```http
POST /api/registrations
```

Creates a new participant/team registration.

### Get Registrations

```http
GET /api/registrations
Authorization: Bearer <JWT_TOKEN>
```

Returns registrations for authenticated administrators.

### Update Registration Status

```http
PATCH /api/registrations/:id/status
Authorization: Bearer <JWT_TOKEN>
```

Supported statuses:

```text
PENDING
APPROVED
REJECTED
```

### Admin Login

```http
POST /api/admin/login
```

Authenticates the administrator and returns a JWT token.

### Admin Verification

```http
GET /api/admin/me
Authorization: Bearer <JWT_TOKEN>
```

Verifies the current administrator session.

---

## Database

The application uses PostgreSQL with Prisma ORM.

### Registration

The `Registration` model stores:

* ID
* Full name
* Email
* College
* Team name
* Team size
* Team members
* Project name
* Track
* Description
* Status
* Created timestamp
* Updated timestamp

### Admin

The `Admin` model stores:

* ID
* Email
* Hashed password
* Created timestamp
* Updated timestamp

Passwords are hashed using `bcryptjs` rather than being stored as plain text.

---

## Environment Variables

### Backend

Create `backend/.env`:

```env
DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
JWT_SECRET=
FRONTEND_URL=
```

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=
```

Do not commit `.env` files or production credentials to GitHub.

---

## Local Development

### 1. Clone the repository

```bash
git clone https://github.com/Fiza-syed2007/the-last-commit.git
cd the-last-commit
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

Create the frontend environment file:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

---

### 3. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

Configure the backend `.env` file.

Run Prisma migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Seed the admin account:

```bash
npx tsx prisma/seed.ts
```

Start the backend:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

---

## Production Deployment

The production setup consists of three services:

```text
React/Vite frontend
        │
        ▼
     Render
        │
        ▼
Node.js/Express API
        │
        ▼
      Prisma
        │
        ▼
   Neon PostgreSQL
```

The frontend uses the `VITE_API_URL` environment variable to communicate with the deployed backend.

The backend uses `FRONTEND_URL` to configure CORS for the deployed frontend.

Database migrations are applied during backend deployment using:

```bash
npx prisma migrate deploy
```

---

## Security

* Admin passwords are hashed with bcrypt.
* Admin API routes require JWT authentication.
* JWT secrets are stored as environment variables.
* Database credentials are stored as environment variables.
* `.env` files are excluded from Git.
* Registration viewing and status management are protected by authentication.

---

## AI Usage

ChatGPT was used during development for:

* Understanding React, TypeScript, Express and Prisma concepts
* UI and interaction ideas
* Component implementation
* Animation ideas
* Backend architecture
* Debugging
* Deployment troubleshooting
* API integration
* Understanding errors and improving implementation

All generated code was reviewed, tested, integrated, and adapted to the project's structure and requirements.

Detailed development prompts and adaptations are documented in [`prompts.md`](./prompts.md).

---

## Submission

Built for the **Cherry Network WebDev Trainee Task — The Last Commit**.

The project was developed as a second-year submission with:

* Frontend
* Node.js + TypeScript backend
* PostgreSQL database
* Registration system
* Admin authentication
* Admin portal
* Production deployment

---

## Developer

Fiza Syed
RA2511003012419
B.Tech CSE Core
SRM Institute of Science and Technology
