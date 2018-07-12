const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dev = env !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.get('*', (req, res) => handle(req, res));

    server.listen(3000, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

