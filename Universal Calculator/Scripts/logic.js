function initialize() {

  const operandHandler = (event) => {
    const a = document.getElementById("input1").value;
    const b = document.getElementById("input2").value;
    const operand = event.target.dataset.operand;
    const arrA = a.split(' ');
    const arrB = b.split(' ');

    console.log(arrA, arrB);

    if (arrA.length === 1 && arrB.length === 1) {
      const calc = new RealCalculator;
      const result = calc[operand](a - 0, b - 0);
      document.getElementById("result").value = result;
    } else {
      const calc = new ComplexCalculator;

      console.log(calc);

      const result = calc[operand](
        new Complex(arrA[0] - 0, arrA[1] - 0),
        new Complex(arrB[0] - 0, arrB[1] - 0)
      );

      console.log(result);  

      document.getElementById("result")
        .value = `${result.re} ${result.im}`;
    }
  }

  const buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
    button.addEventListener('click', operandHandler);
  });

  const calc = new ComplexCalculator;
  console.log(calc.mult(new Complex(1, 0), new Complex(1, 0)));
  console.log(calc.div(new Complex(1, 0), new Complex(1, 0)));

}
