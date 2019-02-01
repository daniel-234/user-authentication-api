import express from 'express';
import { userRouter } from './resources/user/userRouter';
import { instructorRouter } from './resources/instructor/instructorRouter';
import { verifyUser, authenticate } from './modules/auth';

export const restRouter = express.Router();

restRouter.post('/users/authenticate', verifyUser, authenticate);

restRouter.use('/users', userRouter);
restRouter.use('/instructors', instructorRouter);
