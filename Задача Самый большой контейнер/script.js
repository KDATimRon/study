const message = document.querySelector('.message');
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const sourceArray = [1, 8, 6, 2, 5, 4, 8, 3, 4, 5];
const maxItem = Math.max(...sourceArray) + 1;
const chart = {
  width: 800,
  height: 500,
  padding: 50,
  get scale() {
    return Math.round(this.axisY / (maxItem + 2));
  },
  get axisY() {
    return this.height - this.padding;
  },
  get axisX() {
    return this.width - this.padding;
  },
  get Y0() {
    return this.axisY;
  },
  get X0() {
    return this.padding;
  },
};

canvas.width = chart.width;
canvas.height = chart.height;

ctx.fillStyle = 'white';
ctx.font = 'bold 12px serif';
ctx.lineWidth = 2.0;
ctx.beginPath();
ctx.moveTo(chart.padding, chart.padding);
ctx.lineTo(chart.padding, chart.axisY);
ctx.lineTo(chart.axisX, chart.axisY);
ctx.strokeStyle = 'orangered';
ctx.stroke();

let y = chart.Y0;
let x = chart.X0;
ctx.beginPath();
Array.from({ length: maxItem }).forEach((item, index) => {
  ctx.fillText(index, x - 15, y + 4);
  ctx.moveTo(x + 5, y);
  ctx.lineTo(x - 5, y);
  y -= chart.scale;
  ctx.stroke();
});

y = chart.Y0;
x = chart.X0;
ctx.beginPath();
ctx.lineWidth = 4.0;
ctx.strokeStyle = 'orangered';
sourceArray.forEach((item) => {
  ctx.fillText(item, x + chart.scale - 3, y + 20);
  x += chart.scale;
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - chart.scale * item);
  ctx.stroke();
});

function getChartVolume(obj) {
  let y = chart.Y0;
  let x = chart.X0 + chart.scale * (obj.x + 1);
  let w = chart.scale * obj.w;
  let h = chart.scale * obj.h;
  ctx.beginPath();
  ctx.fillStyle = 'rgba(53, 73, 252, 0.3)';
  ctx.rect(x, y, w, -h);
  ctx.fill();
}

function getMaxWaterVolume(array) {
  let maxArea = 0;
  let rect = {};
  let left = 0;
  let right = array.length - 1;
  while (left < right) {
    let minItem = Math.min(array[left], array[right]);
    let currentVolum = minItem * (right - left);
    if (maxArea < currentVolum) {
      maxArea = currentVolum;
      rect.x = left;
      rect.h = minItem;
      rect.w = right - left;
    }
    array[left] < array[right] ? left++ : right--;
  }
  getChartVolume(rect);
  return maxArea;
}

canvas.addEventListener('click', () => {
  message.innerHTML = `Максимальный контейнер содержит<br>${getMaxWaterVolume(
    sourceArray
  )} кубов воды`;
});
