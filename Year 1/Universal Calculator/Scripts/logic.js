
function initialize() 
{
  const operandHandler = (event) => 
  {
    const calculator = new Calculator;
    const a = calculator.getValue(document.getElementById("input1").value);
    const b = calculator.getValue(document.getElementById("input2").value);
    const operand = event.target.dataset.operand;

    let result = calculator[operand](a, b);
    result = result==null ? "Undefined" : result;
    document.getElementById("result").value = result.toString();
  }

  const buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
    button.addEventListener('click', operandHandler);
  });

}
