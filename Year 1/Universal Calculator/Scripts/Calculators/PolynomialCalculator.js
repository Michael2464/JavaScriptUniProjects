class PolynomialCalculator {
  // TODO: pow 
  // Polynomial - string with 'x'

  // Turns string into array of Member classes
  getValue(str) {
    const arr = str.split(' ');
    const members = [];

    console.log(arr.length);
    for (let i = 0; i < arr.length; i++) {
      const digits = arr[i].split('x^');
      members.push(new Member(digits[0] - 0, (digits[1] == undefined ? 0 : digits[1]) - 0));
    }
    return this.polynomial(members);
  }

  polynomial(members) {
    return new Polynomial(members);
  }

  add(a, b) {
    const calc = new Calculator;
    const members = [];

    a.poly.forEach(elemA => {
      const member = b.poly.find(elemB => elemB.power === elemA.power);
      if (member)
        members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
      else
        members.push(new Member(elemA.value, elemA.power));
    });

    b.poly.forEach(elemB => {
      if (!members.find(elem => elem.power === elemB.power))
        members.push(new Member(elemB.value, elemB.power));
    })

    return new Polynomial(members);
  }

  sub(a, b) {
    const calc = new Calculator;
    const members = [];

    a.poly.forEach(elemA => {
      const member = b.poly.find(elemB => elemB.power === elemA.power);
      if (member)
        members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
      else
        members.push(new Member(elemA.value, elemA.power));
    });

    b.poly.forEach(elemB => {
      if (!members.find(elem => elem.power === elemB.power))
        members.push(new Member(calc.prod(elemB.value, -1), elemB.power));
    })

    return new Polynomial(members);
  }

  mult(a, b) {
    const calc = new Calculator;
    let polynomial = this.polynomial();
    a.poly.forEach(elemA => {
      const members = [];
      b.poly.forEach(elemB => {
        members.push(new Member(calc.mult(elemA.value, elemB.value), elemA.power + elemB.power));
      });
      polynomial = this.add(polynomial, this.polynomial(members));
    });

    return polynomial;
  }

  div(a, b) {
    return null;
  }

  prod(a, b) {
    const calc = new Calculator;
    const members = [];

    a.poly.forEach(elemA => {
      members.push(new Member(calc.prod(elemA.value, b), elemA.power));
    });

    return new Polynomial(members);
  }

  pow(a, n) {
    const poly = a;
    for (let i = 1; i < n; i++) {
      poly = this.mult(poly, a);
    }
    return poly;
  }

  // 0 -> 0x^0
  zero() {
    return new Polynomial([new Member]);
  }

  // 1 -> 1x^0
  one() {
    return new Polynomial([new Member(1)]);
  }

}