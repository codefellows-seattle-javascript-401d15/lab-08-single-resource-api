'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = (schema, item) => {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.idea] = item;

  return Promise.resolve(item);
};

exports.fetchItem = (schema, id) => {
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

exports.fetchAll = (schema) => {
  debug('#fetchAll');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));

    let ids = Object.keys(storage[schema]);
    if(!ids) return reject(new Error('no items found'));

    resolve(ids);
  });
};

// exports.deleteItem = (schema) => {
//   debug('#deleteItem')
//
//   return new Promise((resolve, reject) => {
//     if(!schema) return reject(new Error('schema required'));
//     if(!id) return reject(new Error('id required'));
//
//
//   })
// }
