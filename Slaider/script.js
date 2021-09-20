let offset = 0;
let count = 0;
let width;
const slider = document.querySelector('.slaider');
const slaiderLine = slider.querySelector('.slaider-line');
const images = slaiderLine.querySelectorAll('img');

function init() {
  console.log('resize');
  width = slider.offsetWidth;
  slaiderLine.style.width = width * images.length + 'px';
  images.forEach((item) => {
    item.style.width = width + 'px';
    item.style.height = 'auto';
  });
  rollSlaider();
}
function rollSlaider() {
  slaiderLine.style.transform = `translate(-${count * width}px)`;
}

document.querySelector('.slaider-prev').addEventListener('click', () => {
  count--;
  if (count < 0) {
    count = images.length - 1;
  }
  rollSlaider();
});

document.querySelector('.slaider-next').addEventListener('click', () => {
  count++;
  if (count >= images.length) {
    count = 0;
  }
  rollSlaider();
});

window.addEventListener('resize', init);
init();
