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

  it('should not try and set volume when mpd reports volume is N/A', function(){
    var spy = chai.spy();
    mpd.__set__({
      "isConnected": true,
      "komponist": {
        setvol: function(){
          spy();
        },
        status: function(){
          return {
            volume: '-1',
            repeat: '0',
            random: '0',
            single: '0',
            consume: '0',
            playlist: '2',
            playlistlength: '2',
            xfade: '0',
            mixrampdb: '0.000000',
            mixrampdelay: 'nan',
            state: 'pause',
            song: '1',
            songid: '1',
            time: '14:250',
            elapsed: '14.000',
            bitrate: '0',
            audio: '44100:24:2' };
        }
      }
    });
    mpd.setVolume(20);
    spy.should.have.been.not_called;
  });
});