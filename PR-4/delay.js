const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

//delay(2000).then(() => {
//  console.log('Всё сделаль');
//});

console.log('Start');
setTimeout(() => {
  console.log('timer 1');
  setTimeout(() => {
    console.log('timer 2');
  }, 0);
}, 0);

setTimeout(() => {
  console.log('timer 3');
}, 0);

console.log('End');
