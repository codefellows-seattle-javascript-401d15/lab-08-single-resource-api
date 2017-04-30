'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('GET method', function() {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/car')
      .send({'name': 'WRX', 'model': 'Subaru', 'horserpower': 200})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
      });
      done();
    });

    describe ('Return car by Id', function(){
      it('should return a car given id', done =>{
        chai.request(server)
        .get(`/api/car?id=${resource.id}`)
        .end((err , res) => {
          if(err) console.error(err);
          let fetchedCar = JSON.parse(res.text.toString());
          expect(resource).to.deep.equal(fetchedCar);
          done();
        });
      });
      it('should return status 200 if correct route', done =>{
        chai.request(server)
        .get(`/api/car?id=${resource.id}`)
        .end((err, res) =>{
          if(err) throw err;
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should return status 404 if bad request', done =>{
        chai.request(server)
        .get('/api/unknown')
        .end((err, res) =>{
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('POST method', function(){
    describe('add a new car', function(){
      it('should create a new car with a name, model, and horsepower', done =>{
        chai.request(server)
        .post('/api/car')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 200})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.body.name).to.equal('WRX');
          expect(res.body.model).to.equal('Subaru');
          expect(res.body.horsepower).to.equal(200);
          done();
        });
      });
      it('should return status 200 if correct route', done =>{
        chai.request(server)
        .post('/api/car')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 200})
        .end((err, res) =>{
          if(err) throw err;
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('should return status 404 if bad request', done =>{
        chai.request(server)
        .post('/api/notcars')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 200})
        .end((err, res) =>{
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

//
//   describe('PUT method', function() {
//     describe('/api/toy route', function() {
//
//     });
//   });
//
//   describe('DELETE method', function() {
//     describe('/api/toy route', function() {
//
//     });
//   });
});

describe('bad endpoint', function(){
  it('should respond with server status 404', done =>{
    chai.request(server)
    .post('/something')
    .send({})
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    });
  });
});

after(done => {
  server.close();
  done();
});
