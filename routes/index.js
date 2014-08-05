var client = require('../mpd').getClient();

exports.index = function(req, res){
  client.currentsong(function(err, info) {
    client.status(function(err, status) {
      console.log(status);
      client.playlistinfo(function(err, playlist) {
        console.log(playlist);
        res.render('index', {title: 'MPD Status', status: status, error: err, info: info, playlist: playlist });
      });        
    });          
  });  
};

exports.toggle = function(req, res){
  client.toggle();
};

exports.next = function(req, res){
  client.next();
};

exports.previous = function(req, res){
  client.previous();
};

exports.add = function(req, res){
  client.add(req.param('URI'));
};

exports.delete = function(req, res){
  client.delete(req.param('Pos'));
};

exports.setvol = function(req, res){
  if (req.param('volume') <= 100 && req.param('volume') >= 0) {
    client.setvol(req.param('volume'));
  }
};

exports.clear = function(req, res){
  client.clear();
};

exports.play = function(req, res){
  client.play();
};

exports.search = function(req, res){
  var results = [];
  client.search('title', req.param('searchterm'), function(err, titlesearchresults) {
    console.log(titlesearchresults);
    if(titlesearchresults && titlesearchresults[0].Title)
      results = results.concat(titlesearchresults);
    client.search('artist', req.param('searchterm'), function(err, artistsearchresults) {
      console.log(artistsearchresults);
      if(artistsearchresults && artistsearchresults[0].Title)
        results = results.concat(artistsearchresults);
      client.search('album', req.param('searchterm'), function(err, albumsearchresults) {
        console.log(albumsearchresults);
        if(albumsearchresults && albumsearchresults[0].Title)
          results = results.concat(albumsearchresults);
        res.render('searchresults.jade', { layout: false, searchresults: results });
      });
    });
  });
};
