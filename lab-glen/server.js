'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Weapon = require('./model/weapon');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/weapon', function(req, res) {
  debug('GET /api/weapon');
  if(req.url.query.id) {
    storage.fetchItem('weapon', req.url.query.id)
    .then(weapon => {
      res.writeHead(201, {'Content-Type' : 'application/json'});
      res.write(JSON.stringify(weapon));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type' : 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request haha');
  res.end();
});

router.post('/api/weapon', function(req, res) {
  debug('POST /api/weapon');

  try {
    let weaponData = new Weapon(req.body.name, req.body.type);
    storage.createItem('weapon', weaponData);
    res.writeHead(200, {'Content-Type' : 'text/plain'});
    res.write(JSON.stringify(weaponData));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type' : 'text/plain'});
    res.write('bad request yo');
    res.end();
  }
});

router.put('/api/weapon', function(req, res) {
  debug('UPDATE /api/weapon');
  if(req.url.query.id) {
    storage.updateItem('weapon', req.body.id, req.body)
    .then(weapon => {
      res.writeHead(202, {'Content-Type' : 'application/json'});
      res.write(JSON.stringify(weapon));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type' : 'text/plain'});
      res.write('not found');
      res.end();
    });
    return;
  }
});


router.delete('/api/weapon', function(req, res) {
  debug('DELETE /api/weapon');
  if(req.url.query.id) {
    storage.deleteItem('delete', req.url.query.id)
    .then(weapon => {
      res.statusCode = 204;
      res.write(weapon);
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type' : 'text/plain'});
      res.write('weapon ID not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request haha');
  res.end();

});


server.listen(PORT, () => console.log(`Listening on port : ${PORT}`));
