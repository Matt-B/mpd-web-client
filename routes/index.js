var komponist = require('komponist'),
    hostname = '192.168.5.6';
    var client = komponist.createConnection(6600, hostname, function(err) {
      if(err)
        console.log(err);
    });


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
  client.toggle(function(err) {
    res.redirect('/');
  });
};

exports.next = function(req, res){
  client.next(function(err) {
    res.redirect('/');
  });
};

exports.previous = function(req, res){
  client.previous(function(err) {
    res.redirect('/');
  });
};

exports.setvol = function(req, res){
  client.setvol(req.param('volume'), function(err) {
    res.redirect('/');
  });
};

client.on('changed', function(system) {     
     console.log('Something has happened: '+ system);
});