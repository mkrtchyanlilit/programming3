var socket = io();
var side = 10;
var weath = "summer";
var matrix = [];


function setup() {

  let grassCountElement = document.getElementById('grassCount');
  let grassEaterCountElement = document.getElementById('grassEaterCount');
  let predatorCountElement = document.getElementById('predatorCount');
  let multyplayerCountElement = document.getElementById('multyplayerCount');
  let colorChangerCountElement = document.getElementById('colorChangerCount')


  socket.on("data", draw);

  function draw(data) {
    createCanvas(50 * side, 50 * side);
    background("#acacac");
    
    matrix = data.matrix;
    grassCountElement.innerText = data.grassCounter;
    grassEaterCountElement.innerText = data.grassEaterCounter;
    predatorCountElement.innerText = data.predatorCounter;
    multyplayerCountElement.innerText = data.multyplayerCounter;
    colorChangerCountElement.innerText = data.colorChangerCounter;
    for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[y].length; x++) {
        var obj = matrix[y][x];
        if (obj == 1) {
          if (weath == "summer") {
            fill("green");
          } else if (weath == "autumn") {
            fill("#333300");
          } else if (weath == "winter") {
            fill("white");
          } else if (weath == "spring") {
            fill("chartreuse");
          }
        } else if (obj == 2) {
          fill("yellow");
        } else if (obj == 3) {
          fill("red");
        } else if (obj == 4) {
          fill("blue");
        } else if (obj == 5) {
          fill("orange");
        } else if (obj == 6) {
          fill("purple");
        } else if (obj == 7) {
          fill("aqua");
        }
        else if (obj == 8) {
          fill("black");
        }else {
          fill("#acacac");
        }

        rect(x * side, y * side, side, side);
      }
    }
  }

  socket.on("send matrix", draw);
}

function kill() {
  socket.emit("kill");
}
function addGrass() {
  socket.emit("add grass");
}
function addGrassEater() {
  socket.emit("add grassEater");
}
function water() {
  socket.emit("water");
}
function fire() {
  socket.emit("fire");
}

function winter() {
  weath = "winter";
  socket.emit("winter");
  console.log("true");
}

function spring() {
  weath = "spring";
  socket.emit("spring");
  console.log("true");
}

function summer() {
  weath = "summer";
  socket.emit("summer");
  console.log("true");
}

function autumn() {
  weath = "autumn";
  socket.emit("autumn");
  console.log("true");
}


