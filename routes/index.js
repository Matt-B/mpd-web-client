var client = require('../mpd').getClient();

exports.index = function(req, res){
  client.currentsong(function(err, info) {
    client.status(function(err, status) {
      client.listall(function(err, list) {
        var fileList = [];
        for(i=0; i < list.length; i++) {
          if(list[i].directory)
            fileList.push(list[i]);
        }
        res.render('index', {title: 'MPD Status', status: status, error: err, info: info, list: fileList });
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

exports.setvol = function(req, res){
  if (req.param('volume') <= 100 && req.param('volume') >= 0) {
    client.setvol(req.param('volume'));
  }
};