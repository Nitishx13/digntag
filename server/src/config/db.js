import { Pool } from 'pg';
import { env } from './env.js';

if (!env.databaseUrl) {
  console.warn('DATABASE_URL is not set. Neon/Postgres connection will fail.');
}

export const pool = new Pool({
  connectionString: env.databaseUrl,
  ssl: env.nodeEnv === 'production' ? { rejectUnauthorized: false } : undefined,
});
