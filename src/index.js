import app from './server';
import http from 'http';

// Load variables from the .env file if not in production.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
let currentApp = app;

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});

if (module.hot) {
  module.hot.accept(['./server'], () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}
