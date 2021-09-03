let btnPlay = document.querySelector('.btn-panel');
let pageContent = document.querySelector('.content');
let shapes = pageContent.querySelectorAll('.shapes');
let inputArg = pageContent.querySelectorAll('.input-arg');
let inputSet = pageContent.querySelectorAll('input');

let getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let createArguments = function (shape, input) {
  let argument = getRandomInt(1, 9);
  for (let i = 0; i < argument; i++) {
    let element = document.createElement('div');
    shape.appendChild(element);
  }
  shape.classList.add('run');
  input.dataset.arg = argument;
  input.focus();
  return argument;
};

let checkingValue = async function (input, itemBlok) {
  if (input.value === input.dataset.arg) {
    itemBlok.classList.remove('error');
    itemBlok.classList.add('right-answer');
    input.setAttribute('disabled', 'disabled');
  } else {
    itemBlok.classList.add('error');
    input.value = '';
    await new Promise((resolve) => setTimeout(resolve, 300));
    itemBlok.classList.remove('error');
    itemBlok.focus();
  }
  itemBlok.classList.remove('run');
};

for (let i = 0; i < inputSet.length; i++) {
  inputSet[i].addEventListener('change', function () {
    checkingValue(inputSet[i], inputArg[i]);

    if (i !== inputSet.length - 1 && !inputArg[i].classList.contains('error')) {
      inputSet[i + 1].removeAttribute('disabled');
      inputSet[i + 1].focus();
    }
  });
}

btnPlay.addEventListener('click', function () {
  btnPlay.classList.add('hide');
  pageContent.classList.remove('hide');
  pageContent.classList.add('anhide');
  inputArg.forEach((item) => item.classList.add('run'));

  let arg1 = createArguments(shapes[0], inputSet[0]);
  let arg2 = createArguments(shapes[1], inputSet[1]);

  inputSet[2].dataset.arg = arg1 + arg2;

  setTimeout(() => {
    inputSet[0].removeAttribute('disabled');
    inputSet[0].focus();
  }, 6000);
});
