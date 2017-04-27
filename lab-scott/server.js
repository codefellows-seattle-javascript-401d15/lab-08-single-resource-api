'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Planet = require('./model/planet');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/planet', function(req,res){
  debug('GET /api/planet');
  console.log(req.url.query.id);
  if(req.url.query.id){
    storage.fetchItem('planet', req.url.query.id)
    // console.log(req.url.query.id)
      .then(planet => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(planet));
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

router.post('/api/planet', function(req, res) {
  debug('POST /api/planet');
  console.log(req.body);
  try {
    let planet = new Planet(req.body.name, req.body.universe);
    storage.createItem('planet', planet);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(planet));
    console.log(JSON.stringify(planet));
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/planet', function(req,res){
  debug('PUT /api/planet');
  console.log(req.body);
  if(req.url.query.id){
    storage.fetchItem('planet', req.url.query.id)
      .then(planet => {
        if(req.body.name) planet.name = req.body.name;
        if(req.body.universe) planet.universe = req.universe.name;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(planet));
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

router.delete('/api/planet', function(req,res){
  debug('DELETE /api/planet');
  try{
    storage.deleteItem('planet', req.url.query.id);
    res.writeHead(204);
    res.write('deleted');
    res.end();
  } catch(err) {
    console.error(err);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }

});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
