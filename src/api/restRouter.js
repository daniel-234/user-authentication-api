import express from 'express';
import { userRouter } from './resources/user/userRouter';
import { instructorRouter } from './resources/instructor/instructorRouter';

export const restRouter = express.Router();

restRouter.use('/user', userRouter);
restRouter.use('/instructor', instructorRouter);