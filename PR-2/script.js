let btnPanel = document.querySelector('.btn-panel');
let content = document.querySelector('.content');
let message = content.querySelector('h2');
let train = content.querySelector('.train');
let loco = content.querySelector('.loco');

let windowsTrain = content.querySelectorAll("[class^='window-']");
let input = windowsTrain[windowsTrain.length - 1].querySelector('#rez');
let windowArg = content.querySelectorAll('.center');

btnPanel.addEventListener('click', function () {
  btnPanel.classList.remove('anhide');
  btnPanel.classList.add('hide');
  content.classList.remove('hide');
  content.classList.add('start');

  train.classList.add('train-run');
  message.classList.add('show-mes');

  windowsTrain.forEach((items) => items.classList.add('hide'));
});

let getRandomInt = (max) => {
  let min = 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let createExample = (list) => {
  let oper = ['+', '-', '*', '/'];
  let strExample = '';
  for (let i = 0; i < list.length - 2; i++) {
    if (i % 2) {
      strExample += oper[getRandomInt(4) - 1];
    } else {
      strExample += getRandomInt(9);
    }
  }
  return strExample;
};

let gerArgWindowsTrain = (list) => {
  let strExp = createExample(list);
  for (let i = 0; i < list.length - 2; i++) {
    list[i].innerHTML = strExp[i];
  }
};

gerArgWindowsTrain(windowArg);

let toggetMessage = (show) => {
  if (show) {
    message.classList.remove('no-shown');
    message.classList.add('show-mes');
  } else {
    message.classList.remove('show-mes');
    message.classList.add('no-shown');
  }
};

loco.addEventListener('click', function () {
  for (let i = 0; i < windowsTrain.length; i++) {
    setTimeout(() => {
      windowsTrain[i].classList.remove('hide');
      windowsTrain[i].classList.add('shown');
    }, i * 200);
  }

  toggetMessage(false);
  input.removeAttribute('disabled');
  setTimeout(() => {
    toggetMessage(true);
    message.innerHTML = 'Решите пример и запишите ответ в окно последнего вагона';
  }, 4000);
});
