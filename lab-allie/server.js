'use strict';

const http = require('http');
const Note = require('./model/note.js');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const PORT = process.env.PORT || 3000;

const router = new Router();

router.get('/api/note', (req, res) => {
  if(req.url.query.id) {
    storage.fetchNote('note', req.url.query.id)
    .then(note => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad request');
      res.end();
    });
  };
});

const server = module.exports = http.createServer(router.route());

server.listen(PORT, () => console.log(`Listening on ${PORT}`));