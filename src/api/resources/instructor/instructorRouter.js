import express from 'express';
import instructorController from './instructorController';

export const instructorRouter = express.Router();

// instructorRouter.route('/').get((req, res) => {
//   res.send('this is the intructor root end point');
// });

instructorRouter.route('/').get(instructorController.getAll);
