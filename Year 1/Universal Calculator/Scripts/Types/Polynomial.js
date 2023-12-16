class Polynomial {
  constructor(poly = []){
    this.poly = poly;
    this.poly.sort((a, b) => b.power - a.power);
  }

  addValue(x){
    const calc = new Calculator;
    return this.poly.reduce((S, elem) => {
      calc.add(S, calc.multiply(elem.value, calc.pow(x, elem.power))),
      calc.zero(null, x)
    });
  }

}