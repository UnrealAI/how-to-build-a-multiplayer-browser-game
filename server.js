var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(5000, function() {
  console.log('Starting server on port 5000');
});

var canvasBound = {}
canvasBound.min_x = 0
canvasBound.max_x = 800
canvasBound.min_y = 0
canvasBound.max_y = 600

var players = {};
io.on('connection', function(socket) {
  socket.on('new player', function() {
    players[socket.id] = {
      x: 450,
      y: 450
    };
  });
  socket.on('movement', function(data) {
    var player = players[socket.id] || {};
    if (data.left) {
      player.x -= 5;
    }
    if (data.up) {
      player.y -= 5;
    }
    if (data.right) {
      player.x += 5;
    }
    if (data.down) {
      player.y += 5;
    }
    if (player.x <= canvasBound.min_x - 10){
      player.x = canvasBound.max_x
    }
    if (player.x >= canvasBound.max_x + 10){
      player.x = canvasBound.min_x
    }
    if (player.y <= canvasBound.min_y - 10){
      player.y = canvasBound.max_y;
    }
    if (player.y >= canvasBound.max_y + 10){
      player.y = canvasBound.min_y;
    }

  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
    var player = players[socket.id] || {};
    player.disconnect = true
  });
});

setInterval(function() {
  io.sockets.emit('state', players);
}, 1000 / 60);
