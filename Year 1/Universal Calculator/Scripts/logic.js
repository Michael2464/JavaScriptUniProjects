function getComplex(value) {
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

function getValue(value) {
  return getComplex(value) || (value - 0);
}

function toString(value) {
  if (value instanceof Complex) {
    let str = '';
    if (value.im < 0) {
      value.im *= -1;
      str = `${value.re} - ${value.im}i`;
    } else {
      str = `${value.re} + ${value.im}i`;
    }
    return str;
  }
  return value.toString();
}

function initialize() {

  const operandHandler = (event) => {
    const a = getValue(document.getElementById("input1").value);
    const b = getValue(document.getElementById("input2").value);
    const operand = event.target.dataset.operand;
    const calc = (a instanceof Complex) ? new ComplexCalculator : new RealCalculator;

    let result = calc[operand](a, b);
    document.getElementById("result").value = toString(result);
  }

  const buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
    button.addEventListener('click', operandHandler);
  });

}
