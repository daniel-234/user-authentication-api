import express from 'express';
import { restRouter } from './api/restRouter';

const app = express();

app.get('/', (req, res) => {
  res.send('Basic routing setting is ok!');
});

app.use('/api', restRouter);

export default app;
