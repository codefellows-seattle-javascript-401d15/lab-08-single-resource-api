'use strict';

const debug = require('debug')('http:storage');
const storage = {};

module.exports = exports = {};

exports.createGame = function(schema, game) {
  debug('#createGame');
  if(!schema) return Promise.reject(new Error('Schema needed.'));
  if(!game) return Promise.reject(new Error('Game needed.'));
  if(!storage[schema]) storage[schema] = {};

  storage[schema][game.id] = game;

  return Promise.resolve(game);
};

exports.fetchGame = function(schema, id) {
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Schema needed.'));
    if(!id) return reject(new Error('ID needed.'));

    let schema = storage[schema];
    if(!schema) return reject(new Error('Schema does not exist.'));

    let game = schema[id];
    if(!game) return reject(new Error('Game does not exist.'));

    resolve(game);
  });
};
