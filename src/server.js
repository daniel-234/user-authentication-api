import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Basic routing setting is ok!');
});

export default app;
