class ColorChanger extends Grass{
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
        [this.x + 1, this.y + 1],
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
  
      if (this.energy > 12 && newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
  
        matrix[newY][newX] = this.id;
  
        var newColorChanger = new ColorChanger(newX, newY, this.id);
        colorChangerArr.push(newColorChanger);

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
      var emptyCells = this.chooseCell(3);
      var newCell = random(emptyCells);
  
      if (this.energy > 0 && newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = this.id;
        matrix[this.y][this.x] = 0;
  
        this.x = newX;
        this.y = newY;
        
  
        for (var i in grassEaterArr) {
          if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
            grassEaterArr.splice(i, 1);
            break;
          }
        }
  
        this.energy++;

        if (this.id == 5) {
            this.id = 6;
            matrix[newY][newX] = 6;
        } else {
            this.id = 5;
            matrix[newY][newX] = 5;
        }

        this.mul();
      } else {
        this.move();
      }
    }
  
    //DIE
    die() {
      if (this.energy <= 0) {
        matrix[this.y][this.x] = 0;
  
        for (var i in colorChangerArr) {
          if (colorChangerArr[i].x == this.x && colorChangerArr[i].y == this.y) {
            colorChangerArr.splice(i, 1);
            break;
          }
        }
      }
    }
  }
  