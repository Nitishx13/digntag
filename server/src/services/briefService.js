import { pool } from '../config/db.js';

export const createBrief = async ({ category, payload }) => {
  const result = await pool.query(
    `INSERT INTO briefs (category, payload)
     VALUES ($1, $2)
     RETURNING id, category, payload, created_at`,
    [category, payload]
  );
  return result.rows[0];
};
