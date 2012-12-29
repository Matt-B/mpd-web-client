var komponist = require('komponist'),
    hostname = '192.168.5.6';


exports.index = function(req, res){
  var client = komponist.createConnection(6600, hostname, function() {
    client.currentsong(function(err, info) {
      client.status(function(err, status) {
        client.listall(function(err, list) {
          var fileList = [];
          for(i=0; i < list.length; i++) {
            if(list[i].file)
              fileList.push(list[i]);
          }
          res.render('index', {title: 'MPD Status', status: status, error: err, info: info, list: fileList });
          client.command('close');
        });        
      });          
    });  
  });
};

exports.toggle = function(req, res){
  var client = komponist.createConnection(6600, hostname, function() {
    client.toggle(function(err) {
      res.redirect('/');
      client.command('close');
    });
  });
};

exports.next = function(req, res){
  var client = komponist.createConnection(6600, hostname, function() {
    client.next(function(err) {
      res.redirect('/');
      client.command('close');
    });
  });
};

exports.previous = function(req, res){
  var client = komponist.createConnection(6600, hostname, function() {
    client.previous(function(err) {
      res.redirect('/');
      client.command('close');
    });
  });
};

exports.setvol = function(req, res){
  var client = komponist.createConnection(6600, hostname, function() {
    client.setvol(req.param('volume'), function(err) {
      res.redirect('/');
      client.command('close');
    });
  });
};