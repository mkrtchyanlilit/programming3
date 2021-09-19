class GrassEater extends Grass {
    constructor(x, y, index){
        super(x, y, index);
        this.energy = 8;
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
           [this.x + 1, this.y + 1]
       ];
   }
   chooseCell(character) {
       this.getNewCoordinates();
       return super.chooseCell(character);
   }


  //MUL
  mul() {
    var emptyCells = this.chooseCell(0);
    var newCell = random(emptyCells);

    if (this.energy > 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];

      var newGrassEater = new GrassEater(newX, newY, this.id);
      grassEaterArr.push(newGrassEater);

      matrix[newY][newX] = this.id;

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

    if (this.energy > 12 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = this.id;
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;

      for (var i in grassArr) {
        if (grassArr[i].x == newX && grassArr[i].y == newY) {
          grassArr.splice(i, 1);
          break;
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

      for (var i in grassEaterArr) {
        if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
          grassEaterArr.splice(i, 1);
          break;
        }
      }
    }
  }
}
