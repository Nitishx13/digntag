## Overview

`digntg` is a modern invitation workflow built on Next.js (App Router) with Tailwind CSS styling. The frontend is currently live in this repo, and the backend services will be added next following the structure below.

```
digntg/
│
├── client/ (this repo)        # Next.js frontend
│   ├── public/
│   ├── src/
│   │   ├── app/               # Next.js routes & pages
│   │   ├── components/        # Reusable UI
│   │   ├── data/              # Structured data (home/pricing/etc.)
│   │   ├── store/             # Zustand stores
│   │   └── styles/ utils ...
│   ├── package.json
│   └── README.md
│
├── server/ (coming soon)      # Node + Express backend
│   ├── src/
│   │   ├── config/            # DB + env
│   │   ├── controllers/       # Route handlers
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js             # Express app setup
│   │   └── server.js          # Entry point
│   ├── package.json
│   └── .env
│
├── docker-compose.yml         # Optional full-stack orchestration
└── README.md
```

## Frontend (client) scripts

```bash
npm install
npm run dev        # start Next.js dev server
npm run build      # production build
npm run start      # serve build
```

## Backend (server) roadmap

1. Scaffold `server/` via `npm init` + Express boilerplate.
2. Set up environment config + database connection in `src/config`.
3. Define models/services (e.g., Invitations, Orders, Users).
4. Expose REST endpoints under `src/routes` and wire controllers.
5. Connect frontend services to these endpoints via `src/services` on the client.

### Running the backend locally

```bash
cd server
npm install
cp .env.example .env   # set PORT, CORS_ORIGIN, DATABASE_URL
npm run dev            # starts nodemon on http://localhost:4000
```

Current sample route: `GET /api/health` → `{ status: "ok" }`.

Run database migrations (creates the `users` table on Neon):

```bash
cd server
npm run migrate
```

### Neon / Postgres configuration

- Create a Neon project + database, then copy the connection string ("postgresql://...").
- Store it in `server/.env` as `DATABASE_URL=postgresql://user:password@.../neondb`.
- The server uses `pg` with SSL enabled in production; no additional client code is needed—import `pool` from `src/config/db.js` inside services/controllers when you start writing queries.

Example `.env` values (replace with your own secrets when promoting to production):

```
# Recommended for most uses
DATABASE_URL=postgresql://neondb_owner:npg_sbBET1qD3kxI@ep-tiny-block-adky2zs0-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# For uses requiring a connection without pgbouncer
DATABASE_URL_UNPOOLED=postgresql://neondb_owner:npg_sbBET1qD3kxI@ep-tiny-block-adky2zs0.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# Parameters for constructing your own connection string
PGHOST=ep-tiny-block-adky2zs0-pooler.c-2.us-east-1.aws.neon.tech
PGHOST_UNPOOLED=ep-tiny-block-adky2zs0.c-2.us-east-1.aws.neon.tech
PGUSER=neondb_owner
PGDATABASE=neondb
PGPASSWORD=npg_sbBET1qD3kxI

# Parameters for Vercel Postgres Templates
POSTGRES_URL=postgresql://neondb_owner:npg_sbBET1qD3kxI@ep-tiny-block-adky2zs0-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_URL_NON_POOLING=postgresql://neondb_owner:npg_sbBET1qD3kxI@ep-tiny-block-adky2zs0.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
POSTGRES_USER=neondb_owner
POSTGRES_HOST=ep-tiny-block-adky2zs0-pooler.c-2.us-east-1.aws.neon.tech
POSTGRES_PASSWORD=npg_sbBET1qD3kxI
POSTGRES_DATABASE=neondb
POSTGRES_URL_NO_SSL=postgresql://neondb_owner:npg_sbBET1qD3kxI@ep-tiny-block-adky2zs0-pooler.c-2.us-east-1.aws.neon.tech/neondb
POSTGRES_PRISMA_URL=postgresql://neondb_owner:npg_sbBET1qD3kxI@ep-tiny-block-adky2zs0-pooler.c-2.us-east-1.aws.neon.tech/neondb?connect_timeout=15&sslmode=require

# Neon Auth environment variables for Next.js
NEXT_PUBLIC_STACK_PROJECT_ID=ec41db7f-f47f-4b3b-b665-123c94f85f9d
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_j5csjdj6kt5vg9m77449xcr8bp5eaaz917zpdzaaqdx88
STACK_SECRET_SERVER_KEY=ssk_h6q6gy649z43fm69rx47dxk59gc4gs3kz14h06nkngt7g
```

### Auth endpoints

- `POST /api/auth/signup` → `{ user }`
  - body: `{ "fullName": "Aadhya Iyer", "email": "aadhya@example.com", "password": "strongpass" }`
- `POST /api/auth/login` → `{ token, user }`
  - body: `{ "email": "aadhya@example.com", "password": "strongpass" }`

## Developer notes

- All homepage constants live in `src/data/home.ts` for quick edits.
- UI sections are broken into reusable components (`components/sections/*`).
- When adding backend features, mirror the structure above so new developers can onboard quickly.
