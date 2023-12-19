class Member {
  constructor(value = 0, power = 0) {
    this.value = value;
    this.power = power;
  }

  toString(){
    if(this.value == 0)
      return '0';
    if(this.power == 0)
      return this.value.toString();
    return `${this.value}^${this.power}`;
  }

}