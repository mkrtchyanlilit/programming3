
// var socket = io();
// var matrix = [];
// var side = 15;
// function setup() {
//   createCanvas(50 * side, 50 * side)
//   background('#acacac');
//   generateMatrix(20);
// }

// socket.on("weather", function (data) {
//   weath = data;
// })


// function draw(matrix) {
//   for (var y = 0; y <= matrix.length; y++) {
//     for (var x = 0; x < matrix[y].length; x++) {
//       var obj = matrix[y][x];
//       if (obj == 1){
//           if(weath == "summer") {
//           fill("green");
//           }else if (weath == "autumn") {
//           fill("#333300");
//           }else if (weath == "winter") {
//           fill("white");
//           }else if (weath == "spring") {
//           fill("#4dffa6");
//           }
//       }else if (obj == 2) {
//           fill("yellow");
//       }else if (obj == 0){
//           fill("grey")
//       } else if (obj == 3) {
//         fill("red");
//       } else if (obj == 4) {
//         fill("blue");
//       } else if (obj == 5) {
//         fill("orange");
//       } else if (obj == 6) {
//         fill("purple");
//       } else {
//         fill("#acacac");
//       }
//       rect(x * side, y * side, side, side);
//     }
//   }
//   console.log(matrix.length)
// }
// socket.on('send matrix', draw)


// function generateMatrix(size) {
//   var newMatrix = [];
//   for (var y = 0; y < size; y++) {
//     newMatrix[y] = [];
//     for (var x = 0; x < size; x++) {
//       var randomId = random(100);
//       if (randomId < 40) {
//         newMatrix[y][x] = 1;
//       } else if (randomId < 60) {
//         newMatrix[y][x] = 2;
//       } else if (randomId < 70) {
//         newMatrix[y][x] = 3;
//       } else if (randomId < 85) {
//         newMatrix[y][x] = 4;
//       } else if (randomId < 95) {
//         newMatrix[y][x] = 5;
//       } else {
//         newMatrix[y][x] = 0;
//       }
//     }
// console.log(matrix)
//   }
//   // console.log(newMatrix)
//   return newMatrix;
  
// }


var socket = io();

var side = 15;
function setup() {
    createCanvas(50 * side, 50 * side);
    background("#acacac");
}

socket.on("weather", function (data) {
  weath = data;
})

function nkarel(matrix) {
  for (var y = 0; y < matrix.length; y++) {
      for (var x = 0; x < matrix[0].length; x++) {
          var obj = matrix[y][x];
        if (obj == 1) {
            fill("green")
          //     if(weath == "summer") {
          //     fill("green");
          // }else if (weath == "autumn") {
          //     fill("#333300");
          // }else if (weath == "winter") {
          //     fill("white");
          // }else if (weath == "spring") {
          //     fill("#4dffa6");
          // }
      }else if (obj == 2) {
              fill("yellow");
          }
          else if (obj == 3) {
                    fill("red");
        }
        else if (obj == 4) {
                    fill("blue");
                  } else if (obj == 5) {
                    fill("orange");
                  } else if (obj == 6) {
                    fill("purple");
                } 
        else {
                    fill("#acacac");
                  }
          rect(x * side, y * side, side, side);
      }
  }
}


      socket.on('send matrix', nkarel)
 


function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}


function addPredator() {
  socket.emit("add predator")
}


