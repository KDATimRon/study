const message = document.querySelector('.message');
const canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const brickWall = {
  widths: [
    [1, 2, 2, 1],
    [3, 1, 2],
    [1, 3, 2],
    [2, 4],
    [3, 1, 2],
    [1, 3, 1, 1],
  ],
  hight: 50,
  padding: 50,
  get countY() {
    return this.widths.length;
  },
  get countX() {
    return this.widths[0].reduce((sum, items) => (sum += items), 0);
  },
  get axisY() {
    return this.countY * this.hight + this.padding * 2;
  },
  get axisX() {
    return this.countX * this.hight + this.padding * 2;
  },
};

function drawAxisXY(x, y) {
  canvas.width = x;
  canvas.height = y;

  ctx.fillStyle = 'chocolate';
  ctx.font = 'bold 12px serif';
  ctx.lineWidth = 2.0;
}

function drawAxisY(count, x, y, height) {
  ctx.beginPath();
  for (let i = count; i > 0; i--) {
    ctx.fillText(i, x - 15, y - 20);
    y -= height;
  }
}

function drawAxisX(count, x, y, height) {
  ctx.beginPath();
  for (let i = 0; i <= count; i++) {
    ctx.fillText(i, x - 6, y + 20);
    x += height;
  }
}

function drawBrickWall(array, hight, padding) {
  array.forEach((item, index) => {
    let y0 = (index + 1) * hight;
    let x0 = padding;
    let h = hight;
    ctx.beginPath();
    ctx.strokeStyle = 'chocolate';
    item.forEach((element) => {
      let w = hight * element;
      ctx.rect(x0, y0, w - 5, h - 5);
      ctx.stroke();
      x0 += w;
    });
  });
}

function drawLine(yh, hight, count) {
  let x = hight * (count + 1);
  let y = hight;
  let h = yh * hight;
  ctx.beginPath();
  ctx.fillStyle = 'rgba(28,211,162,0.5)';
  ctx.rect(x - 8, y - 5, 11, h + 5);
  ctx.fill();
}

function leastBricks(wall) {
  let map = {};
  let max = 0;
  wall.forEach((row) => {
    let sum = 0;
    for (let i = 0; i < row.length - 1; i++) {
      sum += row[i];
      map[sum] = map[sum] ? map[sum] + 1 : 1;
      max = Math.max(map[sum], max);
    }
  });
  drawLine(wall.length, brickWall.hight, max);
  return wall.length - max;
}

drawAxisXY(brickWall.axisX, brickWall.axisY);
drawAxisY(
  brickWall.countY,
  brickWall.padding,
  brickWall.axisY - brickWall.padding,
  brickWall.hight
);
drawAxisX(
  brickWall.countX,
  brickWall.padding,
  brickWall.axisY - brickWall.padding,
  brickWall.hight
);
drawBrickWall(brickWall.widths, brickWall.hight, brickWall.padding);

$(canvas).on('click', () => {
  $(message).text(`Минимум - ${leastBricks(brickWall.widths)} кирпича`);
});
