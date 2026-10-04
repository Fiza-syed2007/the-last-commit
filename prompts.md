# ChatGPT Development Prompts

This file documents the major prompts and categories of prompts used with ChatGPT while developing **The Last Commit** for the Cherry Network WebDev Trainee Task.

ChatGPT was used as a development assistant for learning, planning, debugging, implementation, and deployment troubleshooting.

No autonomous coding agent was used.

---

# 1. Project Concept and Architecture

### Prompt

> I am participating in the Cherry Network WebDev Trainee Task to build a high-concept frontend website for a hackathon called "The Last Commit". The theme revolves around a high-stakes, dystopian/cyberpunk developer narrative where the final code commit changes everything. Help me design the concept, information architecture, sections, interactions, and visual direction.

### How the response was used

The concept was adapted into a Git/repository-based hackathon experience.

The final mapping became:

* Hackathon → Repository
* Event history → Git History
* Tracks → Branches
* Prizes → Releases
* Registration → Final Commit
* Admin portal → Repository Control Panel

The visual direction was also adapted to use a restrained dark developer aesthetic rather than copying a predefined design.

---

# 2. Frontend Technology Selection

### Prompt

> Generate a React/TypeScript frontend structure using Vite and Tailwind CSS with Framer Motion and Lucide React for a highly animated hackathon website.

### How the response was used

The suggested structure was adapted into the project's actual Vite React TypeScript architecture.

The project uses:

* React
* TypeScript
* Vite
* Tailwind CSS
* Framer Motion
* Lucide React

Components and sections were reorganized according to the project's repository theme.

---

# 3. Visual Design

### Prompt

> Create a modern developer-focused visual system for "The Last Commit" using deep black backgrounds, green status/action colors, sharp borders, terminal-inspired UI, Git concepts, negative space, and animated typography.

### How the response was used

The visual system was adapted into:

* Dark backgrounds
* Green state indicators
* Terminal-style elements
* Git-inspired labels
* Repository graph background
* Sharp borders
* Monospace typography
* Animated transitions

The final UI was adjusted during implementation to maintain readability and responsiveness.

---

# 4. Loading Experience

### Prompt

> Design a loading screen for a hackathon website that feels like a repository booting up, with sequential system messages and a progress indicator.

### How the response was used

A `LoadingScreen` React component was implemented using Framer Motion.

The final version displays sequential boot messages such as:

```text
INITIALIZING SYSTEM...
LOADING HACKATHON CORE...
CHECKING BUILD STATUS...
ESTABLISHING CONNECTION...
SYSTEM READY.
```

The timing and visual presentation were adapted during implementation.

---

# 5. Interactive Background

### Prompt

> Create an animated repository/network background for a dark developer-themed website using React, SVG and Framer Motion.

### How the response was used

The result was adapted into a `RepositoryGraph` component containing:

* Animated nodes
* Repository-style paths
* Subtle motion
* Low-opacity background effects

The component was kept decorative so it would not interfere with the main content.

---

# 6. Registration System Architecture

### Prompt

> I am a second-year student and need to build a complete registration system for the hackathon using a Node.js TypeScript backend, PostgreSQL database, and a React frontend. Help me design the API routes, database model, validation, and frontend/backend communication.

### How the response was used

The final implementation uses:

```text
React
   ↓
Express + TypeScript
   ↓
Prisma
   ↓
PostgreSQL
```

A `Registration` model was created containing participant, team, project, track, description, status, and timestamps.

The frontend registration form submits JSON to the backend API.

---

# 7. Prisma Database Setup

### Prompt

> Explain how to configure Prisma with PostgreSQL for a Node.js TypeScript Express backend, including schema design, migrations, Prisma Client generation, and environment variables.

### How the response was used

The project was configured with:

* Prisma
* PostgreSQL
* Environment-based `DATABASE_URL`
* Prisma migrations
* Generated Prisma Client

Database migrations were created and deployed to the production PostgreSQL database.

---

# 8. Admin Authentication

### Prompt

> Help me implement a simple secure admin authentication system for an Express TypeScript backend using bcrypt for password hashing and JWT for authentication.

### How the response was used

The implementation was adapted to the project's admin requirements.

The final system includes:

* Admin database model
* bcrypt password hashing
* Admin login route
* JWT generation
* Authentication middleware
* Protected registration endpoints
* Admin verification endpoint

JWT credentials and secrets are stored in environment variables.

---

# 9. Admin Dashboard

### Prompt

> Design an admin dashboard for a hackathon registration system where organizers can view registrations, see registration statistics, inspect registration details, and approve or reject registrations.

### How the response was used

The final dashboard includes:

* Total registration count
* Pending count
* Approved count
* Rejected count
* Registration table
* Registration details modal
* Approve action
* Reject action
* Refresh
* Logout

The UI was adapted to match the Git repository concept.

---

# 10. Frontend API Integration

### Prompt

> My React frontend works locally with localhost:5000, but the deployed Render frontend needs to communicate with the deployed Render backend. Show me how to use Vite environment variables for the production API URL.

### How the response was used

The frontend API calls were changed from hardcoded localhost URLs to:

```ts
import.meta.env.VITE_API_URL
```

The production frontend uses:

```text
VITE_API_URL=https://the-last-commit-api.onrender.com
```

This was applied to registration, admin login, and admin dashboard requests.

---

# 11. CORS Configuration

### Prompt

> My React frontend and Express backend are deployed separately on Render. Explain how to configure Express CORS so that the production frontend can access the backend API while still allowing localhost during development.

### How the response was used

The backend was configured to use:

```ts
origin: process.env.FRONTEND_URL || "http://localhost:5173"
```

The production backend uses the deployed frontend URL through the `FRONTEND_URL` environment variable.

---

# 12. React Router Deployment Debugging

### Prompt

> My React Router routes work locally but direct URLs such as /register return a 404 after deploying the Vite app to Render. How do I configure the deployment to serve index.html for client-side routes?

### How the response was used

A Render rewrite was added:

```text
Source: /*
Destination: /index.html
Action: Rewrite
```

This allows React Router routes such as:

```text
/register
/admin/login
/admin
```

to load correctly in production.

---

# 13. Production Debugging

### Prompt

> My deployed registration page is trying to call localhost:5000 instead of my deployed Render backend and the browser shows ERR_CONNECTION_REFUSED. Explain what is happening and how to debug the production Vite environment variable and deployment build.

### How the response was used

The issue was identified as a production frontend build/environment configuration problem rather than the deployed backend itself.

The production environment was configured with:

```text
VITE_API_URL=https://the-last-commit-api.onrender.com
```

The frontend was then redeployed so Vite could include the production API URL in the build.

---

# 14. Git and Submission Preparation

### Prompt

> Help me prepare my React frontend and Node.js TypeScript backend project for a public GitHub submission. What should I check regarding .gitignore, environment variables, secrets, README, migrations, and build files?

### How the response was used

The repository was configured to exclude:

```text
.env
.env.*
node_modules/
dist/
build/
logs/
```

while keeping important source files such as:

```text
prisma/migrations/
package-lock.json
README.md
prompts.md
```

No production credentials were intended to be committed.

---

# 15. Code Review and Debugging

ChatGPT was also used interactively throughout development to:

* Explain TypeScript errors
* Explain React component behavior
* Debug API requests
* Debug deployment issues
* Understand Prisma migration errors
* Understand CORS behavior
* Understand environment variables
* Verify Git commands
* Improve implementation decisions

When generated code was used, it was reviewed and adapted to the existing project rather than being accepted blindly.

---

# Development Adaptation Statement

The generated suggestions from ChatGPT were treated as starting points for implementation and learning.

The final project was assembled and tested manually. Components, routes, API calls, database models, styling, environment configuration, deployment settings, and debugging changes were adapted to the actual project structure.

The final implementation should therefore be understood as an AI-assisted development project rather than an autonomous code-generation submission.
