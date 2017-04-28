'use strict';

const storage = require(`${__dirname}/../lib/storage`);
const Weapon = require(`${__dirname}/../model/weapon`);
const debug = require('debug')('http:server');

module.exports = function(router) {

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

  router.delete('/api/weapon', function(req, res) {
    debug('DELETE /api/weapon');
    if(req.url.query.id) {
      storage.deleteItem('weapo', req.url.query.id)
      .then(() => {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write('weapon successfully deleted');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request haha');
    res.end();

  });


};
