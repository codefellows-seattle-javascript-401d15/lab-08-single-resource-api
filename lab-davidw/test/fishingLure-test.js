'use strict';

const Lure = require('../model/fishingLure.js');
const expect = require('chai').expect;

describe('fishingLure module', function() {
  describe('when creating a new fishing lure object', function() {
    let newLure = new Lure('momba', 'rattler', 'trout');
    it('should create a new fishingLure object', done => {
      expect(newLure.name).to.equal('momba');
      done();
    });
    it('should create a new fishingLure object', done => {
      expect(newLure.type).to.equal('rattler');
      done();
    });
    it('should create a new fishingLure object', done => {
      expect(newLure.targets).to.equal('trout');
      done();
    });
    it('should create a new fishingLure object', done => {
      expect(newLure.water).to.equal('fresh');
      done();
    });
    it('should have an id of a unique uuid value', done => {
      expect(newLure.id).to.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/);
      done();
    });
  });
});
