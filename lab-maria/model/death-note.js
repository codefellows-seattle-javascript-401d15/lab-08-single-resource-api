'use strict';

const uuid = require('uuid/v4');

module.exports = function(owner, shinigami, deathCount) {
  if(!owner || !shinigami || !deathCount) throw new Error('invalid arguments');
  this.owner = owner;
  this.shinigami = shinigami;
  this.deathCount = deathCount;
  this.id = uuid();
};
