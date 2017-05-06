'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Doge = require('./model/doge');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/doge', function(req, res) {
  debug('GET /api/doge');
  if(req.url.query.id) {
    storage.fetchItem('doge', req.url.query.id)
    .then(doge => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(doge));
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

router.post('/api/doge', function(req, res) {
  debug('POST /api/doge');
  console.log(req.body);
  try {
    let doge = new Doge(req.body.name, req.body.type, req.body.color);
    storage.createItem('doge', doge);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(doge));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/doge', function(req, res) {
  debug('DELETE /api/doge');
  if(req.url.query.id) {
    storage.deleteItem('doge', req.url.query.id)
    .then(doge => {
      res.writeHead(204, {'Content-Type': 'application/json'});
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

router.put('/api/doge', function(req, res) {
  debug('PUT /api/doge');
  if(req.url.query.id) {
    storage.updateItem('doge', req.url.query.id, req.body.name, req.body.type, req.body.color)
    .then(doge => {
      res.writeHead(202, {'Content-Type': 'application/json'});
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
    return;
  }

  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
