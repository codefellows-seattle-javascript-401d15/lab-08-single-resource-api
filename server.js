const http = require('http');
const Router = require('./lib/router');
const storage = require('./lib/storage');
const Ninjas = require('./model/ninjas');
const debug = require('debug')('http:server');
const PORT = process.env.PORT ||3000;

const router = new Router();
const server = module.exports = http.createServer(router.route());

router.get('/api/ninja', function(req, res) {
debug('GET /api/ninja');
if(req.url.query.id) {
  storage.fetchItem('ninja', req.url.query.id)
  .then(ninja => {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(ninja));
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

router.post('/api/ninja', function(req, res) {
  debug('POST /api/ninja');
  console.log(req.body);
  try {
    let ninja = new Ninjas(req.body.name, req.body.clan, req.body.weapons);
    storage.createItem('ninja', ninja);
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(ninja));
    res.end();
  } catch(e) {
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('bad request');
    res.end();
  }
});

router.delete('/api/ninja', function(req, res) {
  debug('DELETE /api/ninja');
  console.log(req.body);
  try {
    storage.removeItem(Ninjas);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('Ninja killed.');
    res.end();
  } catch (e){
    console.error(e);
    res.writeHead(400, {'Content-Type': 'text/plain'});
    res.write('could not delete your stupid fucking ninja');
    res.end();
  }
});

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
