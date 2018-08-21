const express = require('express');
const next = require('next');

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';
const dev = env !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const { submitQuery } = require('./utils');

app.prepare()
  .then(() => {
    const server = express();

    // Handle search requests
    server.post('/search/:query', async (req, res) => {
      const queryResponse = await submitQuery(req.params.query);
      const results = await queryResponse.toPromise();

      res.send(JSON.stringify({ response: results }));
    });

    server.get('/listings/:query', (req, res) => {
      const actualPage = '/listings';
      const queryParams = { query: req.params.query };

      app.render(req, res, actualPage, queryParams);
    });

    // Handle all other requests
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

