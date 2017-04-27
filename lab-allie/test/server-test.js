'use strict';

const server = require('../server.js');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');

chai.use(http);

describe('Server module tests', function() {
  before(done => {
    server.listen(3000);
    done();
  });
  
  describe('POST method', function() {
    describe('create an item', function() {  
      it('should create the item', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          console.log('res.body', res.body);
          expect(res.body.artist).to.equal('Billy Joel');
          expect(res.body.title).to.equal('An Innocent Man');
          expect(res.body.year).to.equal('1983');
          done();
        });
      });
      
      it('should respond with 200 on a correct request', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
      
      // it.only('should contain a header', done => {
      //   chai.request(server)
      //   .post('/api/album')
      //   .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      //   .end((err, res) => {
      //     if (err) console.error(err);
      //     expect(res.body).to.have.header('Context-Type', 'application/json');
      //     done();
      //   });
      // });
      
      it('should be an object', done => {
        chai.request(server)
        .post('/api/album')
        .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
        .end((err, res) => {
          if (err) console.error(err);
          expect(res).to.be.a('object');
          done();
        });
      });
      
      // it.only('should be in JSON format', done => {
      //   chai.request(server)
      //   .post('/api/album')
      //   .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      //   .end((err, res) => {
      //     if (err) console.error(err);
      //     expect(res.body.artist).to.be.html;
      //     done();
      //   });
      // });
    });
    
    describe('undefined endpoint', function() {
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .post('/nada')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    
    
  });
  
  describe('GET method', function() {
    describe('retrieve an item', function() {
      // it('')
      
      
      
      
      
      
      
      
      // it('should respond with 200 on a correct request', done => {
      //   chai.request(server)
      //   .post('/api/album')
      //   .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      //   .then(function(res) => {
      //     
      //   })
      //   .get('/api/album')
      //   .end((err, res) => {
      //     if (err) console.error(err);
      //     expect(res.status).to.equal(200);
      //     done();
      //   });
      // });
      
      it('should respond with 404 if not found', done => {
        chai.request(server)
        .get('/')
        .end((err, res) => {
          if (err) console.error(err);
          expect(res.status).to.equal(404);
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