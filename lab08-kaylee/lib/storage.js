'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createNote = function(schema, note) {
  debug('#createNote');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!note) return reject(new Error('note required'));
    if(!storage[schema]) storage[schema] = {};

    storage[schema][note.id] = note;
    resolve(note);
  });
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

exports.updateNote = function(schema, id, newNote) {
  debug('#updateNote');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));
    if(!newNote) return reject(new Error('new note required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let oldNote = schemaName[id];
    if(!oldNote) return reject(new Error('note not found'));

    newNote.id = id;
    storage[schema][id] = newNote;
    resolve(newNote);
  });
};

exports.deleteNote = function(schema, id) {
  debug('#deleteNote');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let note = schemaName[id];
    if(!note) return reject(new Error('note not found'));
    delete schemaName[id];
    resolve();
  });
};
