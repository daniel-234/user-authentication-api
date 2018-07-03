const express = require('express');

// Load variables from the .env file if not in production.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('App root page');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
