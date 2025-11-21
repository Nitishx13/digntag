import { createContact } from '../services/contactService.js';

export const submitContact = async (req, res, next) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ message: 'firstName, lastName, email, and message are required' });
    }

    const contact = await createContact({ firstName, lastName, email, subject, message });
    return res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};
