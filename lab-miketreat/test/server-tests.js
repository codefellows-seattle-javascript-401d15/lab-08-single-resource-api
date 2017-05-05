'use strict';

const server = require('../server.js');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', function() {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method ', () =>{
    describe(' /api/toy route', ()=>{
      it('Should return status 200 on successful request', done =>{
        chai.request(server)
        .post('/api/toy')
        .send({name: 'Fire Truck', type: 'Vehicle', hazard: 'Chocking', id: 9999})
        .end((err, res) =>{
          // if(err) throw err;
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('Should return status 400 on a bad request', done =>{
        chai.request(server)
        .post('/api/toy')
        .send({})
        .end((err,res) =>{
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('GET method ', () =>{
    describe(' /api/toy route', ()=>{
      it('Should return status 200 on successful request', done =>{
        chai.request(server)
        .get('/api/toy?id=9999')
        .send('toy', 9999)
        .end((err, res) =>{
          // if(err) throw err;
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('Should return status 404 on a bad request', done =>{
        chai.request(server)
        .get('/api/toy')
        .send()
        .end((err,res) =>{
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
