# Server Environment Variables

Copy this reference into `server/.env` (file is gitignored) and update secrets when deploying.

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
