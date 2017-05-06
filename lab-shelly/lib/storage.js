'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(schema, item) {
  debug('#createItem');
    //schema is the data model (cat). item is new cat object which has id, name, and mood.
  if(!schema) return Promise.reject(new Error('schema required'));
  if(!item) return Promise.reject(new Error('item required'));
  if(!storage[schema]) storage[schema] = {};
//if not set to storage yet, then set a property on the storage object, defined as the schema
  storage[schema][item.id] = item;
//storage.cat.id = item we passed in
  return Promise.resolve(item);
};

exports.fetchItem = function(schema, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));
//go look for storage.cat
    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));
//look for cat data object with matching id and if found, set it to item
    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.deleteItem = function(schema, id) {
  debug('#deleteItem');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));

    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));
//storage.cat.uuid(whatever is generated) gets deleted
    delete storage[schema][id];
    resolve(item);
  });
};

exports.updateItem = function(schema, id, name, mood) {
  debug('#putItem');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('schema required'));
    if(!id) return reject(new Error('id required'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('schema not found'));
  //go look at storage object, find the cat property (schemaName), find the id of the cat i'm looking for, and give me all the stuff about that cat.
    let item = schemaName[id];
    if(!item) return reject(new Error('item not found'));
//update name and mood
    item.name = name;
    item.mood = mood;
    return resolve(item);
  });
};
