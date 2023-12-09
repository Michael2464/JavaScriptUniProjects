class Vector{
  constructor(values = []){
    this.values = [];
    this.values.forEach(el => this.values.push(el));
  }
  
  // Vector -> (1 2 3)
  toString(){
    return `(${this.values.map(el => el.toString()).join(' ')})`;
  }
}