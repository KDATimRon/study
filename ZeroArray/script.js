// [0,0,0,0]
// [0,0,0,1]
// [0,0,0,2]
// ...
// [9,9,9,9]

//стартовое значение для первого варианта
//let chislo = 0;

//стартовое значение для второго варианта
let chislo = 10000;

function addLeadingZeros(num, countZero) {
  let str = num.toString();
  while (str.length < countZero) {
    str = '0' + str;
  }
  return str;
}

document.querySelector('.btn').addEventListener('click', () => {
  //     первый вариант через функцию addLeadingZeros
  //   let result = addLeadingZeros(chislo, 4);
  //   result = result.split('').map((items) => +items);
  // второй вариант без функции в одну строку
  let result = chislo
    .toString()
    .split('')
    .map((item) => +item);
  result.shift();
  chislo++;
  console.log(result);
});
