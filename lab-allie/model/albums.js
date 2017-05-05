'use strict';

const debug = require('debug')('http:albums');
const uuid = require('uuid/v4');

module.exports = function(artist, title, year, id) {
  if(!artist || !title || !year) throw new Error('Please enter a valid artist, title, year, and id');
  this.artist = artist,
  this.title = title,
  this.year = year,
  this.id = uuid();
};