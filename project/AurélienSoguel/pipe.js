let grid = [];
let cols = 19;
let rows = 11;
let tile;

function setup() {
  const canvas = createCanvas(760, 440);
  canvas.parent("sketch-container");
  tile = width / cols;
  buildGrid();
}

function buildGrid() {
  grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        type: floor(random(4)),
        flow: random(TWO_PI)
      });
    }
    grid.push(row);
  }
}

function draw() {
  background(4, 6, 17);
  translate(0, 8);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      drawTile(x, y, grid[y][x]);
    }
  }

  if (frameCount % 42 === 0) {
    const x = floor(random(cols));
    const y = floor(random(rows));
    grid[y][x].type = (grid[y][x].type + 1) % 4;
  }
}

function drawTile(x, y, cell) {
  const px = x * tile + tile / 2;
  const py = y * tile + tile / 2;
  const s = tile * 0.72;

  strokeWeight(7);
  stroke(28, 46, 72);
  noFill();

  if (cell.type === 0) {
    line(px - s / 2, py, px + s / 2, py);
  } else if (cell.type === 1) {
    line(px, py - s / 2, px, py + s / 2);
  } else if (cell.type === 2) {
    arc(px - s / 2, py - s / 2, s, s, 0, HALF_PI);
  } else {
    arc(px + s / 2, py - s / 2, s, s, HALF_PI, PI);
  }

  strokeWeight(3);
  stroke(104, 232, 255, 190);
  if (cell.type === 0) {
    line(px - s / 2, py, px + s / 2, py);
    drawPulse(px + sin(frameCount * 0.08 + cell.flow) * s / 2, py);
  } else if (cell.type === 1) {
    line(px, py - s / 2, px, py + s / 2);
    drawPulse(px, py + sin(frameCount * 0.08 + cell.flow) * s / 2);
  } else if (cell.type === 2) {
    arc(px - s / 2, py - s / 2, s, s, 0, HALF_PI);
    drawPulse(px - s / 2 + s * 0.5, py - s / 2 + s * 0.5);
  } else {
    arc(px + s / 2, py - s / 2, s, s, HALF_PI, PI);
    drawPulse(px + s / 2 - s * 0.5, py - s / 2 + s * 0.5);
  }
}

function drawPulse(x, y) {
  noStroke();
  fill(255, 200, 87, 180);
  circle(x, y, 7);
}

function mousePressed() {
  buildGrid();
}
