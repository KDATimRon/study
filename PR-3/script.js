let setImages = {
  tree: 'дерево',
  iron: 'утюг',
  dog: 'собака',
  mittens: 'варежки',
  cabbage: 'капуста',
  watermelon: 'арбуз',
  flower: 'цветок',
  plate: 'тарелка',
  umbrella: 'зонд',
  shorts: 'шорты',
  car: 'машина',
  apple: 'яблоко',
  frog: 'лягушка',
  watch: 'часы',
  threads: 'нитки',
  butterfly: 'бабочка',
  sock: 'носок',
  icecream: 'мороженое',
  raccoon: 'енот',
  train: 'поезд',
  fridge: 'холодильник',
  pear: 'груша',
  brush: 'щетка',
  skirt: 'юбка',
  beatle: 'жук',
  apron: 'фартук',
  indian: 'индеец',
  christmastree: 'ёлка',
  excavator: 'экскаватор',
  fish: 'рыба',
};

let btnRun = $('.big-button');
let picWrapper = $('.pic-wrapper');
let abc = $('.abc');

let tempWrapper = document.querySelector('#temp-wrapper').content;
let itemWrapper = tempWrapper.querySelector('.wrapper');

let getImageRandom = (obj, count) => {
  let setObj = new Set();
  let keys = Object.keys(obj);
  while (count !== setObj.size) {
    let newArrImg = Math.floor(Math.random() * keys.length);
    setObj.add(keys[newArrImg]);
  }
  return setObj;
};
let showPictures = async () => {
  let wrapper = $('.wrapper');
  /*let picBlock = $('.pic-block');
  let dragBlock = $('.drag-block');
  picBlock.animate({ opacity: 0 });
  dragBlock.animate({ opacity: 0 });*/
  wrapper.animate({ opacity: 0 });

  /*wrapper.each((i, item) => {
    setTimeout(() => {
      $(item).animate({ opacity: 1 }, 2000);
    }, i * 800);
  });
  setTimeout(() => {
    createAbcBlock();
  }, 5000);*/

  for (let i = 0; i < wrapper.length; i++) {
    await $(wrapper[i]).animate({ opacity: 1 }, 500).promise();
  }
  createAbcBlock();
};

let createPictures = (Obj, count) => {
  let setObj = getImageRandom(Obj, count);
  for (let value of setObj) {
    let newEl = itemWrapper.cloneNode(true);
    let newImg = newEl.querySelector('img');
    let dragBlock = newEl.querySelector('.drag-block');
    dragBlock.dataset.litter = Obj[value][0];
    newImg.src = `img/${value}.jpg`;
    picWrapper.append(newEl);
  }
};

let createAbcBlock = () => {
  let arrAbc = [
    'а',
    'б',
    'в',
    'г',
    'д',
    'е',
    'ё',
    'ж',
    'з',
    'и',
    'й',
    'к',
    'л',
    'м',
    'н',
    'о',
    'п',
    'р',
    'с',
    'т',
    'у',
    'ф',
    'х',
    'ц',
    'ч',
    'ш',
    'щ',
    'ъ',
    'ы',
    'ь',
    'э',
    'ю',
    'я',
  ];
  let tempAbc = document.querySelector('#temp-abc').content;
  let blockAbc = tempAbc.querySelector('.letter');
  abc.animate({ opacity: 1 }, 1500);

  for (let i = 0; i < arrAbc.length; i++) {
    let newEl = blockAbc.cloneNode(true);
    let newImg = newEl.querySelector('img');
    newImg.src = `img/lit-${i + 1}.png`;
    newEl.dataset.litter = arrAbc[i];
    abc.append(newEl);
  }
};

createPictures(setImages, 6);

btnRun.on('click', (evt) => {
  $(evt.target).fadeOut(1000);
  picWrapper.animate({ opacity: 1 }, 1500);

  showPictures();
});
