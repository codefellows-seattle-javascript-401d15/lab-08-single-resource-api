'use strict';

const http = require('http');
const Router = require('./lib/router.js');
const storage = require('./lib/storage');
const KidToy = require('./model/kid-toy');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;

const router = new Router();
console.log(router);
const server = module.exports = http.createServer(router.route());

router.get('/api/toy', (req, res) => {
  debug('GET /api/toy');
  if(req.url.query.id){
    storage.fetchItem('toy', req.url.query.id)
    .then(toy => {
      res.writeHead(200, {'Content-type': 'application/json'});
      res.write(JSON.stringify(toy));
      res.end();
    })
    .catch(err =>{
      console.error(err);
      res.writeHead(404, {'Content-type': 'text/plain'});
      res.write(' Item not found');
      res.end();
    });
    return;
  }

  res.writeHead(404, {'Content-type': 'text/plain'});
  res.write('Can Not Fetch- bad request');
  res.end();
  // end of router.get()
});

router.post('/api/toy', (req, res) => {
  debug('POST /api/toy');
  try{
    let toy = new KidToy(req.body.name, req.body.type, req.body.hazard);
    storage.createItem('toy', toy);

    res.writeHead(200, {'Content-type': 'application/json'});
    res.write(JSON.stringify(toy));
    res.end();
  }
  catch(e){
    console.error(e);
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('Can not post, bad request');
    res.end();

  }
});
router.delete('/api/toy', (req, res) => {
  debug('POST /api/toy');
  if(req.url.query.id){
    storage.deleteItem('toy', req.url.query.id)
    .then(()=> {
      res.writeHead(200, {'Content-type': 'application/json'});
      res.write('Item Deleted');
      res.end();
    })
  .catch(err =>{
    console.error(err);
    res.writeHead(404, {'Content-type': 'text/plain'});
    res.write('Not deleted - bad request');
    res.end();
  });
    return;
  }
});

router.put('/api/toy', (req, res) => {
  debug('POST /api/toy');
  if(req.url.query.id && req.body){
    storage.updateItem('toy', req.url.query.id, req)
    .then(toy =>{
      res.writeHead(200, {'Content-type': 'application/json'});
      res.write(JSON.stringify(toy));
      res.end();
    })
    .catch(err =>{

      console.error(err);
      res.writeHead(404, {'Content-type': 'text/plain'});
      res.write('not updated - bad request');
      res.end();

    });
    return;
  }
});


server.listen(PORT, ()=> console.log(`Listening on PORT: ${PORT}`));































  // log
