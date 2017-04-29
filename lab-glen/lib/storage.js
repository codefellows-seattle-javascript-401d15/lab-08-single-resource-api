'use strict';

const debug = require('debug')('http:storage');
const storage = module.exports = {};
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Async'});
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

storage.updateItem = function(blueprint, id) {
  debug('#updateItem');
  let pathUrlId = `${pathUrl}/${blueprint}${id}.json`;

  return fs.readFileAsync(`${pathUrlId}`)
  .then( (item) => {
    fs.writeFileAsync(`${pathUrlId}`, JSON.stringify(item))
    .then((item) => {
      console.log(item);
    })
    .catch(console.error);
  })
  .catch(console.error);

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




// return fs.statProm(`${pathUrl}`)
// .catch(err => {
//   err.status = 400;
//   return Promise.reject(err);
// }).then(() => {
//   return fs.readFileProm(pathUrlId)
// })
//   .then( () => {
//     fs.writeFileProm(`${pathUrlId}`, JSON.stringify(item))
//     .then((item) => {
//       console.log(item);
//     })
//     .catch(console.error)
//   })
//   .catch(console.error)
