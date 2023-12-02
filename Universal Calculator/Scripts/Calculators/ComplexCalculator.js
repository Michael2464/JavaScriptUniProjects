class ComplexCalculator extends RealCalculator {

  add(a, b)      { return new Complex(a.r + b.r, a.i + b.i); }
  sub(a, b)      { return new Complex(a.r - b.r, a.i - b.i); }
  multiply(a, b) { return a * b; }
  divide(a, b)   { return a / b; }
  pow(a, n)      { return Math.pow(a, n); }
  prod(a, p)     { return new Complex(a.r * p, a.i * p); }

  one()  { return new Complex(super.one()); }
  zero() { return new Complex(super.zero()); }

}

class Helicopter{

}

class Human extends Helicopter{
  
}