import express from 'express';
import instructorController from './instructorController';

export const instructorRouter = express.Router();

instructorRouter.param('id', instructorController.findByParam);

instructorRouter
  .route('/')
  .get(instructorController.getAll)
  .post(instructorController.createOne);

instructorRouter
  .route('/:id')
  .get(instructorController.getOne)
  .put(instructorController.updateOne)
  .delete(instructorController.createOne);
