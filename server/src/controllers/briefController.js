import { createBrief } from '../services/briefService.js';

export const submitBrief = async (req, res, next) => {
  try {
    const { category, payload } = req.body;
    if (!category || !payload) {
      return res.status(400).json({ message: 'category and payload are required' });
    }

    const brief = await createBrief({ category, payload });
    return res.status(201).json({ brief });
  } catch (error) {
    next(error);
  }
};
