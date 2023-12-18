class PolynomialCalculator
{
  // TODO: Prod, zero, 
  // Polynomial - string with 'x'
  // Mnogochlen - string with 'x^q'

  polynomial(members) {
    return new Polynomial(members);
  }

  add(a, b){
    const calc = new Calculator;
    const members = [];

    a.poly.forEach(elemA => {
      const member = b.poly.find(elemB => elemB.power === elemA.power);
      if(member)
        members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
      else
        members.push(new Member(elemA.power, elemB.power));
    });

    b.poly.forEach(elemB => {
      if(!members.find(elem=>elem.power===elemB.power))
        members.push(new Member(elemB.value, elemB.power));
    })

    return new Polynomial(members);
  }

  mult(a, b){
    const calc = new Calculator;
    let polynomial = new Polynomial;

    a.poly.forEach(elemA => {
      const members = [];
      b.poly.forEach(elemB => {
        members.push(new Member(calc.mult(elemA.value, elemB.value), elemA.power + elemB.power));
      })
      polynomial = this.add(polynomial, new Polynomial(members));
    })

    b.poly.forEach(elemB => {
      if(!members.find(elem => elem.power===elemB.power))
        members.push(new Member(elemB.value, elemB.power));
    })

    return new Polynomial(members);
  }

}