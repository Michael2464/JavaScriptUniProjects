class Matrix{
  constructor(values = [[]]){
    this.values = [];
    for(let i = 0; i < values.length; i++){
      this.values[i] = [];
      for(let j = 0; j < values.length; j++)
        this.values[i][j] = values[i][j];
    }
  }

  /*
    1, 2, 3
    4, 5, 6 
    7, 8, 9 
  */
  toString(){
    return this.values.map(arr => arr.map(el => el.toString()).join(', ')).join('\n');
  }

}