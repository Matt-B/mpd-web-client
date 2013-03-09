mpd-web-client
==============

[![Dependency Status](https://david-dm.org/Matt-B/mpd-web-client.png)](https://david-dm.org/Matt-B/mpd-web-client)

mpd-web-client is a very basic web interface for controlling MPD. I run this on a Raspberry Pi at the moment.

At the moment, the interface shows the current playlist, volume controls, play/pause/forward/backward controls and a simple search form to add items to the playlist.

The code is a bit of a mess at the moment, but if you want to have a look, clone the repo and do the following:

```
npm install
```

Then alter the following lines in MPD.js to point to where you have MPD running:

```javascript
mpdHostname = '192.168.1.101',
mpdPort = 6600,
```

Then start it up:

```
node app.js
```

And you should see something a bit like:

```
Loaded mpd.js and connecting to MPD
   info  - socket.io started
Express server listening on port 3000
Connected to MPD (192.168.1.101:6600) current status is stop
```

Now open a web browser, and point it at http://localhost:3000/