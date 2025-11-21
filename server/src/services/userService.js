import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { pool } from '../config/db.js';
import { env } from '../config/env.js';

const SALT_ROUNDS = 10;

export const createUser = async ({ fullName, email, password }) => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, full_name, email, created_at`,
    [fullName, email, passwordHash]
  );
  return result.rows[0];
};

export const verifyUser = async ({ email, password }) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) {
    return null;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    return null;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, fullName: user.full_name },
    env.jwtSecret,
    { expiresIn: '7d' }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      createdAt: user.created_at,
    },
  };
};
