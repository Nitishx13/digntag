import { pool } from '../config/db.js';

export const createContact = async ({ firstName, lastName, email, subject, message }) => {
  const result = await pool.query(
    `INSERT INTO contacts (first_name, last_name, email, subject, message)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, first_name, last_name, email, subject, message, created_at`,
    [firstName, lastName, email, subject, message]
  );
  return result.rows[0];
};
