'use strict';

const http = require('http');
const Router = require('./lib/router');
const Note = require('./model/note');
const storage = require('./lib/storage');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/note', function(req, res) {
  debug('GET /api/note');
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
      res.write('note not found');
      res.end();
    });
    return;
  }

  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('bad request');
  res.end();
});

router.post('/api/note', function(req, res) {
  debug('POST /api/note');
  console.log(req.body, 'req.body post');
  try {
    let note = new Note(req.body.name, req.body.date);
    storage.createNote('note', note)
    .then(note => {
      res.writeHead(201, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    });
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/note', function(req, res) {
  debug('PUT /api/note');
  console.log(req.body, 'req.body put');
  try {
    let note = new Note(req.body.name, req.body.date);
    storage.updateNote('note', note);
    res.writeHead(202, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(note));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/note', function(req, res) {
  debug('DELETE /api/note');
  console.log(req.body, 'req.body delete');
  try {
    storage.deleteNote('note', req.body.id);
    res.writeHead(204, {'Content-Type': 'application/json'});
    res.write('note deleted');
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('note not found');
    res.end();
  }
});

server.listen(PORT, () => console.log(`Listening on PORT ${PORT}!`));
