'use strict';

const debug = require('debug')('http:parse-json');

module.exports = function(req) {

  return new Promise((resolve, reject) => {

    debug('#parser-json');
//body parser for POSt and PUT requests
    if(req.method === 'POST' || req.method === 'PUT') {
      let body = '';
      req.on('data', data => body += data.toString());
      req.on('end', () => {
        try {
          req.body = JSON.parse(body);
          resolve(req);
        } catch (err) {
          console.error(err); //parsing error
          reject(err);
        }
      });
      req.on('error', err => {
        console.err(err);   //error with the request
        reject(err);
      });
      return; //stop execution and return
    }
    resolve(); //don't need to pass anything back if not post or put request
  });
};
