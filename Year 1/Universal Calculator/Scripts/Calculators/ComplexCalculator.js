class ComplexCalculator 
{
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
    const res = this.one();
    for (let i = 0; i < n; i++) {
      res = this.mult(res, a);
    }
    return res;
  }

  prod(a, p) { 
    return new Complex(a.re * p, a.im * p); 
  }

  one() { 
    return new Complex(this.calculator.one()); 
  }
  zero() { return new Complex; }

}