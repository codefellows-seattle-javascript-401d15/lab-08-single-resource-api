'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createNote = function(schemaName, note) {
  debug('#storage createNote');
  if(!schemaName) return Promise.reject(new Error('Schema required'));
  if(!note) return Promise.reject(new Error('Note required'));
  
  if(!storage[schemaName]) storage[schemaName] = {};
  
  storage[schemaName][note.id] = note;
  
  return Promise.resolve(note);
};

exports.fetchNote = function(schemaName, id) {
  debug('#storage fetchNote');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('Schema name required'));
    if(!id) return reject(new Error('Note id required'));
    
    let schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema does not exist'));
    
    let note = schema[id];
    if (!note) return reject(new Error('Note does not exist'));
    
    resolve(note);
  });
};