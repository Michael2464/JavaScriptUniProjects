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

  zero(type, elem) {
    type = type ? type : elem ? elem.constructor.name : null;
    switch (type) {
      case 'Complex':
        return this.get(this.complex()).zero();
      case 'Vector':
        return this.get(this.vector()).zero(elem.values.length);
      case 'Matrix':
        return this.get(this.matrix()).zero(elem.values.length);
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

}