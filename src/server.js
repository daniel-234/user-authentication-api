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

/*
 * Temporary code added to resolve CORS problems when developing locally.
 * See README -> Issues with CORS when developing locally.
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
  next();
});

app.use('/api', restRouter);

// Handle all not defined routes.
app.all('*', (req, res) => {
  res.sendStatus(404);
});

export default app;
