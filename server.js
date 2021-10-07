var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

grassArr = [];
grassEaterArr = [];
predatorArr = [];
multyplayerArr = [];
colorChangerArr = [];
waterArr = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
multyplayerHashiv = 0;
colorChangerHashiv = 0;
matrix = [];

var n = 50;

weath = "summer";
Grass = require("./classes/Grass")
Water = require("./classes/Water")
GrassEater = require("./classes/GrassEater")
Predator = require("./classes/Predator")
ColorChanger = require("./classes/ColorChanger")
Multyplayer = require("./classes/Multyplayer")
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 8))

    }
}

io.sockets.emit("send matrix", matrix)


function createObject() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1
                grassArr.push(new Grass(x, y, 1))
                grassHashiv++;
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2
                grassEaterArr.push(new GrassEater(x, y, 2))
                grassEaterHashiv++;
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 3
                predatorArr.push(new Predator(x, y, 3))
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 4
                multyplayerArr.push(new Multyplayer(x, y, 4))
                multyplayerHashiv++;
            }
            else if (matrix[y][x] == 5) {
                matrix[y][x] = 5
                colorChangerArr.push(new ColorChanger(x, y, 5))
                colorChangerHashiv++;
            }
            else if (matrix[y][x] == 7) {
                matrix[y][x] = 5
                waterArr.push(new Water(x, y, 7))
            }
        }
    }
    // io.sockets.emit('send matrix', matrix)
}
createObject()

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
          }
    }
      
    if (multyplayerArr[0] !== undefined) {
        for (var i in multyplayerArr) {
            multyplayerArr[i].eat();
          }
    }
    
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
          }
      }
    
    if (colorChangerArr[0] !== undefined) {
        for (var i in colorChangerArr) {
            colorChangerArr[i].eat();
        
          }
    }
    
    if (waterArr[0] !== undefined) {
        for (var i in waterArr) {
            waterArr[i].mul();
        
          }
      }
      
      let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        multyplayerCounter: multyplayerHashiv,
        colorChangerCounter: colorChangerHashiv
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 5000)


function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    multyplayerArr = [];
    colorChangerArr = [];
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }

}

function water() {
    grassEaterArr = [];
    predatorArr = [];
    multyplayerArr = [];
    colorChangerArr = [];
    
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y, 1)
            grassArr.push(gr)
        }
    }
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y, 2))
        }
    }

}

io.on('connection', function (socket) {
    // createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("water", water);
});


var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.multyplayer = multyplayerArr.length;
    statistics.colorChanger = colorChangerArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    });

}, 1000)