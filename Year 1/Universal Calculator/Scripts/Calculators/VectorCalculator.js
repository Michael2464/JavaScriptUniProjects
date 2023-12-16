class VectorCalculator
{
  constructor(calculator = new RealCalculator){
    this.calculator = calculator;
  }

  add(a, b) { 
    return new Vector(a.values.map((elem, i) => this.calculator.add(elem, b.values[i])));
  }
  sub(a, b) { 
    return new Vector(a.values.map((elem, i) => this.calculator.sub(elem, b.values[i])));
  }
  mult(a, b) { 
    return new Vector([
      this.calculator.sub(this.calculator.mult(a.values[1], b.value[2]), this.calculator.mult(a.values[2], b.values[1])),
      this.calculator.sub(this.calculator.mult(a.values[2], b.value[0]), this.calculator.mult(a.values[0], b.values[2])),
      this.calculator.sub(this.calculator.mult(a.values[0], b.value[1]), this.calculator.mult(a.values[1], b.values[0]))
    ]); 
  }
  div(a, b) { return null; }

  pow(a, n) { 
    // IMPLEMENT
    return null;
  }

  prod(a, p) {
    return new Vector(a.values.map(elem => this.calculator.prod(elem, p)));
  }

  one() { 
    // Implement
    return null;
  }

  zero(lenght) { 
    const values = [];
    for (let i = 0; i < lenght; i++)
      values.push(this.calculator.zero());
    return new Vector(values); 
  }
}