const LivingCreature = require("./LivingCreature");

module.exports = class ColorChanger extends LivingCreature{
  constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8
	}
  
  
    //MUL
  
    mul() {
      var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  
      if (this.energy > 12 && newCell) {
        colorChangerHashiv++;
        var newX = newCell[0];
        var newY = newCell[1];
  
        matrix[newY][newX] = 5;
  
        var newColorChanger = new ColorChanger(newX, newY, 5);
        colorChangerArr.push(newColorChanger);

        this.energy = 10;
      }

      if (weath == "winter") {
        this.energy -= 2;
        this.multiply -= 4;
      }
      if (weath == "summer") {
        this.energy += 2;
        this.multiply += 3;   
      }
    }
  
    //MOVE
  
    move() {
      var emptyCells = super.chooseCell(0);
      var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
  
      if (this.energy > 0 && newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
        matrix[this.y][this.x] = 0;
  
        this.x = newX;
        this.y = newY;
  
        
      }
      this.energy--;
      if (this.energy <= 0) {
        this.die();
      }
    }
  
    //EAT
  
    eat() {
      var predatorCells = super.chooseCell(3);
		var newCell = predatorCells[Math.floor(Math.random() * predatorCells.length)]
  
      if (this.energy > 0 && newCell) {
        var newX = newCell[0];
        var newY = newCell[1];
        matrix[newY][newX] = matrix[this.y][this.x];
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

        if (this.energy >= 12) {
          this.mul();
          this.energy = 8
        }
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
  