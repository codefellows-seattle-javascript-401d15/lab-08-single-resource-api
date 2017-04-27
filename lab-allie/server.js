'use strict';

const http = require('http');
const Note = require('./model/note.js');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();

const server = module.exports = http.createServer(router.route());

server.listen(PORT, () => console.log(`Listening on ${PORT}`));


// add the condition to ran fetchall in the get request.
router.get('/api/note', (req, res) => {
  debug('GET /api/note');
  if(req.url.query.id) {
    storage.fetchNote('note', req.url.query.id)
    .then(note => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
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

router.post('/api/toy', function(req, res) {
  debug('POST /api/toy');
  console.log(req.body);
  try {
    let toy = new KidToy(req.body.name, req.body.type, req.body.hazard);
    storage.createItem('toy', toy);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(toy));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('Bad request');
    res.end();
  }
});