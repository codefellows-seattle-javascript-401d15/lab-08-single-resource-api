'use strict';

const debug = require('debug')('http:weapon');
const uuid = require('uuid-v4');

module.exports = function(name, type) {
  debug('weapon');
  if(!name || !type) throw new Error('Invalid Arguments!');
  this.name = name;
  this.type = type;
  this.id = uuid();
};
