var mocha = require('mocha'),
    chai = require('chai'),
    should = require('chai').should(),
    spies = require('chai-spies'),
    rewire = require('rewire'),
    mpd = rewire('../mpd.js');

chai.use(spies);

describe('mpd', function(){
	it('should try and connect to mpd when connect is called', function(){      
    var spy = chai.spy();
    mpd.__set__("komponist", {
      createConnection: function() {
        spy();
      }
    });
    mpd.connect(6000, 'localhost');
    spy.should.have.been.called.once();
  });

  it('should make a toggle call to mpd when connected and pause is called', function(){
    var spy = chai.spy();
    mpd.__set__({
      "isConnected": true,
      "client": {
        toggle: function(){
          spy();
        }
      }
    });
    mpd.pause();
    spy.should.have.been.called.once();
  });

  it('should not make a toggle call to mpd when not connected and pause is called', function(){
    var spy = chai.spy();
    mpd.__set__({
      "isConnected": false,
      "client": {
        toggle: function(){
          spy();
        }
      }
    });
    mpd.pause();
    spy.should.have.been.not_called;
  });
});