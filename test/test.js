'use strict';

const Ninja = require('../model/ninjas')
const expect = require('chai').expect

describe('kid-toy module', function(){
  it ('should create a new ninja', done => {
    let newNinja = new Ninja('gary', 'foot', 'stick');
    expect(newNinja.name).to.equal('gary');
    done();
  });
  it('should have a unique uuid value', done => {
    let pattern = /[]{8}-[]{4}-[0-9a-f]{12}/
  })
})

//the pattern is the section, number of values in each section 0-9a-f shows its in hex
