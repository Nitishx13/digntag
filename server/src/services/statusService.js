import { env } from '../config/env.js';

export const getStatus = () => ({
  status: 'ok',
  environment: env.nodeEnv,
  timestamp: new Date().toISOString(),
});
