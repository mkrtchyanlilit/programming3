
let LivingCreature = require('./LivingCreature')

module.exports = class Fire extends LivingCreature {

    mul() {
        this.multiply++;
        if (this.multiply >= 5) {
            let emptyCells = super.chooseCell(0)
            let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
            if (this.multiply >= 5 && newCell) {
                let x = newCell[0]
                let y = newCell[1]
                matrix[y][x] = 8
                fireArr.push(new Fire(x, y, 8))
                this.multiply = 0;
            }
    }
}
}