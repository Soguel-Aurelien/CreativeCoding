let pixelStep = 14;

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  noStroke();
}

function draw() {
  background(4, 6, 17);
  pixelStep = floor(map(mouseX, 0, width, 6, 26, true));

  for (let y = 0; y < height; y += pixelStep) {
    for (let x = 0; x < width; x += pixelStep) {
      const dx = x - width / 2;
      const dy = y - height / 2;
      const distance = sqrt(dx * dx + dy * dy);
      const wave = sin(distance * 0.035 - frameCount * 0.08);
      const n = noise(x * 0.01, y * 0.01, frameCount * 0.012);
      const brightness = map(wave + n, -1, 2, 20, 255);

      fill(
        40 + brightness * 0.25,
        120 + brightness * 0.25,
        180 + brightness * 0.3,
        210
      );

      const size = map(brightness, 20, 255, pixelStep * 0.28, pixelStep * 1.15);
      rect(x, y, size, size);
    }
  }

  fill(255, 200, 87);
  textSize(14);
  text("Move the mouse horizontally to change pixel density", 24, height - 24);
}
