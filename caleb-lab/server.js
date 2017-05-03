'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const Note = require('./model/note.js');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/note', (req, res) => {
  debug('GET /api/note');
  console.log(req.body);
  if(req.url.query.id){
    storage.fetchNote('note', req.url.query.id)
      .then(note => {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(note));
        res.end();
      }).catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.write('not found');
        res.end();
      });
    return;
  }

  //if condition was false, do this
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.write('fo-hunnit bad request');
  res.end();
});

router.post('/api/note', (req, res) => {
  debug('POST api/note');
  console.log(req.body);
  try{
    let newNote = new Note(req.body.name, req.body.date);
    storage.createNote('note', newNote);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(newNote));
    res.end();
  }catch(e){
    console.error(e, 'this is visible');
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('fo-hunnit bad request');
    res.end();
  }
});

router.put('/api/note', (req, res) => {
  debug('PUT /api/note');
  storage.updateNote('note', req.body)
    .then(note => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    }).catch(err => {
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
});

router.delete('/api/note', (req, res) =>{
  debug('DELETE /api/note');
  console.log('deleting');
  storage.deleteNote('note', req.url.query.id)
  .then(() => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end();
  }).catch(err =>{
    console.error(err);
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write('not found');
    res.end();
  });
});




server.listen(PORT, () => console.log(`Listening on ${PORT}`));
