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
    });
  });
  
  describe('GET method', function() {
    let testGet;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        testGet = JSON.parse(res.text.toString());
      });
      done();
    });
    
    describe('A request should return an item', function() {
      it('should return the correct response if the id is passed in', done => {
        chai.request(server)
        .get(`/api/album?id=${testGet.id}`)
        .end((err, res) => {
          let expectedResult = JSON.parse(res.text.toString());
          expect(testGet).to.deep.equal(expectedResult);
          done();
        });
      });
      
      it('should return a status of 200 on proper request', done => {
        chai.request(server)
        .get(`/api/album?id=${testGet.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
      
      it('should return an error on a bad request', done => {
        chai.request(server)
        .get('/api/blah')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
        
    describe('Error if not found', function() {
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
    
    after(done => {
      chai.request(server)
      .delete('/api/album')
      .query({id: testGet.id})
      .end((err, res) => {
        done();
      });
    });
  });
  
  describe('PUT method', function(){
    let testPut;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        testPut = JSON.parse(res.text.toString());
      });
      done();
    });
    
    
    after(done => {
      chai.request(server)
      .delete('api/album')
      .query({id: testPut.id})
      .end((err, res) => {
        done();
      });
    });
  });
  
  describe('DELETE method', function() {
    let testDelete;
    before(done => {
      chai.request(server)
      .post('/api/album')
      .send({'artist': 'Billy Joel', 'title': 'An Innocent Man', 'year': '1983'})
      .end((err, res) => {
        testDelete = JSON.parse(res.text.toString());
      });
      done();
    });
    
    after(done => {
      chai.request(server)
      .delete('api/album')
      .query({id: testDelete.id})
      .end((err, res) => {
        done();
      });
    });
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
  
  after(done => {
    server.close();
    done();
  });
});