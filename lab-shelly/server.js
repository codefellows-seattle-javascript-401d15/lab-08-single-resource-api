'use strict';

const http = require('http');
const Router = require('./lib/router'); //instantiate & console log to see what it is
const storage = require('./lib/storage');
const Cat = require('./model/cat');
const debug = require('debug')('http:server');
// const chai = require('chai').expect(); // eslint-line-disable

const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/cat', function(req, res) {
  debug('GET /api/cat');
  if(req.url.query.id) {
    // console.log(req.url.query.id);
    storage.fetchItem('cat', req.url.query.id)
    .then(cat => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(cat));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      //cat id not found
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request'); //no id property
  res.end();
});

router.post('/api/cat', function(req, res) {
  debug('POST /api/cat');
  // console.log(req.body);
  try {
  //create new cat obj with parsed req info and pass into createItem method
    let cat = new Cat(req.body.name, req.body.mood);
    storage.createItem('cat', cat)
    .then(newCat => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(newCat));
      res.end();
    });
  } catch(err) {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/cat', function(req, res) {
  debug('DELETE /api/cat');
  if(req.url.query.id) {
    // console.log(req.url.query.id);
    storage.deleteItem('cat', req.url.query.id)
    .then(cat => {
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(cat)); //should we include has been deleted?
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      //id not found for valid request
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.put('/api/cat', function(req, res) {
  debug('PUT /api/cat');
  // console.log('query string: ', req.url.query.id);
  if(req.url.query.id) {
    //pass in the cat id and body information to be updated
    storage.updateItem('cat', req.url.query.id, req.body.name, req.body.mood)
    .then(updatedCat => {
      res.writeHead(202, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(updatedCat));
      res.end();
    })
    .catch(err => {
      console.error(err); //id doesn't match or something else
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
