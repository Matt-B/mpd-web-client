var socket = io.connect('http://localhost:3000');
    socket.on('change', function (data) {
      console.log(data);
      location.reload(true);
    });

function dispatchCommand(command, param) {
  console.log("Command: "+command+" called with param "+param);
}

