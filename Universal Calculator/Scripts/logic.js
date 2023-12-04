var realCalc = new RealCalculator;
function initialize() {

  var input1 = document.getElementById("input1");
  var input2 = document.getElementById("input2");
  var result = document.getElementById("result");
  var operation = document.getElementById("operation");
}

function calculateResult() {
  try {
    const num1 = input1.value - 0;
    const num2 = input2.value - 0;

    switch (operation.value) {
      case "+":
        result.innerHTML = realCalc.add(num1, num2);
        break;
      case "-":
        result.innerHTML = realCalc.sub(num1, num2);
        break;
      case "*":
        result.innerHTML = realCalc.multiply(num1, num2);
        break;
      case "/":
        result.innerHTML = realCalc.divide(num1, num2);
        break;
      case "^":
        result.innerHTML = realCalc.pow(num1, num2);
        break;
    }
  }
  catch(e){
    console.log(e)
  }

}