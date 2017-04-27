'use strict';

const http = require('http');
const Note = require('./model/note.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/note', (req, res) => {
  debug('GET /api/note');
  if(req.url.query.id){
    storage.fetchNote('note', req.url.query.id)
      .then(note => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      }).catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.writeHead('not found');
        res.end();
      });
    return;
  }
  res.writeHead(400, ({'Content-Type': 'text/plain'}));
  res.write('fo-hunnit bad request');
  res.end();
});

router.post('/api/note', (req, res) => {
  debug('POST api/note');
  console.log(req.body);
  try{
    let homeWork = new Note(req.body.name, req.body.date);
    storage.createNote('note', homeWork);
    res.writeHead(200, ({'Content-Type': 'application/json'}));
    res.write(JSON.stringify(homeWork));
    res.end();
  }catch(e){
    console.error(e);
    res.writeHead(400, ({'Content-Type': 'text/plain'}));
    res.write('fo-hunnit bad request');
    res.end();
  }
});

router.put('api/note', (req, res) => {
  debug('PUT api/note');
  try{
    storage.fetchNote('note')
    .then((note) => {
      storage.updateNote(homeWork.id, req.body.name, req.body.res);
      res.writeHead(200, ({'Content-Type': 'application/json'}));
      res.write(JSON.stringify(note));
      res.end();
    });
  }catch(e){
    console.error(e);
    res.writeHead(400, ({'Content-Type': 'text/plain'}));
    res.write('fo-hunnit bad request');
    res.end();
  }
});

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
