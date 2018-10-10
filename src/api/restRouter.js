import express from 'express';
import { userRouter } from './resources/user/userRouter';
import { instructorRouter } from './resources/instructor/instructorRouter';

export const restRouter = express.Router();

restRouter.post('/login', (req, res) => {
  const user = req.body.username;

  res.status(200).send(`You logged in with username ${user}`);
});

restRouter.use('/user', userRouter);
restRouter.use('/instructor', instructorRouter);
