class MatrixCalculator
{
  constructor(calculator = new RealCalculator){
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
    const c = this.zero(length);
    for (let i = 0; i < length; i++){
      for (let j = 0; j < length; j++){
        let sum = this.calculator.zero();
        for(let k = 0; k < length; k++){
          sum = this.calculator.add(sum, this.calculator.mult(a.values[i][k], b.values[k][j]));
        }
        sum.values[i][j] = sum;
      }
    }
    return c;
  }
  div(a, b) { return null; }
  pow(a, n) { return Math.pow(a, n); }

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