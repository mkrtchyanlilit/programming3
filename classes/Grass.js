const LivingCreature = require("./LivingCreature");

module.exports = class Grass extends LivingCreature{
  mul() {
    this.multiply++;

    let emptyCells = super.chooseCell(0)
    let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

    if (this.multiply >= 8 && newCell) {
        var newX = newCell[0];
        var newY = newCell[1];

        matrix[newY][newX] = this.id;

        var newGrass = new Grass(newX, newY, this.id);
        grassArr.push(newGrass);

        this.multiply = 0;

        if (weath == "winter") {
            this.energy -= 2;
            this.multiply -= 2;
        }
    }

  
//   if (weath == "spring") {
//       this.energy += 5;
//       this.multiply += 5;
//   }
//   if (weath == "summer") {
//       this.energy += 3;
//       this.multiply += 3;
//   }
//   if (weath == "autumn") {
//       this.energy--;
//       this.multiply--;
// }
}
}

 

