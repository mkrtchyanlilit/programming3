const LivingCreature = require("./LivingCreature");

module.exports = class Predator extends LivingCreature {
  constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8
	}


  //MUL

  mul() {
    var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (this.energy > 12 && newCell) {
      predatorHashiv++;
      var newX = newCell[0];
      var newY = newCell[1];

      matrix[newY][newX] = 3;

      var newPredator = new Predator(newX, newY, 3);
      predatorArr.push(newPredator);

      this.energy = 8;
    }

    if (weath == "winter") {
			this.energy -= 4;
			this.multiply -= 5;
		}
		if (weath == "summer") {
			this.energy += 3;
			this.multiply += 4;   
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
    var emptyCellsGrassEater = super.chooseCell(2);
    var emptyCellsMultyplayer = super.chooseCell(4);
    var emptyCells = emptyCellsGrassEater.concat(emptyCellsMultyplayer);
    var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

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

      for (var i in multyplayerArr) {
        if (multyplayerArr [i].x == newX && multyplayerArr [i].y == newY) {
          multyplayerArr.splice(i, 1);
          break;
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
      matrix[this.y][this.x] = 0;

      for (var i in predatorArr) {
        if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
          predatorArr.splice(i, 1);
          break;
        }
      }
  }
}
