/*5 лайфхаков при работе с массивами*/
console.log([2] + [1] - [2]); //19 - почему??

//Lafehack #1 - создаем пустой массив определенной длины
let emptyArray = Array.from({ length: 10 });
console.log(emptyArray);

//lafehack #2 - удаляем дубликаты из массива
let someArray = [1, 1, 5, 6, 8, 20, 68, 1, 6, 9, 4, 7, 4];
const arrayWithoutDubdey = [...new Set(someArray)]; //передаем массив в множество и сново разворачиваем в массив
console.log(arrayWithoutDubdey);

//lafehack #3 - быстрое удаление элемента из массива
let excludeElement = [...someArray.slice(0, 4), ...someArray.slice(6)];
console.log(someArray);
console.log(excludeElement);

//lafehack #4 нахождение последнего элемента массива
let lastElement1 = someArray.slice(-1)[0];
console.log(lastElement1);
let lastElement2 = someArray[someArray.length - 1];
console.log(lastElement2);

//lafehack #5 - обрезаем массив
someArray.length = 5;
console.log(someArray);
