function getComplex(value) {
  // TODO: Should work without spaces at all
  // TODO: 2 + i !!!! When i is single, it will probably break
  const arr = value.split(' ');
  
  if (arr.length == 2) {
    const a = arr[0];
    let b = arr[1];
    b = b.replace('i', '');
    return new Complex(a - 0, b - 0);
  }
  if (arr.length == 3) {
    const a = arr[0];
    let b = arr[1] + arr[2];
    b = b.replace('i', '');
    return new Complex(a - 0, b - 0);
  }
  return null;
}

function getVector(str)
{
  if(str instanceof Array)
    return new Vector(str);

  if(str && typeof str === 'string')
  {
    const arr = str.replace('(', '').replace(')', '').split(' ').map(el => this.getValue(el));
    return new Vector(arr);
  }
  return null;
}

function getMatrix(str)
{
  if(str instanceof Array)
    return new Matrix(str);

  if(str && typeof str === 'string')
  {
    const arr = str.split('\n');
    const value = [];

    for(let i = 0; i < arr.length; i++)
      value.push(arr[i].split(', ').map(el => this.getValue(el)));
    
    if(value[0] instanceof Array) 
      return new Matrix(value);
  }
  return null;
}

function getValue(str) 
{
  if(str.includes('(')) 
    return getVector(str);

  if(str.includes('i')) 
    return getComplex(str);

  if(str.includes('\n')) 
    return getMatrix(str);

  return str - 0;
}

function getCalculator(value)
{
  if(value instanceof Vector)
    return new VectorCalculator;

  if(value instanceof Complex)
    return new ComplexCalculator;

  if(value instanceof Matrix)
    return new MatrixCalculator;

  return new RealCalculator;
}

function initialize() 
{
  const operandHandler = (event) => 
  {
    const a = getValue(document.getElementById("input1").value);
    const b = getValue(document.getElementById("input2").value);
    const operand = event.target.dataset.operand;
    const calc = getCalculator(a);

    let result = calc[operand](a, b);
    document.getElementById("result").value = result.toString();
  }

  const buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
    button.addEventListener('click', operandHandler);
  });

}
