'use strict';

const http = require('http');
const Router = require('./lib/router');
const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;
const candyRouter = require('./routes/candy-routes');

const router = new Router();
candyRouter(router);

const server = module.exports = http.createServer(router.route());
debug('#server');

server.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
