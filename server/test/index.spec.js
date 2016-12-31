// Import chai.
let chai = require('chai');
  // path = require('path');

// Tell chai that we'll be using the "should" style assertions.
chai.should();

// Import the Rectangle class.
// let index = require(path.join(__dirname, '../src', 'index'));

// The fat arrow (=>) syntax is a new way to define
// functions in ES6. One feature that is different
// from the usual "function" keyword is that the scope
// is inherited from the parent, so there is no need to write
//
//   function() {
//     ...
//   }.bind(this)
//
// anymore. In this case we are not using "this" so the new
// syntax is just used for brevity.
describe('DemoRoot::TESTING', () => {
  it('returns the width', () => {
    let x = 1;
    x.should.equal(1);
  });
});
