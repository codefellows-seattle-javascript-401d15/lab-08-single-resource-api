const http = require('chai-http');
const chai = require('chai');
const server = require('../server');
const expect = chai.expect;

chai.use(http);

describe('Server function check', function () {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method', function () {
    describe('/api/weapon endpoint', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should return a weapon', (done) => {
        chai.request(server)
        .post('/api/weapon')
        .send({
          name: 'mossberg',
          type: 'shotgun',
        })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('GET method', function () {
    describe('/api/weapon endpoint', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should respond with a 201 on proper request', done => {
        chai.request(server)
        .post('/api/weapon?id=1234')
        .send({id:1234})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
      });
    });
  });


  describe('DELETE method', function () {
    describe('/api/weapon endpoint', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should respond with a 201 on proper request', done => {
        chai.request(server)
        .post('/api/weapon')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
      });
    });
  });

  describe('UPDATE method', function () {
    describe('/api/weapon endpoint', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should respond with a 201 on proper request', done => {
        chai.request(server)
        .post('/api/weapon')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(201);
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
