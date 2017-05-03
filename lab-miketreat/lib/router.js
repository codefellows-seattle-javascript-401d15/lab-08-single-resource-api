'use strict';

const parseJson = require('./parse-json');
const parseUrl = require('./parse-url');
const debug = require('debug')('http:router');

const Router = module.exports = () => {
  debug('#Router');

  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = (endpoint, callback) => {
  debug('#GET');

  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = (endpoint, callback) => {
  debug('#POST');

  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = (endpoint, callback) => {
  debug('#PUT');

  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = (endpoint, callback) => {
  debug('#DELETE');

  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = () => {
  debug('#routes');

  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function'){
        this.routes[req.method][req.url.pathname](req,res);
        return;
      }
      res.writeHead(400, {'Content-type': 'text/plain'});
      res.write('route not found');
      res.end();
    })
    .catch(() => {
      res.writeHead(400, {'Content-type': 'text/plain'});
      res.write('route not found');
      res.end();
    });
  };
};




















//
