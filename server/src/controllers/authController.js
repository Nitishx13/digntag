import { createUser, verifyUser } from '../services/userService.js';

export const signup = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'fullName, email, and password are required' });
    }

    const user = await createUser({ fullName, email, password });
    return res.status(201).json({ user });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const session = await verifyUser({ email, password });
    if (!session) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json(session);
  } catch (error) {
    next(error);
  }
};
