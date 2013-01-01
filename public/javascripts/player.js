var socket = io.connect('http://localhost:3000');
    socket.on('change', function (data) {
      console.log(data);
      location.reload(true);
    });

function dispatchCommand(command, param) {
  console.log("Command: "+command+" called with param "+param);
  $.post('/'+command, param, function(response) {
      // log the response to the console
      console.log("Response: "+response);
  });  
}
