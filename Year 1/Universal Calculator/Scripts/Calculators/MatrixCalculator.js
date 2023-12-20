class MatrixCalculator
{
  // TODO: It needs to work with complex numbers!! 

  constructor(calculator = new RealCalculator){
    calculator = calculator.constructor.name == "ComplexCalculator" ? new ComplexCalculator : new RealCalculator; 
    this.calculator = calculator;
  }

  add(a, b) { 
    return new Matrix(a.values.map(
      (arr, i) => arr.map((elem, j) => this.calculator.add(elem, b.values[i][j]))
      ));
  }
  sub(a, b) { 
    return new Matrix(a.values.map(
      (arr, i) => arr.map((elem, j) => this.calculator.sub(elem, b.values[i][j]))
      ));
  }
  mult(a, b) { 
    const length = a.values.length;
    let res = this.zero(length);
    for (let i = 0; i < length; i++){
      for (let j = 0; j < length; j++){
        let sum = this.calculator.zero();
        for(let k = 0; k < length; k++){
          sum = this.calculator.add(sum, this.calculator.mult(a.values[i][k], b.values[k][j]));
        }
        res.values[i][j] = sum;
      }
    }
    return res;
  }
  
  div(a, b) {
    // TODO 
    return null; 
  }

  pow(a, n) { 
    let res = new Matrix(a.values);
    for (let i = 1; i < n; i++) {
      res = this.mult(res, a);
    }
    return res; 
  }

  prod(a, p) {
    return new Matrix(a.values.map(
        arr => arr.map(elem => this.calculator.prod(elem, p))
      ));
  }

  one(length) { 
    const values = [];
    for (let i = 0; i < length; i++){
      values.push([]);
      for (let j = 0; j < length; j++){
        values[i][j] = i===j ? this.calculator.one() : this.calculator.zero();
      }
    }
    return new Matrix(values); 
  }

  zero(length) { 
    const values = [];
    for (let i = 0; i < length; i++){
      values.push([]);
      for (let j = 0; j < length; j++){
        values[i][j] = this.calculator.zero();
      }
    }
    return new Matrix(values); 
  }
}