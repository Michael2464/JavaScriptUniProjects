
function initialize() {
  const operandHandler = (event) => {
    const calculator = new Calculator;
    const a = calculator.getValue(document.getElementById("input1").value);
    const b = calculator.getValue(document.getElementById("input2").value);

    const operand = event.target.dataset.operand;
    console.log(operand);
    
    let result = calculator[operand](a, b);
    result = result == null ? "Undefined" : result;
    document.getElementById("result").value = result.toString();
  }

  const buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
    button.addEventListener('click', operandHandler);
  });

  // For polynomials
  const operandHandlerP = (event) => {
    const calculator = new PolynomialCalculator;
    const a = calculator.getValue(document.getElementById("input1P").value);
    const b = calculator.getValue(document.getElementById("input2P").value);
    const operand = event.target.dataset.operand;

    let result = calculator[operand](a, b);
    result = result == null ? "Undefined" : result;
    document.getElementById("resultP").value = result.toString();
  };

  const buttonsP = document.querySelectorAll(".optionP");
  buttonsP.forEach(buttonsP => {
    buttonsP.addEventListener('click', operandHandlerP);
  });

  // Polynomial result in the point
  const operandHandlerNumX = (event) => {
    const calc = new PolynomialCalculator;
    const number = document.getElementById("numberX");
    let polyStr = document.getElementById("resultP").value;
    const result = document.getElementById("resultPX");

    /*
      Because of the implementation of Member.getValue, 
      strings are like ' +3x^4...', so when the method .split(' ')
      gets called, array becomes 1 element more then it should be
      Thus breaking everything. Solution: remove the first space 
      if it is present 
    */
    if(polyStr[0] == ' '){
      polyStr = polyStr.slice(1, polyStr.length);
    }

    let poly = calc.getValue(polyStr);
    result.value = poly.getValue(number.value-0).toString();
  };
  const calcButton = document.getElementById("calculate");
  calcButton.addEventListener('click', operandHandlerNumX);

}
