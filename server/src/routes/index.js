import { Router } from 'express';
import { healthRouter } from './healthRoutes.js';
import { authRouter } from './authRoutes.js';
import { briefRouter } from './briefRoutes.js';
import { contactRouter } from './contactRoutes.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/briefs', briefRouter);
apiRouter.use('/contact', contactRouter);
