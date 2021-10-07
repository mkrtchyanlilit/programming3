const LivingCreature = require("./LivingCreature");

module.exports = class Multyplayer extends LivingCreature{
  constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8
  }
  
  //MUL

  mul() {
    var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (newCell) {
      var newX = newCell[0];
      var newY = newCell[1];

      matrix[newY][newX] = 4;

      var newMultyplayer = new Multyplayer(newX, newY, 4);
      multyplayerArr.push(newMultyplayer);

      this.energy = 8;
    }

    if (weath == "winter") {
			this.energy -= 3;
			this.multiply -= 2;
		}
		if (weath == "summer") {
			this.energy += 2;
			this.multiply += 2;   
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

      this.energy--;
    }

    if (this.energy <= 0) {
			this.die();
		}
  }

  //EAT

  eat() {
    var grassCells = super.chooseCell(1);
		var newCell = grassCells[Math.floor(Math.random() * grassCells.length)]

    if (this.energy > 0 && newCell) {
      var newX = newCell[0];
      var newY = newCell[1];
      matrix[newY][newX] = matrix[this.y][this.x];
      matrix[this.y][this.x] = 0;

      this.x = newX;
      this.y = newY;

      for (var i in grassArr) {
        if (grassArr[i].x == newX && grassArr[i].y == newY) {
          grassArr.splice(i, 1);
        }
      }

      this.energy++;
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

      for (var i in multyplayerArr) {
        if (multyplayerArr[i].x == this.x && multyplayerArr[i].y == this.y) {
          multyplayerArr.splice(i, 1);
        }
      }
    }
  }
}
