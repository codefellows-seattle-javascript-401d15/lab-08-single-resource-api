'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createNote = function(schema, note) {
  debug('#createNote');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!note) return Promise.reject(new Error('note required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][note.id] = note;

  return Promise.resolve(note);
};

exports.fetchNote = function(schema, id) {
  debug('#fetchNote');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let note = schemaName[id];
    if(!note) return reject(new Error('note not found'));

    resolve(note);
  });
};
