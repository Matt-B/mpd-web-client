var komponist = require('komponist'),
    hostname = '192.168.5.6',
    port = 6600,
    client;

console.log('Loaded mpd.js and connecting to MPD');

client = komponist.createConnection(port, hostname, function(err) {
	if(err) {
      console.log('An error occurred connecting to MPD: ' + err);
	} else {
      client.status(function(err, status) {
        console.log('Connected to MPD (' + hostname +':' + port + ') current status is ' + status.state);
      });
  }
});

function getClient() {
	return client;
}

exports.getClient = getClient;