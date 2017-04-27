'use strict';

const storage = require('../lib/storage');
const Note = require('../model/note');
const debug = require('debug')('http:router');

//CREATE READ DELETE
module.exports = function(router) {
  router.get('/api/note', function(req, res) {
    debug('#GET /api/note');
    if(req.url.query.id) {
      storage.fetchItem('note', req.url.query.id)
      .then(note => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
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
};
