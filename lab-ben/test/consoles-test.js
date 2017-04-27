'use strict';

const chai = require('chai');
const expect = chai.expect;
const server = require('./../server.js');
const http = require('chai-http');

chai.use(http);

describe('Server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('post method', function() {
    describe('/api/console endpoint', function() {
      it('should respond with 201 on proper request', done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'Wii',
          manufacturer: 'Nintendo',
          releaseDate: 2006,
        })
        .end((err, res) => {
          expect(res).status(201);
          done();
        });
      });
    });
  });





  after(done => {
    server.close();
    done();
  });
});
