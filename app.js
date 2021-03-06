
var express = require('express'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    partials = require('express-partials'),
    mpd = require('./mpd'),
    client = mpd.getClient(),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(partials());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/toggle', routes.toggle);
app.post('/next', routes.next);
app.post('/previous', routes.previous);
app.post('/setvol', routes.setvol);
app.post('/search', routes.search);
app.post('/add', routes.add);
app.post('/delete', routes.delete);
app.post('/clear', routes.clear);
app.post('/play', routes.play);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

io.sockets.on('connection', function (socket) {
  console.log('A client connected...');
});

client.on('changed', function(change) {
  console.log('change happening, broadcasting...');
  io.sockets.emit('change', change);
});