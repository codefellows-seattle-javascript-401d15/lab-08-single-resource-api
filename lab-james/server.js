'use strict';

const http = require('http');
const Game = require('./model/game.js');
const Router = require('./lib/router.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;

const router = new Router();

const server = module.exports = http.createServer(router.route());
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

router.get('/api/game', (req, res) => {
  if(req.url.query.id) {
    storage.fetchGame('game', req.url.query.id)
    .then(note => {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(note));
      res.end();
    })
    .catch(err => {
      res.writeHead(400, {'Content-Type': 'application/json'});
      res.write('Bad request.');
      res.end();
    });
  }
});
