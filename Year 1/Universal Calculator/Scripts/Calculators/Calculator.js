class Calculator {
  complex(re, im) {
    return new Complex(re, im);
  }
  vector(values) {
    return new Vector(values);
  }
  matrix(values) {
    return new Matrix(values);
  }

  get(elem) {
    if (elem instanceof Matrix)
      return new MatrixCalculator(this.get(elem.values[0][0]));
    if (elem instanceof Vector)
      return new VectorCalculator(this.get(elem.values[0]));
    if (elem instanceof Complex)
      return new ComplexCalculator;
    return new RealCalculator;
  }

  // Add other methods
  add(a, b) {
    return this.get(a).add(a, b);
  }
  sub(a, b) {
    return this.get(a).sub(a, b);
  }
  mult(a, b) {
    return this.get(a).mult(a, b);
  }
  div(a, b) {
    return this.get(a).div(a, b);
  }
  prod(a, b) {
    return this.get(a).prod(a, b);
  }
  pow(a, b) {
    return this.get(a).pow(a, b);
  }

  zero(type, elem) {
    type = type ? type : elem ? elem.constructor.name : null;
    switch (type) {
      case 'Complex':
        return this.get(this.complex()).zero();
      case 'Vector':
        return this.get(elem.zero(elem.values.length));
      case 'Matrix':
        return this.get(elem.zero(elem.values.length));
      default:
        return this.get().zero();
    }
  }

  one(type, elem) {
    type = type ? type : elem ? elem.constructor.name : null;
    switch (type) {
      case 'Complex':
        return this.get(this.complex()).one();
      case 'Vector':
        return this.get(this.vector()).one(elem.values.length);
      case 'Matrix':
        return this.get(this.matrix()).one(elem.values.length);
      default:
        return this.get().one();
    }
  }

  getComplex(value) {
    // TODO: must work with 'x*i'  
    // TODO: must work with 'x+ yi'

    const arr = value.split(' ');

    if (arr.length == 1) {
      // 3+3i
      let operInd = arr[0].indexOf('-') == -1 ? 
          arr[0].indexOf('+') : 
          arr[0].indexOf('-');
      let oper = arr[0].slice(operInd, operInd+1);

      const compl = arr[0].split(oper);
      compl[1] = compl[1].replace('i', '');
      compl[1] = compl[1] == '' ? compl[1] = '1' : compl[1];
      return new Complex(compl[0]-0, oper=='-' ? -compl[1]-0 : compl[1]-0);
    }
    if (arr.length == 2) {
      const a = arr[0];
      let b = arr[1];
      b = b.replace('i', '');
      return new Complex(a - 0, b - 0);
    }
    if (arr.length == 3) {
      const a = arr[0];
      let b = arr[1] + arr[2];
      b = b.replace('i', '');
      return new Complex(a - 0, b - 0);
    }
    return null;
  }

  getVector(str) {
    if (str instanceof Array)
      return new Vector(str);

    if (str && typeof str === 'string') {
      const arr = str.replace('(', '').replace(')', '')
        .split(' ').map(el => this.getValue(el));
      return new Vector(arr);
    }
    return null;
  }

  getMatrix(str) {
    if (str instanceof Array) {
      return new Matrix(str);
    }

    if (str && typeof str === 'string') {
      const arr = str.split('\n');
      const values = [];

      for (let i = 0; i < arr.length; i++) {
        values.push(arr[i].split(',').map(el => {
          // If the string is like: ' 1 + 3i', it removes first space
          // thus giving us the needed string 
          el = el[0] == ' ' ? el.slice(1, el.length) : el;
          return this.getValue(el);
        }));
      }

      if (values[0] instanceof Array) {
        return new Matrix(values);
      }
    }
    return null;
  }

  getValue(str) {
    if (str.includes('(')) {
      return this.getVector(str);
    }
    else if (str.includes('\n')) {
      return this.getMatrix(str);
    }
    else if (str.includes('i')) {
      return this.getComplex(str);
    }

    return str - 0;
  }

}