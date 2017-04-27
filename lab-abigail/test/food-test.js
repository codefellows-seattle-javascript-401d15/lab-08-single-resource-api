'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('HTTP Server module', function(){
  before(function(done){
    server.listen(3000);
    done();
  });

  describe('GET method', function(){
    describe('/ endpoint', function() {
      it ('should respond with a 400 on bad request', function(done){
        chai.request(server)
        .get('/')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });

    describe('/cowsay endpoint', function(){
      it ('should respond with a 200 on proper request', function(done){
        chai.request(server)
        .get('/cowsay?text=work')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
      });

      it ('should respond with a 400 on bad request', function(done){
        chai.request(server)
        .get('/cowsay wrong')
        .send({})
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
      });
    });
  });

  describe('POST method', function(){
    describe('/ endpoint', function() {
      it ('should respond with a 400 on bad request', function(done){
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          expect(res).to.be.status(400);
          done();
        });
      });

      describe('/cowsay endpoint', function(){
        it ('should respond with a 200 on proper request', function(done){
          chai.request(server)
          .post('/cowsay')
          .send({text: 'work'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });

        it ('should respond with a 400 on bad request', function(done){
          chai.request(server)
          .post('/cowsay wrong')
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });
    });
  });
});
