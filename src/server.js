import express from 'express';
import { restRouter } from './api/restRouter';
import setupMiddleware from './middleware';

const app = express();
setupMiddleware(app);

app.get('/', (req, res) => {
  res.send('Basic routing setting is ok!');
});

app.use('/api', restRouter);

export default app;
