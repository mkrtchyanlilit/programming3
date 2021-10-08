
let LivingCreature = require('./LivingCreature')

module.exports = class Fire extends LivingCreature {
    constructor(x, y, index) {
		super(x, y, index);
		this.energy = 8
  }

    mul() {
        this.multiply++;
        if (this.multiply >= 3) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 3 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y][x] = 8
                fireArr.push(new Fire(x, y, 8))
                this.multiply = 0;
            }
    }
    }

    move() {
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

			this.x = newX;
			this.y = newY
		}

		this.energy--;
		if (this.energy <= 0) {
			this.die();
		}


	}
    
    kill() {
        var emptyCellsGrass = super.chooseCell(1);
        var emptyCellsPredator = super.chooseCell(3);
        var emptyCellsColorChanger = super.chooseCell(5);
		var emptyCellsGrassEater = super.chooseCell(2);
        var emptyCellsMultyplayer = super.chooseCell(4);
        var emptyCells = emptyCellsGrassEater.concat(emptyCellsMultyplayer, emptyCellsPredator, emptyCellsColorChanger, emptyCellsGrass);
        var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {

			var newX = newCell[0];
			var newY = newCell[1];

			matrix[newY][newX] = matrix[this.y][this.x];
			matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
				if (grassArr[i].x == newX && grassArr[i].y == newY) {
					grassArr.splice(i, 1)
				}
            }
			for (var i in grassEaterArr) {
				if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
					grassEaterArr.splice(i, 2)
				}
            }
            for (var i in multyplayerArr) {
				if (multyplayerArr[i].x == newX && multyplayerArr[i].y == newY) {
					multyplayerArr.splice(i, 4)
				}
            }
            for (var i in predatorArr) {
				if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
					predatorArr.splice(i, 3)
				}
            }
            for (var i in colorChangerArr) {
				if (colorChangerArr[i].x == newX && colorChangerArr[i].y == newY) {
					colorChangerArr.splice(i, 5)
				}
			}

			this.x = newX;
			this.y = newY;
			this.energy++;

			if (this.energy >= 12) {
				this.mul();
				this.energy = 8
			}

		}
		else {
			this.move();
		}
    }
    
    die() {
		matrix[this.y][this.x] = 0;
		for (var i in fireArr) {
			if (fireArr[i].x == this.x && fireArr[i].y == this.y) {
				fireArr.splice(i, 1)
			}
		}
	}
}