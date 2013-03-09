var mocha = require('mocha'),
    should = require('chai').should(),
    rewire = require('rewire'),
    mpd = rewire('../mpd.js');

describe('mpd', function(){
	it('should try and connect to mpd when connect is called', function(){      
    var called = 0;
    mpd.__set__("komponist", {
      createConnection: function() {
        called++;
      }
    });
    mpd.connect(6000, 'localhost');
    called.should.equal(1);
  });

  it('should make a toggle call to mpd when connected and pause is called', function(){
    var called = false;
    mpd.__set__({
      "isConnected": true,
      "client": {
        toggle: function(){
          called = true;
        }
      }
    });
    mpd.pause();
    called.should.equal(true);
  });

  it('should not make a toggle call to mpd when not connected and pause is called', function(){
    var called = false;
    mpd.__set__({
      "isConnected": false,
      "client": {
        toggle: function(){
          called = true;
        }
      }
    });
    mpd.pause();
    called.should.equal(false);
  });

  it('should not try and set volume when mpd reports volume is N/A', function(){
    var called = false;
    mpd.__set__({
      "isConnected": true,
      "client": {
        setvol: function(){
          called = true;
        },
        "status": function(callback){
          callback(undefined, { volume: '-1' });
        }
      }
    });
    mpd.setVolume(20);
    called.should.equal(false);
  });
});