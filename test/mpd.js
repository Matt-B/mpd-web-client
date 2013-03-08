var mocha = require('mocha'),
    chai = require('chai'),
    should = require('chai').should(),
    spies = require('chai-spies'),
    rewire = require('rewire');

chai.use(spies);

describe('mpd', function(){
	it('should try and connect to mpd when connect is called', function(){
      
      var mpd = rewire('../mpd.js');
      var spy = chai.spy();

      mpd.__set__("komponist", {
        createConnection: spy
      });

      mpd.connect(6000, 'localhost');

      spy.should.have.been.called;      

    });
});