const message = document.querySelector('.message');
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const sourceArray = [7, 1, 5, 3, 6, 4, 3, 7, 2];
const maxItem = Math.max(...sourceArray) + 1;
const chart = {
  width: 800,
  height: 500,
  padding: 50,
  get scale() {
    return Math.round(this.axisY / maxItem - 5);
  },
  get axisY() {
    return this.height - this.padding;
  },
  get axisX() {
    return this.width - this.padding - 50;
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
ctx.strokeStyle = 'white';
ctx.stroke();

function drawAxisY(x, y, padding) {
  ctx.beginPath();
  ctx.font = 'bold 15px serif';
  ctx.fillText('Price', padding - 10, padding - 10);

  ctx.beginPath();
  ctx.font = 'bold 12px serif';
  Array.from({ length: maxItem }).forEach((item, index) => {
    ctx.fillText(index, x - 15, y + 4);
    ctx.moveTo(x + 5, y);
    ctx.lineTo(x - 5, y);
    y -= chart.scale;
    ctx.stroke();
  });
}

function drawAxisX(x, y, padding) {
  ctx.beginPath();
  ctx.font = 'bold 15px serif';
  ctx.fillText('Days', chart.axisX + 10, padding + 5);

  ctx.beginPath();
  ctx.font = 'bold 12px serif';
  sourceArray.forEach((item, index) => {
    ctx.fillText(index + 1, x + chart.scale - 3, y + 20);
    x += chart.scale;
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x, y + 5);
    ctx.stroke();
  });
}

function drawChart(array, x, y, scale) {
  let index = 0;
  ctx.fillStyle = 'chartreuse';
  ctx.strokeStyle = 'chartreuse';
  while (index < array.length + 1) {
    drawArcChart(x + scale * (index + 1), y - scale * array[index]);
    ctx.beginPath();
    ctx.moveTo(x + scale * (index + 1), y - scale * array[index]);
    index++;
    ctx.lineTo(x + scale * (index + 1), y - scale * array[index]);
    ctx.stroke();
  }
}
function drawArcChart(x, y, color = 'chartreuse') {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 5, 0, 2 * Math.PI);
  ctx.fill();
}

function getMaxProfit(array, x, y, scale) {
  let minPrice = array[0];
  let maxProfit = 0;
  let minIndex, maxIndex;
  let maxItem;
  array.forEach((item, index) => {
    if (minPrice > item) {
      minPrice = item;
      minIndex = index;
    }
    if (item - minPrice > maxProfit) {
      maxProfit = item - minPrice;
      maxItem = item;
      maxIndex = index;
    }
  });
  drawArcChart(x + scale * (minIndex + 1), y - scale * minPrice, 'green');
  drawArcChart(x + scale * (maxIndex + 1), y - scale * maxItem, 'red');
  return maxProfit;
}

drawAxisY(chart.X0, chart.Y0, chart.padding);
drawAxisX(chart.X0, chart.Y0, chart.Y0);
drawChart(sourceArray, chart.X0, chart.Y0, chart.scale);

$(canvas).on('click', () => {
  let rezult = getMaxProfit(sourceArray, chart.X0, chart.Y0, chart.scale);
  $(message).text(`Максимальный профит - ${rezult}`);
});
