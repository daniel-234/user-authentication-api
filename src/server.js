import express from 'express';
import { restRouter } from './api/restRouter';
import setupMiddleware from './middleware';
import mongoose from 'mongoose';

const app = express();
const dbUrl = `mongodb://localhost/api_design_fe_masters`;

/*
 * Add the `bodyParser middleware to Express and handle the
 * formatting of the query string and the JSON responses for
 * us (see `middleware` module for more comments). 
 */
setupMiddleware(app);
mongoose.connect(dbUrl);

app.use('/api', restRouter);

// Handle all not defined routes.
app.all('*', (req, res) => {
  res.sendStatus(404);
});

export default app;
