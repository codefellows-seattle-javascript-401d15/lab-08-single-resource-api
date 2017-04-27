'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
const FoodItem = require('../model/food.js');

chai.use(http);

describe('HTTP Server module', function(){
  before(function(done){
    server.listen(3000);
    done();
  });

  describe('ensure that api returns a status code of 404 for routes that have not been registered', function() {
    it('should respond with a 404 on an invalid route', function(done) {
      chai.request(server)
      .get('localhost:3000/api/drinks')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('testing routes for api', function() {

    let food = {};

    describe('POST method', function(){

      describe('test 200, valid request made with an id', function() {
        it ('should respond with a 200 on proper request', function(done){
          chai.request(server)
          .post(`/food`)
          .send({name: 'banana', type: 'yellow', cost: 1.50})
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
          .get(`/api/food?id=${food.id}`)
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
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
