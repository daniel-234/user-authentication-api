import app from './server';
import http from 'http';
// See the acknowledgments section in README about 'dotenv'.
import 'dotenv/config';

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
