class ComplexCalculator 
{
  // TODO: Update methods
  
  add(a, b) { return new Complex(a.re + b.re, a.im + b.im); }
  sub(a, b) { return new Complex(a.re - b.re, a.im - b.im); }

  mult(a, b) {
    const complex = new Complex(a.re * b.re - a.im * b.im,
      a.re * b.im + a.im * b.re);
    return complex;
  }
  div(a, b) {
    const m = b.re * b.re + b.im * b.im;
    return new Complex(
      (a.re * b.re + a.im * b.im) / m,
      (a.im * b.re - a.re * b.im) / m
    );
  }

  pow(a, n) {
    const complex = new Complex(a.re, a.im);
    for (let i = 1; i < n; i++) {
      complex *= this.prod(complex, a);
    }
    return complex;
  }

  prod(a, p) { return new Complex(a.re * p, a.im * p); }

  one() { return new Complex(super.one()); }
  zero() { return new Complex; }

}