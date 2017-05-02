'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Pokemon = require('./model/pokemon');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/pokemon', function(req, res) {
  debug('GET /api/pokemon');
  if (req.url.query.id) {
    storage.fetchPokemon('pokemon', req.url.query.id)
    .then(pokemon => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(pokemon));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.post('/api/pokemon', function(req, res) {
  debug('POST /api/pokemon');
  console.log(req.body);
  try {
    let pokemon = new Pokemon(req.body.name, req.body.type);
    storage.createPokemon('pokemon', pokemon);
    res.writeHead(201, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(pokemon));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/pokemon', function(req, res) {
  debug('PUT /api/pokemon');
  storage.updatePokemon('pokemon', req.body.id, req.body)
  .then(pokemon => {
    res.writeHead(202, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify(pokemon));
    res.end();
  })
  .catch(err => {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  });
  return;
});

router.delete('/api/pokemon', function(req, res) {
  debug('DELETE /api/pokemon');
  if (req.url.query.id) {
    storage.deletePokemon('pokemon', req.url.query.id)
    .then(() => {
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.write('pokemon successfully deleted');
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
