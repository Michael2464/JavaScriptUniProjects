class MatrixCalculator extends RealCalculator{

  add(a, b) { 
    return new Matrix(a.values.map(
      (arr, i) => arr.map((elem, j) => super.add(elem, b.values[i][j]))
      ));
  }
  sub(a, b) { 
    return new Matrix(a.values.map(
      (arr, i) => arr.map((elem, j) => super.sub(elem, b.values[i][j]))
      ));
  }
  mult(a, b) { 
    const lenght = a.values.lenght;
    const c = this.zero(lenght);
    for (let i = 0; i < lenght; i++){
      for (let j = 0; j < lenght; j++){
        let sum = super.zero(lenght);
        for(let k = 0; k < lenght; k++){
          sum = super.add(sum, super.mult(a.values[i][k], b.values[k], [j]));
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
        arr => arr.map(elem => super.prod(elem, p))
      ));
  }

  one(lenght) { 
    const values = [];
    for (let i = 0; i < lenght; i++){
      values.push([]);
      for (let j = 0; j < lenght; j++){
        values[i][j] = i===j ? super.one() : super.zero();
      }
    }
    return new Matrix(values); 
  }

  zero(lenght) { 
    const values = [];
    for (let i = 0; i < lenght; i++){
      values.push([]);
      for (let j = 0; j < lenght; j++){
        values[i][j] = super.zero();
      }
    }
    return new Matrix(values); 
  }
}