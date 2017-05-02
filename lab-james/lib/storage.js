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
  debug('#fetchGame');
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

exports.updateGame = function(schema, id, gameData) {
  debug('#updateGame');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Schema needed.'));
    if(!id) return reject(new Error('Id needed.'));
    if(!gameData) return reject(new Error('Game data needed.'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('Schema not found.'));
    let game = schemaName[id];
    if(!game) return reject(new Error('Game not found.'));

    if(gameData.title) game.title = gameData.title;
    if(gameData.genre) game.genre = gameData.genre;

    resolve(game);
  });
};

exports.deleteGame = function(schema, id) {
  debug('#deleteGame');
  return new Promise((resolve, reject) => {
    if(!schema) return reject(new Error('Schema needed.'));
    if(!id) return reject(new Error('Id needed.'));

    let schemaName = storage[schema];
    if(!schemaName) return reject(new Error('Schema not found.'));
    let game = schemaName[id];
    if(!game) return reject(new Error('Game not found.'));
    
    delete(schemaName[id]);

    resolve(game);
  });
};
