
let LivingCreature = require('./LivingCreature')

module.exports = class Water extends LivingCreature {

    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y][x] = 7
                waterArr.push(new Water(x, y, 7))
                this.multiply = 0;
            }
    }
}
}