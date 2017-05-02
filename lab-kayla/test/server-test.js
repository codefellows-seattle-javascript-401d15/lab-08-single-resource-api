'use strict';

// const router = require('../lib/router');
// const server = require('../server');
// const chai = require('chai');
// const http = require('chai-http');
// const expect = chai.expect;
//
// chai.use(http);
//
// describe('server testing', function() {
//   before(done => {
//     server.listen(3000);
//     done();
//   });
//   after(done => {
//     server.close();
//     done();
//   });
//
//   describe('GET method', function() {
//     let resource;
//     before(done => {
//       chai.request(server)
//       .post('/api/dragon')
//       .send({name: 'Phil', type: 'big', killer: true})
//       .end((err, res) => {
//         resource = JSON.parse(res.text.toString());
//         done();
//       })
//     })
//     after(done => {
//       chai.request(server)
//       .delete('/api/dragon')
//       .query({id: resource.id})
//       .end(() => {
//         console.error();
//         done();
//       })
//     })
//     describe('/api/dragon route', function() {
//       describe('properly formatted request', function() {
//         it('should return a resource given proper id', done => {
//           chai.request(server)
//           .get(`/api/dragon?id=${resource.id}`)
//           .end((err, res) => {
//             let expected = JSON.parse(res.text.toString());
//             expect(resource).to.deep.equal(expected);
//             done();
//           })
//         })
//       })
//       describe('improperly formatted request', function() {
//         it('should return an error response 400', done => {
//           chai.request(server)
//           .get(`/api/dragon?foo=${resource.id}`)
//           .end((err, res) => {
//             expect(res).to.have.status(400);
//             done();
//           })
//         })
//       })
//     })
//     describe('unregistered route', function() {
//       it('should respond with 404 for an id not found', done => {
//         chai.request(server)
//         .get('/api/dragon?id=fakeid')
//         .end((err, res) => {
//           expect(res).to.have.status(404);
//           done();
//         })
//       })
//     })
//   })
//   describe('POST method', function() {
//     describe('/api/dragon route', function() {
//       it('should return a 200 response', done => {
//         chai.request(server)
//         .post('/api/dragon')
//         .send({name:'Phil', type:'big', killer: true})
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           done();
//         })
//       })
//     })
//   })
//   describe('PUT method', function() {
//     describe('/api/dragon route', function() {
//       let resource;
//       before(done => {
//         chai.request(server)
//         .post('/api/dragon')
//         .send({name:'Phil', type:'big', killer: true})
//         .end((err, res) => {
//           resource = JSON.parse(res.text);
//           done();
//         });
//       });
//       after(done => {
//         chai.request(server)
//         .delete('/api/dragon')
//         .query({id: resource.id})
//         .end(() => {
//           console.error();
//           done();
//         })
//       })
//     })
//   })
//   describe('DELETE method', function() {
//     describe('/api/dragon route', function() {
//       let resource;
//       before(done => {
//         chai.request(server)
//         .post('api/dragon')
//         .send({name:'Phil', type:'big', killer: true})
//         .end((err, res) => {
//           resource = JSON.parse(res.text);
//           done();
//         });
//       });
//       after(done => {
//         chai.request(server)
//         .delete('/api/dragon')
//         .query({id: resource.id})
//         .end(() => {
//           console.error();
//           done();
//         });
//       });
//     })
//   })
// });
