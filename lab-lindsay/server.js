'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const KidToy = require('./model/candy');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/candy', function(req, res) {
  debug('GET /api/candy');
  if(req.url.query.id) {
    storage.fetchItem('candy', req.url.query.id)
    .then(candy => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(candy));
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

router.post('/api/candy', function(req, res) {
  debug('POST /api/candy');
  console.log(req.body);
  try {
    let candy = new CandyBar(req.body.name, req.body.type, req.body.texture);
    storage.createItem('candy', candy);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(candy));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/candy', function(req, res) {
  debug('PUT /api/candy');
  if(req.url.query.id) {
    storage.updateItem('candy', req.url.query.id, req.body.name, req.body.type, req.body.texture)
    .then(candy => {
      res.writeHead(202, {'Content-Type': 'text/plain'});
      res.end();
    });
    .catch(err => {
      console.error(error);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    })
  return;}
});

router.delete('/api/candy', function(req, res) {
  debug('DELETE /api/candy');
  if(req.url.query.id) {
    storage.removeItem('candy', req.url.query.id)
    .then(candy => {
      res.writeHead(204, {'Content-Type': 'text/plain'});
      res.end();
    });
    .catch(err => {
      console.error(error);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    })
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
