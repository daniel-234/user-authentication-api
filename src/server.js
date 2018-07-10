const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Basic routing setting is ok!');
});

module.exports = app;
