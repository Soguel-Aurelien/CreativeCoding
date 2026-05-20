let layerA;
let layerB;
let maskLayer;

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  pixelDensity(1);
  layerA = createGraphics(width, height);
  layerB = createGraphics(width, height);
  maskLayer = createGraphics(width, height);
}

function drawLayerA() {
  layerA.clear();
  layerA.background(5, 8, 20);
  layerA.noStroke();

  for (let x = -80; x < width + 80; x += 36) {
    const y = height / 2 + sin(frameCount * 0.018 + x * 0.025) * 120;
    layerA.fill(80, 232, 255, 110);
    layerA.circle(x, y, 26 + sin(frameCount * 0.04 + x) * 8);
  }

  layerA.stroke(255, 105, 210, 125);
  layerA.strokeWeight(2);
  for (let y = 40; y < height; y += 44) {
    layerA.line(0, y + sin(frameCount * 0.02 + y) * 20, width, y + cos(frameCount * 0.016 + y) * 20);
  }
}

function drawLayerB() {
  layerB.clear();
  layerB.background(8, 16, 45);
  layerB.noFill();
  layerB.strokeWeight(3);

  for (let i = 0; i < 18; i++) {
    const size = 40 + i * 26 + sin(frameCount * 0.025 + i) * 14;
    layerB.stroke(255, 198, 87, 150 - i * 5);
    layerB.circle(width / 2, height / 2, size);
  }

  layerB.noStroke();
  for (let i = 0; i < 80; i++) {
    const x = noise(i, frameCount * 0.01) * width;
    const y = noise(i + 100, frameCount * 0.01) * height;
    layerB.fill(255, 255, 255, 90);
    layerB.circle(x, y, random(1, 3));
  }
}

function drawMask() {
  maskLayer.clear();
  maskLayer.noStroke();
  const radius = 120 + sin(frameCount * 0.03) * 48;
  const x = width / 2 + cos(frameCount * 0.018) * 160;
  const y = height / 2 + sin(frameCount * 0.024) * 95;

  for (let r = radius; r > 0; r -= 10) {
    maskLayer.fill(255, map(r, 0, radius, 0, 230));
    maskLayer.circle(x, y, r * 2);
  }
}

function draw() {
  drawLayerA();
  drawLayerB();
  drawMask();

  image(layerA, 0, 0);
  blendMode(SCREEN);
  image(layerB, 0, 0);
  blendMode(MULTIPLY);
  image(maskLayer, 0, 0);
  blendMode(BLEND);

  noFill();
  stroke(104, 232, 255, 190);
  rect(18, 18, width - 36, height - 36);
}
