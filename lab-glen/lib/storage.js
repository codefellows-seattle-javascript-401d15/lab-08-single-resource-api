'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createItem = function(blueprint, item) {
  debug('#createItem');

  if(!blueprint) return Promise.reject(new Error('blueprint required'));
  if(!item) return Promise.reject(new Error('Item required'));
  if(!storage[blueprint])
    storage[blueprint] = {};

  storage[blueprint][item.id] = item;

  return Promise.resolve(item);
};

exports.fetchItem = function(blueprint, id) {
  debug('#fetchItem');

  return new Promise((resolve, reject) => {
    if(!blueprint) return reject(new Error('blueprint required'));
    if(!id) return reject(new Error('id required'));

    let blueprintName = storage[blueprint];
    if(!blueprintName) return reject(new Error('blueprint not found'));

    let item = blueprintName[id];
    if(!item) return reject(new Error('item not found'));

    resolve(item);
  });
};

exports.updateItem = function(blueprint, id, newWeapon) {
  debug('#updateItem');

  return new Promise((resolve, reject) => {
    if(!blueprint) return reject(new Error('blueprint required'));
    if(!id) return reject(new Error('id required'));

    let blueprintName = storage[blueprint];
    if(!blueprintName) return reject(new Error('blueprint not found'));

    let item = blueprintName[id];
    if(!item) return reject(new Error('item not found'));

    if(newWeapon.name)



    resolve(item);
  });
};

exports.deleteItem = function(blueprint, id) {
  debug('#deleteItem');

  return new Promise((resolve, reject) => {
    if(!blueprint) return reject(new(Error('blueprint required')));
    if(!id) return reject(new Error('id required'));

    // let blueprintName = storage[blueprint];
    // if(!blueprintName) return reject(new Error('blueprint delte not found'));
    //
    // let item = blueprintName[id];
    // if(!item) return reject(new Error('id not found'));

    delete storage[blueprint][id];

    resolve();
  });
};
