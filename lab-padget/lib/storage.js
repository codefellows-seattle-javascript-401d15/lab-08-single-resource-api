'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};
  storage[schema][item.id] = item;
  return Promise.resolve(item);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));
    resolve(item);
  });
};

exports.putItem = function(schema, id, liveShow) {
  debug('#putItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('item required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));
    console.log(storage[schema]);
    // if(!item) return reject(new Error('item not found'));
    if(liveShow.artist) item.artist = liveShow.artist;
    if(liveShow.album) item.album = liveShow.album;
    if(liveShow.song) item.song = liveShow.song;
    resolve(item);
  });
};

  // WORKS! but overwrites the object. not what we want.
  // if(!storage[schema]) storage[schema] = {};

  // WORKS!
  // storage[schema][item.id] = item;
  // if(artist) item.artist = artist;
  // if(album) item.album = album;
  // if(song) item.song = song;
  // return(item);

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    delete(schemaName[id]); // delete object
    resolve(item); // or nothing
  });
};
