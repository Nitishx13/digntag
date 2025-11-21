import dotenv from 'dotenv';

const isTest = process.env.NODE_ENV === 'test';
const envFile = isTest ? '.env.test' : '.env';

dotenv.config({ path: envFile });

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT) || 4000,
  corsOrigin: process.env.CORS_ORIGIN || '*',
  databaseUrl: process.env.DATABASE_URL || '',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret-change-me',
};
