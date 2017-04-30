'use strict';

const server = require('../server');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');


chai.use(http);

describe('HTTP Server module', function(){
  before(function(done){
    server.listen(3000);
    done();
  });
});

describe('ensure that api returns a status code of 404 for routes that have not been registered', function() {
  it('should respond with a 404 on an invalid route', function(done) {
    chai.request(server)
    .get('/api/drinks')
    .end((err, res) => {
      expect(res).to.have.status(404);
      done();
    });
  });
});

describe('POST method', function() {
  describe('Verify item created', function() {
    it('should create food and verify name', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
      .end((err, res) => {
        if (err) console.error(err);
        console.log('res.body', res.body);
        expect(res.body.name).to.equal('apple');
        done();
      });
    });

    it('should create food and verify type', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.body.type).to.equal('red');
        done();
      });
    });

    it('should create food and verify cost', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.body.cost).to.equal('1.5');
        done();
      });
    });
  });

  describe('Verify route status and errors', function () {

    it('should respond with 200 on proper request', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should respond with 404 if route is not found', done => {
      chai.request(server)
      .post('/')
      .send({})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });

    it('should be an object', done => {
      chai.request(server)
      .post('/api/food')
      .send({'name': 'apple', 'type': 'red', 'cost': '1.5'})
      .end((err, res) => {
        if (err) console.error(err);
        expect(res).to.be.a('object');
        done();
      });
    });
  });
});

describe('HTTP Server module', function(){
  after(function(done){
    server.end();
    done();
  });
});
