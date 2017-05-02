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
    describe('/api/consoles', function() {
      before(done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'N64',
          manufacturer: 'Nintendo',
          releaseDate: 1996,
        })
        .end((err, res) => {
          this.result = res;
          done();
        });
      });
      it('should respond with a status of 200 on proper request', done => {
        chai.request(server)
        .get('/api/consoles')
        .query({id: this.result.body.id})
        .end((err, res) => {
          expect(res).status(200);
          expect(res.body.name).to.equal('N64');
          done();
        });
      });
      it('should respond with a status of 404 for a valid request with an invalid id', done => {
        chai.request(server)
        .get('/api/consoles')
        .query({id: 7})
        .end((err, res) => {
          expect(res).status(404);
          expect(res.notFound).to.be.true;
          done();
        });
      });
    });
  });

  describe('PUT method', function() {
    describe('/api/consoles', function() {
      before(done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'Dolphin',
          manufacturer: 'Nintendo',
          releaseDate: 2001,
        })
        .end((err, res) => {
          this.result = res;
          done();
        });
      });

      it('should respond with a status of 202 on proper request', done => {
        chai.request(server)
        .put('/api/consoles')
        .send({
          name: 'GameCube',
          manufacturer: 'Nintendo',
          releaseDate: 2001,
          id: this.result.body.id,
        })
        .end((err, res) => {
          expect(res).status(202);
          expect(res.body.name).to.equal('GameCube');
          expect(res.body.id).to.equal(this.result.body.id);
          done();
        });
      });
      it('should respond with a status of 400 on a bad request', done => {
        chai.request(server)
        .put('/api/consoles')
        .send({id: this.result.body.id})
        .end((err, res) => {
          expect(res).status(400);
          expect(res.text).to.equal('bad request');
          done();
        });
      });
    });
  });

  describe('DELETE method', function() {
    describe('/api/consoles', function() {
      before(done => {
        chai.request(server)
        .post('/api/consoles')
        .send({
          name: 'VirtualBoy',
          manufacturer: 'Nintendo',
          releaseDate: 1988,
        })
        .end((err, res) => {
          this.result = res;
          done();
        });
      });

      it('should respond with a 204 on proper request', done => {
        chai.request(server)
        .delete('/api/consoles')
        .query({id: this.result.body.id})
        .end((err, res) => {
          expect(res).status(204);
          done();
        });
      });
      it('should respond with a 404 when an invalid id is used', done => {
        chai.request(server)
        .delete('/api/consoles')
        .query({id: 7})
        .end((err, res) => {
          expect(res).status(404);
          expect(res.notFound).to.be.true;
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
