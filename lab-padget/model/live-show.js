'use strict';

const debug = require('debug')('http:live-show');
console.log(debug);
const uuid = require('uuid/v4');

module.exports = function(artist, album, song) {
  if(!artist || !album) throw new Error('Invalid arguments');
  this.artist = artist;
  this.album = album;
  this.song = song;
  this.id = uuid();
};
