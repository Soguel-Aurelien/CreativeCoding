let originalLayer;
let filteredLayer;

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  pixelDensity(1);
  originalLayer = createGraphics(width, height);
  filteredLayer = createGraphics(width, height);
}

function drawOriginal() {
  originalLayer.background(5, 8, 20);
  originalLayer.noStroke();

  for (let i = 0; i < 90; i++) {
    const x = noise(i, frameCount * 0.01) * width;
    const y = noise(i + 80, frameCount * 0.01) * height;
    originalLayer.fill(255, 255, 255, 80);
    originalLayer.circle(x, y, 2);
  }

  for (let r = 280; r > 20; r -= 12) {
    originalLayer.fill(40 + r * 0.2, 100 + r * 0.1, 220, 18);
    originalLayer.circle(width * 0.36, height * 0.52, r);
  }

  originalLayer.fill(255, 107, 214, 210);
  originalLayer.circle(width * 0.36, height * 0.52, 74);
  originalLayer.fill(104, 232, 255, 170);
  originalLayer.circle(width * 0.48, height * 0.42, 34);
}

function applyFilter() {
  filteredLayer.image(originalLayer, 0, 0);
  filteredLayer.loadPixels();

  const strength = map(mouseX, 0, width, 0, 1, true);
  for (let i = 0; i < filteredLayer.pixels.length; i += 4) {
    const r = filteredLayer.pixels[i];
    const g = filteredLayer.pixels[i + 1];
    const b = filteredLayer.pixels[i + 2];
    const average = (r + g + b) / 3;

    filteredLayer.pixels[i] = lerp(r, 255 - b, strength);
    filteredLayer.pixels[i + 1] = lerp(g, average, strength);
    filteredLayer.pixels[i + 2] = lerp(b, 255 - r, strength);
  }

  filteredLayer.updatePixels();
}

function draw() {
  drawOriginal();
  applyFilter();
  background(4, 6, 17);

  image(originalLayer, 30, 45, 330, 300);
  image(filteredLayer, 400, 45, 330, 300);

  noFill();
  stroke(104, 232, 255, 160);
  rect(30, 45, 330, 300);
  stroke(255, 107, 214, 160);
  rect(400, 45, 330, 300);

  noStroke();
  fill(238, 247, 255);
  textSize(16);
  text("Original", 30, 375);
  text("Filtered signal", 400, 375);
  fill(159, 179, 200);
  text("Move the mouse horizontally to increase the filter strength.", 30, 408);
}
