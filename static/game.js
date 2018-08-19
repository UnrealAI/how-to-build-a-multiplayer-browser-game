let socket = io();

let movement = {
  up: false,
  down: false,
  left: false,
  right: false
};

let saber = {
  arc: 0 // 0-359
  strength: 1 // 0-150
};

function new_direction(direction) {
  if (direction == "RIGHT"){
    //make closer to 90
    //270 is opposite, should not move much?
    opp = saber.arc - 180
  }
  if (direction == "UP"){
    //make closer to 0
  }
  if (direction == "DOWN"){
    //make closer to 180
  }
  if (direction == "LEFT"){
    //make closer to 270
  }
  return new_arc;
};

document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});
document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  socket.emit('movement', movement);
}, 10);

let canvas = document.getElementById('canvas');

canvas.width = 800;
canvas.height = 600;

let context = canvas.getContext('2d');

socket.on('state', function(players) {
  console.log(players);
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'green';
  for (let id in players) {
    let player = players[id];
    if(player.disconnect != true){
      context.beginPath();
      // context.arc(player.x, player.y, 10, 0, 2 * Math.PI);
      const img = new Image();
      img.src = "https://banner2.kisspng.com/20171220/olw/goat-png-5a3af389c7e615.94348371151381287381888403.jpg";
      context.drawImage(player.x,player.y,10,10);
      context.fill();
    }
  }
});
