'use strict';

const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const Car = require('../module/vehicles.js');

let exampleCar = {
  name: 'Ford',
  type: 'Truck',
};
chai.use(http);

describe('server', function() {
  let cars = [];

  before(done => {
    server.listen(8080);
    done();
  });
  after(done => {
    server.close();
    done();
  });
  describe('POST method', function() {
    it('should respond with a 200', done => {
      chai.request(server)
      .post('/api/car')
      .send(exampleCar)
      .end((err, res) => {
        let car = JSON.parse(res.text);
        cars.push(car);
        if(err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should respond with a 400 with bad request', done => {
      chai.request(server)
      .post('/api/nope')
      .send(exampleCar)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
    });
    it('should be an object', done => {
      chai.request(server)
      .post('/api/car')
      .send(exampleCar)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        done();
      });
    });
  });
  describe('GET Method', function(){
    before(done => {
      chai.request(server)
      .post('/api/car')
      .send(exampleCar)
      .end((err, res) => {
        if(err) return done(err);
        this.res = res;
      });
    });
    after(done => {
      Promise.all([
        Car.remove({})
      ])
      .then(() => done())
      .catch(() => done());
    });
    it('should get the object', done => {
      chai.request(server)
      .get(/api)
    })
  });
});
