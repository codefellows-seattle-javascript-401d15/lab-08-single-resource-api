'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const FoodItem = require('./model/food.js');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/food', function(req, res) {
  debug('GET /api/food');
  if(req.url.query.id) {
    storage.fetchItem('food', req.url.query.id)
    .then(food => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(food));
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

router.post('/api/food', function(req, res) {
  debug('POST /api/food');
  try {
    let food = new FoodItem(req.body.name, req.body.type, req.body.cost);
    storage.createItem('food', food);
    res.writeHead(201, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(food));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/food', function(req, res) {
  debug('DELETE /api/food');

  if(req.url.query.id) {
    storage.deleteItem('food', req.url.query.id)
    .then(id => {
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


router.put('/api/food', function(req, res) {
  debug('PUT /api/food');

  if(req.url.query.id) {
    storage.fetchItem('food', req.url.query.id)
    .then(food => {
      if (req.body.name) food.name = req.body.name;
      if (req.body.type) food.type = req.body.type;
      if (req.body.cost) food.cost = req.body.cost;

      res.writeHead(202, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(food));
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
