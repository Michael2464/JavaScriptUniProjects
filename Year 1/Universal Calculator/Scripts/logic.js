function initialize() {

  const operandHandler = (event) => {
    const a = document.getElementById("input1").value;
    const b = document.getElementById("input2").value;
    const operand = event.target.dataset.operand;

    const arrA = a.split(' ');
    const arrB = b.split(' ');

    console.log(arrA);

    if (arrA.length === 1 && arrB.length === 1) {
      const calc = new RealCalculator;
      const result = calc[operand](a - 0, b - 0);
      document.getElementById("result").value = result;
    } else {
      const calc = new ComplexCalculator;
      
      // If 'num', 'operator', 'num' then concatenate into one
      let imA = arrA.length === 3 ? arrA[1]+arrA[2] : arrA[1];
      imA = imA.replace('i', '');
      let imB = arrB.length === 3 ? arrB[1]+arrB[2] : arrB[1];
      imB = imB.replace('i', '');
      
      console.log(imA);

      const result = calc[operand](
        new Complex(arrA[0] - 0, imA - 0),
        new Complex(arrB[0] - 0, imB - 0)
      );

      let str = '';
      if(result.im < 0) {
        result.im *= -1;
        str = `${result.re} - ${result.im}i`;
      } 
      else {
        str = `${result.re} + ${result.im}i`;
      }
      document.getElementById("result").value = str;

    }
  }

  const buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
    button.addEventListener('click', operandHandler);
  });

}
