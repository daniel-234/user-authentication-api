import express from 'express';
import { restRouter } from './api/restRouter';
import setupMiddleware from './middleware';
import mongoose from 'mongoose';

const app = express();
const dbUrl = `mongodb://localhost/api_design_fe_masters`;

setupMiddleware(app);
mongoose.connect(dbUrl);

app.get('/', (req, res) => {
  res.send('Basic routing setting is ok!');
});

app.use('/api', restRouter);

export default app;
