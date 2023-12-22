class Polynomial {
  constructor(poly = []) {
    this.poly = poly;
    //this.poly.sort((a, b) => b.power - a.power); // what for?
  }

  addValue(value) {
    this.poly.push(value);
  }

  getValue(x) {
    // The structure is value*x^power, find the result (sum of those)
    const calc = new Calculator;
    let result = calc.zero(null, x);

    for (let i = 0; i < this.poly.length; i++) 
    {
      let m = calc.mult(this.poly[i].value,
        calc.pow(x, this.poly[i].power));
      result = calc.add(result, m);
    }
    return result;
  }

  toString() {
    let str = this.poly[0].toString();
    for (let i = 1; i < this.poly.length; i++) {
      str += this.poly[i].toString();
    }
    return str;
  }

}