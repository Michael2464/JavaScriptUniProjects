class Polynomial {
  constructor(poly = []){
    this.poly = poly;
    this.poly.sort((a, b) => b.power - a.power); // what for?
  }

  getValue(x) {
    // TODO: It should return a number (float/int)

    // Learn about array functions (replace reduce with something else)
    // The structure is value*x^power, find the result (sum of those)
    const calc = new Calculator;
    //return this.poly.reduce((S) => {
    //  console.log(S);
    //  //console.log(elem);
    //  calc.add(calc.mult(S.value, calc.pow(x, S.power)))/*S*///, 
    //           //calc.mult(elem.value, calc.pow(x, elem.power)));
    //  //calc.zero(null, x);
    //});
    this.poly.map(elem => {
      console.log(elem);
      calc.mult(elem.value, calc.pow(x, elem.power));
    });
    console.log(this.poly);
    return this.poly;
  }

}