'use strict';

const debug = require('debug')('http:storage');
const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const pathUrl = `${__dirname}/../data`;

storage.createItem = function(blueprint, item) {
  debug('#createItem');

  return fs.statAsync(`${pathUrl}`)
  .catch(err => {
    err.status = 400;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.writeFileAsync(`${pathUrl}/${blueprint}${item.id}.json`,
    JSON.stringify(item));
  })
  .then (() => {
    return Promise.resolve(item);
  });
};

storage.fetchItem = function(blueprint, id) {
  debug('#fetchItem');

  let pathUrlId = `${pathUrl}/${blueprint}${id}.json`;
  return fs.statAsync(pathUrlId)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.readFileAsync(pathUrlId);
  })
  .then((data) => {
    return Promise.resolve(JSON.parse(data.toString()));
  });
};

storage.deleteItem = function(blueprint, id) {
  debug('#deleteItem');

  let pathUrlId = `${pathUrl}/${blueprint}${id}.json`;
  return fs.statAsync(pathUrlId)
  .catch(err => {
    err.status = 404;
    return Promise.reject(err);
  })
  .then(() => {
    return fs.unlinkAsync(pathUrlId);
  })
  .then(() => {
    return Promise.resolve();
  });
};
