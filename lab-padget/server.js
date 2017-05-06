'use strict';

const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const LiveShow = require('./model/live-show');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();

const server = module.exports = http.createServer(router.route());

router.get('/api/music', function(req, res) {
  debug('GET /api/music');
  if(req.url.query.id) {
    storage.fetchItem('music', req.url.query.id)
    .then(music => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(music));
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

router.post('/api/music', function(req, res) {
  debug('POST /api/music');
  console.log(req.body);
  try {
    let music = new LiveShow(req.body.artist, req.body.album, req.body.song);
    storage.createItem('music', music);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(music));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/music', function(req, res) {
  debug('PUT /api/music');
  // console.log(req.body);
  storage.putItem('music', req.body.id, req.body)
  .then(music => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(music));
    res.end();
  })
  .catch(err => {
    console.error(err);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('not found');
    res.end();
  });
  return;
});

router.delete('/api/music', function(req, res) {
  debug('DELETE /api/music');
  if(req.url.query.id) {
    storage.deleteItem('music', req.url.query.id)
    .then(() => {
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.write('delete successful');
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
