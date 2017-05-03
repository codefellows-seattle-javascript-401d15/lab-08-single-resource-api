'use strict';

const uuid = require('uuid/v4');

module.exports = function(title, genre) {
  this.title = title;
  this.genre = genre;
  this.id = uuid();
};
