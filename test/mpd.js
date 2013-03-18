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

  it('should return the current status of mpd when status is called and mpd is connected', function(){
    var statusObject = { 
      volume: '100',
      repeat: '0',
      random: '0',
      single: '0',
      consume: '0',
      playlist: '2',
      playlistlength: '1',
      xfade: '0',
      mixrampdb: '0.000000',
      mixrampdelay: 'nan',
      state: 'stop',
      song: '0',
      songid: '0' 
    };
    var err;
    mpd.__set__({
      "connected": true,
      "client": {
        status: function(callback){          
          callback(err, statusObject);
        }
      }
    });
    mpd.status(function(err, status){
      status.should.equal(statusObject);
    });   
  });

  it('should make a next call to mpd when connected and next is called', function(){
    var called = false;
    mpd.__set__({
      "isConnected": true,
      "client": {
        next: function(){
          called = true;
        }
      }
    });
    
    mpd.next();

    called.should.equal(true);
  });

  it('should make a previous call to mpd when connected and previous is called', function(){
    var called = false;
    mpd.__set__({
      "isConnected": true,
      "client": {
        previous: function(){
          called = true;
        }
      }
    });

    mpd.previous();

    called.should.equal(true);
  });

  it('should add a tracks filename to the mpd playlist when add is called with that filename', function(){
    var called = false;
    var filename;
    mpd.__set__({
      "isConnected": true,
      "client": {
        add: function(uri){
          called = true;
          filename = uri;
        }
      }
    });

    mpd.add('/home/matt/Music/test.mp3');

    called.should.equal(true);
    filename.should.equal('/home/matt/Music/test.mp3');
  });

});