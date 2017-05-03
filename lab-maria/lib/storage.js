'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createNote = function(schemaName, note) {
  debug('#create note');
  if(!schemaName) return Promise.reject(new Error('mising schema'));
  if(!note) return Promise.reject(new Error('missing note'));

  if(!storage[schemaName]) storage[schemaName] = {};

  storage[schemaName][note.id] = note;

  return Promise.resolve(note);
};

exports.fetchNote = function(schemaName, id) {
  debug('#fetch note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('missing note-id'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('note does not exist'));

    resolve(note);
  });
};

exports.fetchAll = function(schemaName) {
  debug('#fetch all');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let notes = [];

    function objectLength(object) {
      var length = 0;
      for( var key in object ) {
        if( object.hasOwnProperty(key) ) {
          notes.push(object);
        }
      }
      return length;
    }

    objectLength(schema);
    resolve(notes);
  });
};

exports.updateNote = function(schemaName, id, owner, shinigami, deathCount) {
  debug('#update note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('missing note-id'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('schema does not exist'));

    let note = schema[id];
    if(!note) return reject(new Error('note does not exist'));

    note.owner = owner;
    note.shinigami = shinigami;
    note.deathCount = deathCount;

    return resolve(note);
  });
};

exports.deleteNote = function(schemaName, id) {
  debug('#delete note');
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('mising schema'));
    if(!id) return reject(new Error('missing note-id'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('WTFSA'));

    let note = schema[id];
    if(!note) return reject(new Error('sdjfksafkdsahfkj'));
    delete storage[schema][id];

    resolve();
  });
};
