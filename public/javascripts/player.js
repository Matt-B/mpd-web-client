var socket = io.connect('http://localhost:3000');
    socket.on('change', function (data) {
      console.log(data);
      location.reload(true);
    });

function dispatchCommand(command, param) {
  console.log("Command: "+command+" called with param "+param);
  $.post('/'+command, param, function(err, response) {
      if(err)
        $("div.row.alert").html(err);
  });  
}

function search(searchTerm) {
  $.ajax({
    type: "POST",
    url: '/search',
    data: "searchterm=" + searchTerm, // appears as $_GET['id'] @ ur backend side
    success: function(data) {
      $('#searchresults').html(data);
    },
    error: function(data) {
      console.log(data);
    }
  });
}