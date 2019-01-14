import express from 'express';
import instructorController from './instructorController';
import jwtAuthz from 'express-jwt-authz';

export const instructorRouter = express.Router();

instructorRouter.param('id', instructorController.findByParam);

let checkScopes = jwtAuthz(['admin:true']);

instructorRouter
  .route('/')
  .get(instructorController.getAll)
  .post(instructorController.createOne, checkScopes);

instructorRouter
  .route('/:id')
  .get(instructorController.getOne)
  .put(instructorController.updateOne)
  .delete(instructorController.deleteOne);
