var komponist = require('komponist'),
    mpdHostname = 'localhost',
    mpdPort = 6600,
    connected = false,
    client;

client = komponist.createConnection(mpdPort, mpdHostname, function(err) {
	if(err) {
      console.log('An error occurred connecting to MPD: ' + err);
	} else {
      client.status(function(err, status) {
        console.log('Connected to MPD (' + mpdHostname +':' + mpdPort + ') current status is ' + status.state);
      });
  }
});

exports.getClient = function() {
	return client;
};

exports.connect = function(port, host) {
  client = komponist.createConnection(port, host, function(err){
    if(err)
      connected = false;
    else
      connected = true;
  });
};

exports.isConnected = function() {
  return connected;
};

exports.pause = function() {
  if(isConnected)
    client.toggle();
};

exports.next = function() {
  if(isConnected)
    client.next();
};

exports.setVolume = function(percentage){
  var currentVolume;
  if(isConnected)
    client.status(function(err, status){
      currentVolume = status.volume;
    });
    if(currentVolume !== '-1')
      client.setvol(percentage);
};

exports.status = function(callback){
  if(isConnected && client){
    client.status(function(err, status){
      callback(err, status);
    });
  }
};

module.exports = exports;
