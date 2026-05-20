let cellSize = 8;

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  noStroke();
}

function draw() {
  background(4, 6, 17);
  const mouseInfluence = map(mouseX, 0, width, 0.3, 1.8, true);

  for (let y = 0; y < height; y += cellSize) {
    for (let x = 0; x < width; x += cellSize) {
      const wave = sin(x * 0.03 + frameCount * 0.05) + cos(y * 0.035 - frameCount * 0.04);
      const field = noise(x * 0.012, y * 0.012, frameCount * 0.015);
      const value = (wave * 0.25 + field) * mouseInfluence;
      const threshold = ((x / cellSize + y / cellSize) % 4) / 4;

      if (value > threshold) {
        const hueShift = map(value, 0, 2, 0, 1, true);
        fill(lerpColor(color(104, 232, 255), color(255, 107, 214), hueShift));
        rect(x, y, cellSize - 1, cellSize - 1);
      }
    }
  }

  fill(255, 200, 87);
  rect(24, height - 36, map(mouseInfluence, 0.3, 1.8, 60, 210), 5);
}
