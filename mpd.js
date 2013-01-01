var komponist = require('komponist'),
    mpdHostname = '192.168.5.6',
    mpdPort = 6600,
    client;

console.log('Loaded mpd.js and connecting to MPD');

client = komponist.createConnection(mpdPort, mpdHostname, function(err) {
	if(err) {
      console.log('An error occurred connecting to MPD: ' + err);
	} else {
      client.status(function(err, status) {
        console.log('Connected to MPD (' + mpdHostname +':' + mpdPort + ') current status is ' + status.state);
      });
  }
});

function getClient() {
	return client;
}

exports.getClient = getClient;