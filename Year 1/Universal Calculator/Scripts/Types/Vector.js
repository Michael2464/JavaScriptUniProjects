class Vector{
  constructor(values = []){
    this.values = values;
  }
  
  // Vector -> (1 2 3)
  toString(){
    return `(${this.values.map(el => el.toString()).join(' ')})`;
  }
}