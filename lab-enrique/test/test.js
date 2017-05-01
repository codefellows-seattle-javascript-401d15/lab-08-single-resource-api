const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function(){
  before(done=> {
    server.listen(3000);
    done();
  });
  after(done =>{
    server.close();
    done();
  });

  describe('POST method', function () {
    describe('/api/doge route', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/badinfo')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should return a doge', (done) => {
        chai.request(server)
        .post('/api/doge')
        .send({name: 'Milo', type: 'Lab', color: 'Black'})
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
      .post('/api/doge')
      .send({name: 'Milo', type: 'Black'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/doge')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/doge route', function () {
      describe('A properly formatted request', function () {
        it('should return a resource given proper ID', done => {
          chai.request(server)
          .get(`/api/doge?id=${resource.id}`)
          .end((err, res) => {
            let expected = JSON.parse(res.text.toString());
            expect(resource).to.deep.equal(expected);
            done();
          });
        });
        describe('An incorrectly formatted request', function () {
          it('should return an error', done => {
            chai.request(server)
          .get('/api/doge/id')
          .end((err, res) => {
            if(err) throw err;
            expect(res).to.have(err);
          });
            done();
          });
          it('should respond with a 404 on bad request', done => {
            chai.request(server)
            .post('/wrong')
            .send({})
            .end((err, res) => {
              expect(res.status).to.equal(404);
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
      .post('/api/doge')
      .send({name: 'Milo', type: 'Lab'})
      .end((err, res) => {
        resource = JSON.parse(res.text.toString());
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/doge')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/doge route', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
        .post('/badinfo')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
      });
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .get(`/api/doge?id=${resource.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('UPDATE method', function () {
    let resource;
    before(done => {
      chai.request(server)
        .post('/api/doge')
        .send({name: 'Milo', type: 'Lab'})
        .end((err, res) => {
          resource = JSON.parse(res.text.toString());
          done();
        });
    });
    after(done => {
      chai.request(server)
        .delete('/api/doge')
        .query({id: resource.id})
        .end(() => {
          console.error();
          done();
        });
    });
    describe('/api/doge route', function () {
      it('should respond with a 400 on bad request', done => {
        chai.request(server)
          .post('/badinfo')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(400);
            done();
          });
      });
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
          .get(`/api/doge?id=${resource.id}`)
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
      });
    });
  });

});
// describe('Doge dog module', function(){
//   describe('when creating a new Doge object', function(){
//     it('should have a name of "Milo"',done =>{
//       this.newDoge = new Doge('Milo','Lab','Black');
//       expect(this.newDoge.name).to.equal('Milo');
//       done();
//     });
//     it('should have a type of "Lab"',done =>{
//       expect(this.newDoge.type).to.equal('Lab');
//       done();
//     });
//     it('should have a color of "Black"',done =>{
//       expect(this.newDoge.color).to.equal('Black');
//       done();
//     });
//     it('should have a name of "Milo"',done =>{
//       let pattern = /[0-9 a-f]{8}-[0-9 a-f]{4}-[0-9 a-f]{4}-[0-9 a-f]{4}-[0-9 a-f]{4}-[0-9 a-f]{12}/;
//       expect(this.newDoge.id).to.match(pattern);
//       done();
//     });
//   });
// });
