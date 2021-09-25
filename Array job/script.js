function randItemsArray(min = -5, max = 5) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createArray(quantity) {
  let arr = [];
  for (let i = 0; i < quantity; i++) {
    arr[i] = randItemsArray(1, 10);
  }
  return arr;
}

let arr1 = createArray(10);
console.table(arr1);
// console.log(arr1.indexOf(5));
// console.log(arr1.includes(5));
// arr1.push(55, 100, 150);
// console.table(arr1);
// arr1.pop();
// console.table(arr1);
//max
let maxItem = arr1.reduce((max, item) => {
  if (item > max) {
    max = item;
  }
  return max;
});

console.log(maxItem);

const arr2 = [...arr1].sort((a, b) => a - b);
const arr3 = [...arr1].sort((a, b) => b - a);
console.log(arr1);
console.log(arr2);
console.log(arr3);
