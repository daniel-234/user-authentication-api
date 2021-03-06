import express from 'express';
import userController from './userController';

export const userRouter = express.Router();

userRouter.param('id', userController.findByParam);

userRouter
  .route('/')
  .get(userController.getAll)
  .post(userController.createOne);

userRouter
  .route('/:id')
  .put(userController.updateOne)
  .delete(userController.deleteOne);
