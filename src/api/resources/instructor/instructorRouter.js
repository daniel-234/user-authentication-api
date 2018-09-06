import express from 'express';
import instructorController from './instructorController';

export const instructorRouter = express.Router();

instructorRouter
  .route('/')
  .get(instructorController.getAll)
  .post(instructorController.createOne);
