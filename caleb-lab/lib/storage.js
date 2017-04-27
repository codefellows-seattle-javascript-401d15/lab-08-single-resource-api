'use strict';

//this is the in-memory mgmt for a model
const debug = require('debug')('http:storage');
const storage = {};
// const storage = {
//   schemaOne: {
//     idOne: {},
//     idTwo: {},
//   },
//   schemaTwo: {},
// };

module.exports = exports = {};

//this is going to be a route in the server for posting a new note
exports.createNote = function(schemaName, note){
  if(!schemaName) return Promise.reject(new Error('Schema required'));
  if(!note) return Promise.reject(new Error('Note required'));

  if(!storage[schemaName]) storage[schemaName] = {};
  storage[schemaName][note.id] = note;

  return Promise.resolve(note);
};

exports.updateNote = function(id, note, nameUpdate, dateUpdate){
  if(!id) return Promise.reject(new Error('Schema required'));
  if(!nameUpdate) return Promise.reject(new Error('Schema required'));
  if(!dateUpdate) return Promise.reject(new Error('Schema required'));

  storage[id][note.id] = note;

  note.name = nameUpdate;
  note.date = dateUpdate;

  return Promise.resolve(note);
};

exports.fetchNote = function(schemaName, noteId){
  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('schemaName required'));
    if(!noteId) return reject(new Error('Note id require'));

    let schema = storage[schemaName];
    if(!schema) return reject(new Error('Schema does not exist'));

    let note = schema[noteId];
    if(!note) return reject(new Error('Note doesnt exist'));

    resolve(note);
  });
};

exports.deleteNote = function(schema, id){
  return new Promise((resolve, reject) => {
    debug('#deleteNote');
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('Note id require'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schemaName required'));
  });
};
