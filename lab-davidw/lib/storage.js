'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem /api/lure');
  console.log('My Storage is: ', storage);

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;

  return Promise.resolve(item);
};

exports.updateItem = function(schema, id) {
  debug('#updateItem /api/lure');


  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('item required'));
    if(!storage[schema]) return reject(new Error('no item to update, create it first!'));

    let item = schema[id];

    storage[schema][item.id] = item;

    resolve(item);
  });
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem /api/lure');

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

exports.deleteItem = function(schemaName, id) {
  debug('#deleteItem /api/lure');

  return new Promise((resolve, reject) => {
    if(!schemaName) return reject(new Error('schema require'));
    if(!id) return reject(new Error('item required'));

    delete schemaName[id];
    resolve(id);
  });
};
