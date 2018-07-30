import express from 'express';

export const instructorRouter = express.Router();

instructorRouter.route('/').get((req, res) => {
  res.send('this is the intructor root end point');
});
