'use strict';

const Watch = require('../model/watch');
const expect = require('chai').expect;

describe('watch module', function() {
  it('should create a new watch object with a brand Sekonda', done => {
    let newWatch = new Watch('Sekonda', 'black', 'small');
    expect(newWatch.brand).to.equal('Sekonda');
    done();
  });
  it('should create a new watch object with a color black', done => {
    expect(this.brand).to.equal('black');
    done();
  });
  it('should create a new watch object with a size small', done => {
    expect(this.brand).to.equal('small');
    done();
  it('should have an id of a unique uuid value', done => {
    // xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx
    let pattern = /[0-9a-f]{8}-[0-9a-f]{4}-

  });
  });
});
