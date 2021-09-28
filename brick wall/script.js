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
