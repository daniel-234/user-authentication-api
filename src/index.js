// import app from server.js
const app = require('./server.js');

// Load variables from the .env file if not in production.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
