'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Automobile = require('./model/model');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/auto', function(req,res) {
  debug('GET /api/auto');

  if(req.url.query.id) {
    storage.fetchCar('auto', req.url.query.id)
    .then(auto => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(auto));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.post('/api/auto', function(req, res) {
  debug('POST /api/auto');
  console.log(req.body);
  try {
    let auto = new Automobile(req.body.name, req.body.car);
    storage.createCar('auto', auto);
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(auto));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/auto', function(req,res) {
  debug('DELETE /api/auto');

  if(req.url.query.id) {
    storage.fetchDelete('auto', req.url.query.id)
    .then(() => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write('Car deleted');
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.put('/api/auto', function(req, res) {
  debug('PUT /api/auto');
  console.log(req.body);
  if(req.body.id){
    try {
      let auto = new Automobile(req.body.name, req.body.car);
      storage.fetchPut('auto',req.body.id, auto);
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(auto));
      res.end();
    } catch(e) {
      console.error(e);
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request');
      res.end();
    }
  }
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
