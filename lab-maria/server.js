'use strict';

const http = require('http');
const DeathNote = require('./model/death-note');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const PORT = process.env.PORT || 3000;

const router = new Router();

router.get('/api/note', (req, res) => {
  if(req.url.query.id) {
    storage.fetchNote('note', req.url.query.id)
    .then(note => {
      res.writeHead(200, {'Content-type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
    return;
  }
  storage.fetchAll('note')
  .then(note => {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.write(JSON.stringify(note));
    res.end();
  })
  .catch(err => {
    console.error(err);
    res.writeHead(400, {'Content-type': 'text/plain'});
    res.write('bad request');
    res.end();
  });
});

router.post('/api/note', (req, res) => {
  try {
    let note = new DeathNote(req.body.owner, req.body.shinigami, req.body.deathCount);
    storage.createNote('note', note);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(note));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.put('/api/note', (req, res) => {
  if(req.url.query.id) {
    storage.updateNote('note', req.body.id, req.body.owner, req.body.shinigami, req.body.deathCount)
    .then(note => {
      res.writeHead(200, {'Content-type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-type': 'text/plain'});
      res.write('bad request');
      res.end();
    });
  }
});

router.delete('/api/note', (req, res) => {
  try {
    storage.deleteNote('note', req.body.id);
    res.writeHead(200, {'Content-type': 'application/json'});
    res.write('deleted');
    res.end();
  } catch(e) {
    console.error(e.message);
    res.writeHead(400, {'Content-type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

const server = module.exports = http.createServer(router.route());
server.listen(PORT, () => console.log(`listening on port:${PORT}`));
