class ComplexCalculator extends RealCalculator {

  add(a, b) { return new Complex(a.r + b.r, a.i + b.i); }
  sub(a, b) { return new Complex(a.r - b.r, a.i - b.i); }
  multiply(a, b) {
    const complex = new Complex;
    complex.r = a.r * b.r - a.i * b.i;
    complex.i = a.r * b.i + a.i * b.r;
    return complex;
  }
  divide(a, b) { 
    const complex = new Complex;
    // to be implemented
    
    return -1; 
  }
  pow(a, n) { 
    const complex = new Complex(a.r, a.i);
    for(let i = 1; i < n; i++){
      complex = this.multiply(complex, a);
    }
    return complex; 
  }
  prod(a, p) { return new Complex(a.r * p, a.i * p); }

  one() { return new Complex(super.one(), super.zero()); }
  zero() { return new Complex(super.zero(), super.zero()); }

}