'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createAlbum = function(schemaName, album) {
  debug('#storage createAlbum');
  if(!schemaName) return Promise.reject(new Error('Schema required'));
  if(!album) return Promise.reject(new Error('Album required'));
  
  if(!storage[schemaName]) storage[schemaName] = {};
  
  storage[schemaName][album.id] = album;
  
  return Promise.resolve(album);
};

exports.fetchAlbum = function(schemaName, id) {
  debug('#storage fetchAlbum');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema name required'));
    if(!id) return reject(new Error('Album id required'));
    
    let schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema does not exist'));
    
    let album = schema[id];
    if (!album) return reject(new Error('Album does not exist'));
    
    resolve(album);
  });
};

exports.fetchAll = function(schemaName) {
  debug('#storage fetchAll');
  
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema required'));
    
    let ids = Object.keys(storage[schemaName]);
    if(!ids) return reject(new Error('No items found'));
    
    resolve(ids);
  });
};