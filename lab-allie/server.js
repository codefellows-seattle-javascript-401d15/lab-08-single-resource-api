'use strict';

const http = require('http');
const Album = require('./model/albums.js');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();

const server = module.exports = http.createServer(router.route());

server.listen(PORT, () => console.log(`Listening on ${PORT}`));


// add the condition to ran fetchall in the get request.
router.get('/api/album', (req, res) => {
  debug('GET /api/album');
  if(req.url.query.id) {
    storage.fetchAlbum('album', req.url.query.id)
    .then(album => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(album));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not found');
      res.end();
    });
    return;
  }
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('Bad request');
  res.end();
});

router.post('/api/album', function(req, res) {
  debug('POST /api/album');
  console.log(req.body);
  try {
    let album = new Album(req.body.name, req.body.type, req.body.hazard);
    storage.createItem('album', album);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(album));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('Bad request');
    res.end();
  }
});