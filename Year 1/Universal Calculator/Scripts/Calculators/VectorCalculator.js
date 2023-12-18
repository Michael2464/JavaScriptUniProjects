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
      this.calculator.sub(this.calculator.mult(a.values[1], b.values[2]), this.calculator.mult(a.values[2], b.values[1])),
      this.calculator.sub(this.calculator.mult(a.values[2], b.values[0]), this.calculator.mult(a.values[0], b.values[2])),
      this.calculator.sub(this.calculator.mult(a.values[0], b.values[1]), this.calculator.mult(a.values[1], b.values[0]))
    ]); 
  }
  div(a, b) { return null; }

  pow(a, n) { 
    const vec = new Vector(a.values);
    for(let i = 0; i < n; i++)
      vec = this.mult(vec, vec);
    return vec;
  }

  prod(a, p) {
    return new Vector(a.values.map(elem => this.calculator.prod(elem, p)));
  }

  one(length) { 
    const values = [];
    for (let i = 0; i < length; i++)
      values.push(this.calculator.one());
    return new Vector(values);
  }

  zero(length) { 
    const values = [];
    for (let i = 0; i < length; i++)
      values.push(this.calculator.zero());
    return new Vector(values); 
  }
}