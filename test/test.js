var mocha = require('mocha'),
    should = require('chai').should();

describe('A test', function(){
	it('should test that true is true', function(){
      var affirmative = true;
      affirmative.should.equal(true);
	});
});