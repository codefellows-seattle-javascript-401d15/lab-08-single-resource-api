'use strict';

const server = require('../server');
const chai = require('chai');
const expect = chai.expect;
const FoodItem = require('../model/food.js');
const http = require('chai-http');


chai.use(http);

describe('HTTP Server module', function(){
  before(function(done){
    server.listen(3000);
    done();
  });
});

describe('kid toy module', function() {
  it('should create a new toy object', done => {
    let newFood = new FoodItem('music box', 'musical', true);
    expect(newFood.name).to.equal('music box');
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

describe('testing routes for api', function() {

  let newFood = new FoodItem('music box', 'musical', true);

  describe('POST method', function(){

    describe('test 200, valid request made with an id', function() {
      it ('should respond with a 200 on proper request', function(done){
        chai.request(server)
        .post(`/food`)
        .send({name: 'banana', type: 'yellow', cost: true})
        .end((err, res) => {
          if (err) throw err;
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('GET method', function(){

    describe('test 200, responds with not found for valid request made with an id that was not found', function() {
      it ('should respond with a 200 on proper request', function(done){
        chai.request(server)
        .get(`/api/food?id=${newFood.id}`)
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
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
