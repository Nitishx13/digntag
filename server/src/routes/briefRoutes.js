import { Router } from 'express';
import { submitBrief } from '../controllers/briefController.js';

export const briefRouter = Router();

briefRouter.post('/', submitBrief);
