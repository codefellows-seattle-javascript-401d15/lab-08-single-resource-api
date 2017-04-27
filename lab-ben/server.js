'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const Hardware = require('./model/consoles.js');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/console', function(req, res) {
  debug('GET /api/console');
  if(req.url.query.id) {
    storage.fetchItem('console', req.url.query.id)
    .then(hardware => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(hardware));
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
});

router.post('/api/consoles', function(req, res) {
  debug('POST /api/consoles');

  console.log(req.body);
  try {
    let hardware = new Hardware(req.body.name, req.body.manufacturer, req.body.releaseDate);
    storage.createItem('consoles', hardware);
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(hardware));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/console', function(req, res) {
  debug('DELETE /api/console');

  if(req.url.query.id) {
    storage.deleteItem('console', req.url.query.id)
    .then(() => {
      res.writeHead(204, {'Content-Type': 'none'});
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('item not found');
      res.end();
    });
    return;
  }
});

router.put('/api/console', function(req, res) {
  debug('PUT api/console');

  if (req.url.query.id) {
    let newItem = new Hardware(req.body.name, req.body.manufacturer, req.releaseDate);
    storage.updateItem('console', req.url.query.id, newItem)
    .then(hardware => {
      res.writeHead(202, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(hardware));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type': 'text/plain'});
    });
  }
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
