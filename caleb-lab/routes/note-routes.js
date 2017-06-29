'use strict';

const debug = require('debug')('http:note-routes');
const Note = require('../model/note.js');
const storage = require('../lib/storage.js');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});


module.exports = function(router){

  router.get('/api/note', (req, res) => {
    debug('GET /api/note');
    if(req.url.query.id){
      storage.fetchNote('note', req.url.query.id)
        .then(note => {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.write(JSON.stringify(note));
          res.end();
        })
        .catch(err => {
          if(err) console.error(err);
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
    storage.deleteNote('note', req.url.query.id)
    .then(() => {
      res.writeHead(204, {'Content-Type': 'application/json'});
      res.end();
    }).catch(err =>{
      console.error(err);
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('not found');
      res.end();
    });
  });
};
