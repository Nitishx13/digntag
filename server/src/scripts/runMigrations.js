import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.resolve(__dirname, '../../migrations');

const runMigrations = async () => {
  const client = await pool.connect();
  try {
    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf-8');
      console.log(`=> Running migration ${file}`);
      await client.query(sql);
    }
    console.log('All migrations executed successfully');
  } catch (error) {
    console.error('Migration failed', error);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
};

runMigrations();
