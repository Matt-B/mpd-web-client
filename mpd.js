var komponist = require('komponist'),
    mpdHostname = '192.168.1.101',
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

exports.setVolume = function(percentage){
  var currentVolume;
  if(isConnected)
    client.status(function(err, status){
      currentVolume = status.volume;
    });
    if(currentVolume !== '-1')
      client.setvol(percentage);
};

exports.status = function(){
  if(isConnected && client){
    client.status(function(err, status){
      return status;
    });
  }
};

module.exports = exports;