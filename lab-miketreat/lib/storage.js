'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = (schema, item) => {
  debug('#createItem');

  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][item.id] = item;
};

exports.fetchItem = (schema, id) => {
  debug('#fetchItem');

  return new Promise((resolve, reject) =>{
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    console.log(storage[schema][id]);
    resolve(item);
  });
};
exports.deleteItem = (schema, id) => {
  debug('#deleteItem');

  return new Promise((resolve, reject) =>{
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    delete storage[schema][item.id];
    resolve(item);
  });
};
exports.updateItem = (schema, id, req) => {
  debug('#updateItem');

  return new Promise((resolve, reject) =>{
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));
    if(!req) return reject(new Error('req.body is required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    if(req.body.name) {
      console.log(`inside storage req.name is: ${req.body.name}`);
      item.name = req.body.name;
    }
    if(req.body.type) item.type = req.body.type;
    if(req.body.hazard) item.hazard = req.body.hazard;

    storage[schema][item.id] = item;

    resolve(item);
  });
};
