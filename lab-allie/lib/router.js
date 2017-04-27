'use strict';

const debug = require('debug')('http:router');
const parseQuery = require('./parse-json.js');
const parseUrl = require('./parse-url.js');

const Router = module.exports = function() {
  debug('#router');
  
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  this.routes.POST[endpoint] = callback;
};

Router.prototype.put = function(endpoint, callback) {
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  this.routes.DELETE[endpoint] = callback;
};

Router.prototype.route = function(req, res) {
  return (req, res) => {
    Promise.all([
      parseQuery(req),
      parseUrl(req),
    ])
    .then(() => {
      if(typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      }
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('Not found');
      res.end();
    })
    .catch(err => {
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('Bad request');
      res.end();
    });
  };
};