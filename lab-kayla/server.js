'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const KillerDragon = require('./model/killer-dragon');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/dragon', function(req, res) {
  debug('GET /api/dragon');
  if(req.url.query.id) {
    storage.fetchItem('dragon', req.url.query.id)
    .then(dragon => {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write(JSON.stringify(dragon))
      res.end()
    })
    .catch(err => {
      console.error(err)
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write('not found')
      res.end()
    });
    return
  }
  res.writeHead(400, {'Content-Type': 'text/plain'})
  res.write('bad request')
  res.end()
})

router.post('/api/dragon', function(req, res) {
  debug('POST /api/dragon')
  console.log(req.body)
  try {
    let dragon = new KillerDragon(req.body.name, req.body.type, req.body.hazard)
    storage.createItem('dragon', dragon)
    .then(newDragon => {
      console.log(newDragon);
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.write('bad request')
      res.end()
    })
  } catch(e) {
    console.error(e)
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
})

router.put('/api/dragon', function(req, res) {
  debug('PUT /api/dragon');
  if(req.url.query.id) {
    storage.fetchItem('dragon', req.url.query.id)
    .then(dragon => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(dragon));
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

router.delete('/api/dragon', function(req, res) {
  debug('DELETE /api/dragon')
  if(req.url.query.id) {
    storage.deleteItem('dragon', req.url.query.id)
    .then( () => {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end()
    })
    .catch(err => {
      console.error(err)
      res.writeHead(400, {'Content-Type': 'text/plain'})
      res.write('item not found')
      res.end()
    })
    return
  }
});

server.listen(PORT, () => console.log(`Connected to port ${PORT}`))
