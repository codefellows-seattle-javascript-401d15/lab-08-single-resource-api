'use strict';

const debug = require('debug')('http:kid-toy');
const uuid = require('node-uuid');

module.exports = function(name, type, hazard, id) {
  if(!name || !type) throw new Error('Invalid arguments');



  this.name = name;
  this.type = type;
  this.hazard = hazard;
  this.id = id || 1;
  // this.id = uuid();
};
