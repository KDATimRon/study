/*Пример работы промиса - отжимания и приседания
https://www.youtube.com/watch?v=84ZD-03Vf94
*/

const wringOutTime = 500;
const squattingTime = 200;

function wringOut(count) {
  return new Promise((resolve, reject) => {
    if (count > 100) {
      reject(new Error('Слишком много отжиманий'));
    }
    setTimeout(() => {
      resolve();
    }, count * wringOutTime);
  });
}

function squatting(count) {
  return new Promise((resolve, reject) => {
    if (count > 1000) {
      reject(new Error('Слишком много приседаний'));
    }
    setTimeout(() => {
      resolve();
    }, count * squattingTime);
  });
}
async function myTraining(wring, squat) {
  try {
    console.log('Start');
    await wringOut(wring);
    console.log(`отжался ${wring} раз`);
    await squatting(squat);
    console.log(`присел ${squat} раз`);
    return true;
  } catch (err) {
    console.log(`Устал не смогла :(. ${err.toString()}`);
    return false;
  }
}

myTraining(10, 20).then((result) => {
  console.log(result);
});
