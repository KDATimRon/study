const main = document.querySelector('main');
const dropContainers = main.querySelectorAll('.drop-container');
const dragList = main.querySelectorAll('.elenet-drag');

let offsetX, offsetY;
dragList.forEach((elementDrag, index) => {
  let box = elementDrag.getBoundingClientRect();
  let coord = {};
  coord.left = box.x;
  coord.top = box.y;
  console.log(coord);
  elementDrag.setAttribute('draggable', true);
  elementDrag.addEventListener('dragstart', (event) => {
    offsetX = event.offsetX;
    offsetY = event.offsetY;
    event.dataTransfer.setData('id', index);
  });
});
dropContainers.forEach((dropContainer) => {
  dropContainer.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  dropContainer.addEventListener('dragenter', (event) => {
    dropContainer.style.background = 'rgba(45, 2, 101, 0.5)';
  });
  dropContainer.addEventListener('dragleave', (event) => {
    dropContainer.style.background = '';
  });

  dropContainer.addEventListener('drop', (event) => {
    let id = event.dataTransfer.getData('id');
    dropContainer.appendChild(dragList[id]);
  });
});
