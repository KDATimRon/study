const message = document.querySelector('.message');
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const tempArray = [5, 0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1, 5];

let maxElem = Math.max(...tempArray);

const chart = {
  width: 800,
  height: 400,
  padding: 50,
  scale: 50,
  get axisY() {
    return this.height - this.padding;
  },
  get axisX() {
    return this.width - this.padding;
  },
};

ctx.fillStyle = '#ff6347';
ctx.font = 'bold 12px serif';
ctx.lineWidth = 2.0; // толщина линии
ctx.moveTo(chart.padding, chart.padding);
ctx.lineTo(chart.padding, chart.axisY);
ctx.lineTo(chart.axisX, chart.axisY);
ctx.stroke(); // контур осей

let Y0 = chart.axisY; //начальные координаты
let X0 = chart.padding; //точка 0

Array(maxElem + 1).forEach((item, index) => {
  ctx.fillText(index, X0 - 15, Y0 - 20);
  ctx.moveTo(X0 + 5, Y0);
  ctx.lineTo(X0 - 5, Y0);
  Y0 -= chart.scale;
});

Y0 = chart.axisY;
X0 = chart.padding;

tempArray.forEach((item) => {
  ctx.fillText(item, X0 + 23, Y0 + 15);
  ctx.moveTo(X0, Y0 + 5);
  ctx.lineTo(X0, Y0 - 5);
  X0 += chart.scale;
  if (item > 0) {
    addRectToChart(X0, Y0, chart.scale, item);
  }
  ctx.stroke(); //контур засечек на осях
});

function addRectToChart(x, y, wh, count, color = '#ff6347') {
  ctx.fillStyle = color;
  ctx.fillRect(x + 1, y - 1, -wh, -wh * count);
}

function getMaxItemsArray(array, isReverse = false) {
  let newArr = [];
  let max = 0;
  if (isReverse) {
    array.reverse();
  }
  array.forEach((item) => {
    newArr.push(max);
    if (item >= max) max = item;
  });
  return isReverse ? newArr.reverse() : newArr;
}

const arr = [...tempArray]; //копия исходного массива
const maxLeftArray = getMaxItemsArray(arr);
const maxRightArray = getMaxItemsArray(arr, true);
const minItemsArray = maxLeftArray.map((item, index) => {
  return Math.min(item, maxRightArray[index]);
});

let volumeWaterArray = minItemsArray.map((item, index) => {
  let volume = item - tempArray[index];
  return volume >= 0 ? volume : 0;
});

function getChartWater() {
  let Y0 = chart.axisY;
  let X0 = chart.padding;

  volumeWaterArray.forEach((item, index) => {
    Y0 = chart.axisY;
    X0 += chart.scale;
    if (item > 0) {
      if (tempArray[index] !== 0) Y0 -= chart.scale * tempArray[index];
      addRectToChart(X0, Y0, chart.scale, item, 'blue');
    }
  });
}

function getVolumeWater1(array) {
  let maxLeft = 0;
  let maxRight = array[array.length - 1];
  let left = 0;
  let right = array.length - 1;
  let total = 0;
  while (left <= right) {
    if (maxLeft <= maxRight) {
      maxLeft = Math.max(maxLeft, array[left]);
      total += maxLeft - array[left];
      left++;
    } else {
      maxRight = Math.max(maxRight, array[right]);
      total += maxRight - array[right];
      right--;
    }
  }
  return total;
}

canvas.addEventListener('click', () => {
  getChartWater();
  message.innerHTML = `Всего ${getVolumeWater1(tempArray)} кубов воды`;
});
