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

  describe('POST method', function() {
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
          if(err) console.error(err);
          expect(res).status(201);
          expect(res.body.name).to.equal('Wii');
          done();
        });
      });
      it('should respond with a 400 on bad request', () => {
        chai.request(server)
        .post('/api/consoles')
        .send({})
        .end((err, res) => {
          expect(res).status(400);
          expect(res.body).to.include('bad request');
        });
      });
    });
  });

  describe('GET method', function() {

  })

  after(done => {
    server.close();
    done();
  });
});
