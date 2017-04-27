'use strict';

const debug = require('debug')('http:parse-json');

module.exports = function(req){
  debug('#parse-json');
  return new Promise((resolve, reject) => {
    if(req.method === 'POST' || req.method === 'PUT'){
      debug('#POST || PUT');
      let body = '';

      req.on('data', data => {
        body += data.toString();
      });
      req.on('end', () => {
        try{
          req.body = JSON.parse(body);
          resolve(req);
        }catch(e){
          console.error(e);
          reject(e); //like returning the error, runs if data has been received and it's ready for next steps
        }
      });
      //if there's an issue with the request itself
      req.on('error', err => {
        console.error(err);
        reject(err);
      });
      return;
    }
    resolve();
  });
};
