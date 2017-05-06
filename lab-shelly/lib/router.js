'use strict';

const parseJson = require('./parse-json');
const parseUrl = require('./parse-url');
const debug = require('debug')('http:router');

const Router = module.exports = function() {
  debug('#Router');
  //these are defined in our server.js file
  this.routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
  };
};

Router.prototype.get = function(endpoint, callback) {
  debug('#GET');
  //the bracket notation sets the endpoint property on that method
  this.routes.GET[endpoint] = callback;
};

Router.prototype.post = function(endpoint, callback) {
  debug('#POST');
  this.routes.POST[endpoint] = callback;

};

Router.prototype.put = function(endpoint, callback) {
  debug('#PUT');
  this.routes.PUT[endpoint] = callback;
};

Router.prototype.delete = function(endpoint, callback) {
  debug('#DELETE');
  this.routes.DELETE[endpoint] = callback;
};
//when server is on, executes the route handler
Router.prototype.route = function() {
  debug('#routes');
  return (req, res) => {
    Promise.all([
      parseUrl(req),
      parseJson(req),
    ])
    .then(() => { //checks pathname and invokes req method if it is a function
      if(typeof this.routes[req.method][req.url.pathname] === 'function') {
        this.routes[req.method][req.url.pathname](req, res);
        return;
      } //otherwise, return a 404 error
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.write('route not found'); //proper pathway but id not found
      res.end();
    })
    .catch(err => {
      console.error(err); //issue with parsing data
      res.writeHead(400, {'Content-Type': 'text/plain'});
      res.write('bad request'); //url sent is incorrect, bad query string format
      res.end();
    });
  };
};
