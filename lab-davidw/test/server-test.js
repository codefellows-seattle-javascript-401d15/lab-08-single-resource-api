// 'use strict';
//
// const server = require('../server');
// const chai = require('chai');
// const http = require('chai-http');
// const expect = chai.expect;
//
// chai.use ('http');
//
// describe('Server module', function() {
//   before(done => {
//     server.listen(3030);
//     done();
//   });
//
//   after(done => {
//     server.close();
//     done();
//   });
//
//
// describe('GET method', function() {
//   before(done => {
//     chai.request(server)
//     .post('/api/lure')
//     .send({name: 'momba', type: 'rattler', targets: 'trout'})
//     .end((err, res) => {
//       resource = JSON.parse(res.text.toString())
//       done()
//     })
//   })
//   after(done => {
//     chai.request(server)
//     .delete('/api/lure')
//     .query({id: resource.id})
//     .end((err, res) => {
//       done();
//     })
//   })
//
// describe('/api/lure route', function() {
//   describe('a properly formatted request', function() {
//     it('should return a resource given proper id', done => {
//       chai.request(server)
//       .get(`api/lure?id=${resource.id}`)
//       .query({id: resource.id})
//       .end((err, res) => {
//         done();
//       })
//     })
//   })
//
//
// describe('POST method', function() {
//
//
//
// });
//
// describe('PUT method', function() {
//
//
//
// });
//
// describe('DELETE method', function() {
//
//
//     });
//   });
// })
