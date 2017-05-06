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
        .send({name: 'punisher', type: 'shotgun'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('GET method', function () {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/weapon')
      .send({name: 'destroyer', type: 'hammer'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/weapon')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/weapon endpoint', function () {
      describe('A properly formatted request', function () {
        it('should return a resource given proper ID', done => {
          chai.request(server)
          .get(`/api/weapon?id=${resource.id}`)
          .end((err, res) => {
            let expected = JSON.parse(res.text.toString());
            expect(resource).to.deep.equal(expected);
            done();
          });
        });
        describe('An incorrectly formatted request', function () {
          it('should return an error', done => {
            chai.request(server)
          .get('/api/weapon/id')
          .end((err, res) => {
            if(err) throw err;
            expect(res).to.have(err);
          });
            done();
          });
          it('should respond with a 400 on bad request', done => {
            chai.request(server)
            .post('/wrong')
            .send({})
            .end((err, res) => {
              expect(res.status).to.equal(400);
            });
            done();
          });
        });
      });
    });
  });

  describe('DELETE method', function () {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/weapon')
      .send({name: 'destroyer', type: 'hammer'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/weapon')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
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
        .get(`/api/weapon?id=${resource.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
      });
    });
  });

  describe('UPDATE method', function () {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/weapon')
      .send({name: 'destroyer', type: 'hammer'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/weapon')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/weapon update endpoint', function () {
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
        .get(`/api/weapon?id=${resource.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
      });
    });
    // describe('PUT method should update an item', function() {
    //   it('should update an item', done => {
    //     chai.request(server)
    //     .get(`/api/weapon?id=${resource.id}`)
    //     .end(function(err, res) {
    //       let expected = JSON.parse(res.text.toString());
    //       console.log(expected.id);
    //       if(err) throw err;
    //       chai.request(server)
    //       .put(`/api/weapon?id=${expected.id}`)
    //       .send({name: 'glen', type:'shotgun'})
    //       .end(function(error, response)  {
    //         if(error) throw error;
    //         expect(response.status).to.equal(201);
    //
    //         done();
    //       });
    //     });
    //   });
    // });
  });


  after(done => {
    server.close();
    done();
  });
});
