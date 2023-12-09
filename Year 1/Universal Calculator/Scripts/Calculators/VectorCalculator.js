class VectorCalculator extends RealCalculator{
  add(a, b) { 
    return new Vector(a.values.map((elem, i) => super.add(elem, b.values[i])));
  }
  sub(a, b) { 
    return new Vector(a.values.map((elem, i) => super.sub(elem, b.values[i])));
  }
  mult(a, b) { 
    return new Vector([
      super.sub(super.mult(a.values[1], b.value[2]), super.mult(a.values[2], b.values[1])),
      super.sub(super.mult(a.values[2], b.value[0]), super.mult(a.values[0], b.values[2])),
      super.sub(super.mult(a.values[0], b.value[1]), super.mult(a.values[1], b.values[0]))
    ]); 
  }
  div(a, b) { return null; }

  pow(a, n) { 
    // IMPLEMENT
    return null;
  }

  prod(a, p) {
    return new Vector(a.values.map(elem => super.prod(elem, p)));
  }

  one() { 
    // Implement
    return null;
  }

  zero(lenght) { 
    const values = [];
    for (let i = 0; i < lenght; i++)
      values.push(super.zero());
    return new Vector(values); 
  }
}