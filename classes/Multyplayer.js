class Multyplayer {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
    this.energy = 8;
    this.getNewCoordinates();
  }

  getNewCoordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x, this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y],
      [this.x + 1, this.y],
      [this.x - 1, this.y + 1],
      [this.x, this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }

  chooseCell(character) {
    this.getNewCoordinates();
    var found = [];
    for (var i in this.directions) {
      var x = this.directions[i][0];
      var y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[y][x] == character) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }

  //MUL

  mul() {
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];

      matrix[newY][newX] = this.id;

      var newMultyplayer = new Multyplayer(newX, newY, this.id);
      multyplayerArr.push(newMultyplayer);

      this.energy = 8;
    }
  }

  //MOVE

  move() {
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (this.energy > 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = this.id;
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;

      this.energy--;
    }

    this.die();
  }

  //EAT

  eat() {
    var emptyCells = this.chooseCell(1);
    var newCell = random(emptyCells);

    if (this.energy > 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = this.id;
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;

      for (var i in grassArr) {
        if (grassArr[i].x == newX && grassArr[i].y == newY) {
          grassArr.splice(i, 1);
        }
      }

      this.energy++;
      this.mul();

    } else {
      this.move();
    }
  }

  //DIE

  die() {
    if (this.energy <= 0) {
      matrix[this.y][this.x] = 0;

      for (var i in multyplayerArr) {
        if (multyplayerArr[i].x == this.x && multyplayerArr[i].y == this.y) {
          multyplayerArr.splice(i, 1);
        }
      }
    }
  }
}
