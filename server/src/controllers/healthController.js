import { getStatus } from '../services/statusService.js';

export const getHealth = (req, res) => {
  const status = getStatus();
  return res.status(200).json(status);
};
