class Complex{

  constructor(re = 0, im = 0){
    this.re = re;
    this.im = im;
  }

  // Complex -> 2 + 3i
  toString(){
    if (this.im < 0)
      return `${this.re} - ${-this.im}i`;
    if (this.im > 0)
      return `${this.re} + ${this.im}i`;
    else
      return this.re.toString();
  }

}