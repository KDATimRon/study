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
  wrapper.animate({ opacity: 0 });

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

let createAbcBlock = async () => {
  let tempAbc = document.querySelector('#temp-abc').content;
  let blockAbc = tempAbc.querySelector('.letter');
  abc.animate({ opacity: 1 }, 1500);

  for (let i = 0; i < arrAbc.length; i++) {
    let newEl = blockAbc.cloneNode(true);
    let newImg = newEl.querySelector('img');
    newImg.src = `img/lit-${i + 1}.png`;
    newEl.dataset.litter = arrAbc[i];

    abc.append(newEl);
    await $(newEl).addClass('scale').promise();
  }
  let letter = $('.letter');
  setInterval(async () => {
    let index = Math.floor(Math.random() * letter.length);
    $(letter[index]).addClass('rotate');

    await new Promise((resolve) => setTimeout(resolve, 1000));

    $(letter[index]).removeClass('scale rotate');
  }, 5000);
  onEventElement();
};

createPictures(setImages, 6);

btnRun.on('click', (event) => {
  $(event.target).fadeOut(1000);
  picWrapper.animate({ opacity: 1 }, 1500);

  showPictures();
});

let onEventElement = () => {
  let arrBlockDrag = document.querySelectorAll('.letter');
  for (let i = 0; i < arrBlockDrag.length; i++) {
    getDragDropElement(arrBlockDrag[i]);
  }
};

let getDragDropElement = (element) => {
  let currentDroppable = null;

  element.classList.remove('scale');

  element.onmousedown = (event) => {
    //let shiftX = event.clientX - element.getBoundingClientRect().left;
    //let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.cssText = 'position: absolute; z-index: 100;';
    /* document.body.append(element);*/

    moveAt(event.pageX, event.pageY);

    function moveAt(pageX, pageY) {
      element.style.left = pageX - 370 + 'px';
      element.style.top = pageY - 55 + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);

      element.hidden = true;
      let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
      element.hidden = false;

      if (!elemBelow) return;

      let droppableBelow = elemBelow.closest('.drag-block');
      if (currentDroppable != droppableBelow) {
        if (currentDroppable) {
          // null если мы были не над droppable до этого события
          // (например, над пустым пространством)
          leaveDroppable(currentDroppable);
        }
        currentDroppable = droppableBelow;
        if (currentDroppable) {
          // null если мы не над droppable сейчас, во время этого события
          // (например, только что покинули droppable)
          enterDroppable(currentDroppable, element);
        }
      }
    }

    document.addEventListener('mousemove', onMouseMove);

    element.onmouseup = function () {
      document.removeEventListener('mousemove', onMouseMove);
      element.onmouseup = null;
    };
  };
  function enterDroppable(elem, litter) {
    console.log(elem.dataset.litter);
    console.log(litter.dataset.litter);
    if (elem.dataset.litter === litter.dataset.litter) {
      elem.style.cssText = 'background: rgb(179 231 100);';
    } else {
      elem.style.cssText = 'background: rgb(255 100 114);';
    }
  }

  function leaveDroppable(elem) {
    elem.style.background = '';
  }
  element.ondragstart = () => false;
};
