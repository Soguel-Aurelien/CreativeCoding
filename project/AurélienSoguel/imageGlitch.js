let sourceLayer;

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  pixelDensity(1);
  sourceLayer = createGraphics(width, height);
}

function drawSource() {
  sourceLayer.background(5, 7, 18);
  sourceLayer.noStroke();

  const cx = width / 2;
  const cy = height / 2;
  for (let r = 340; r > 20; r -= 18) {
    sourceLayer.fill(40 + r * 0.25, 80, 180 + sin(frameCount * 0.02 + r) * 60, 32);
    sourceLayer.circle(cx, cy, r);
  }

  sourceLayer.stroke(104, 232, 255, 170);
  sourceLayer.strokeWeight(2);
  for (let i = 0; i < 28; i++) {
    const a = i * TWO_PI / 28 + frameCount * 0.006;
    sourceLayer.line(cx, cy, cx + cos(a) * 280, cy + sin(a) * 180);
  }

  sourceLayer.noStroke();
  sourceLayer.fill(255, 107, 214, 220);
  sourceLayer.circle(cx + cos(frameCount * 0.03) * 110, cy + sin(frameCount * 0.04) * 75, 58);
}

function draw() {
  drawSource();
  background(0);

  const slices = 38;
  const sliceH = height / slices;
  for (let i = 0; i < slices; i++) {
    const y = i * sliceH;
    const offset = sin(frameCount * 0.07 + i * 0.8) * 28 + random(-4, 4);
    copy(sourceLayer, 0, y, width, sliceH + 2, offset, y, width, sliceH + 2);
  }

  blendMode(ADD);
  tint(255, 60, 120, 90);
  image(sourceLayer, -6, 0);
  tint(60, 220, 255, 80);
  image(sourceLayer, 7, 0);
  noTint();
  blendMode(BLEND);

  for (let i = 0; i < 8; i++) {
    fill(random([color(104, 232, 255, 90), color(255, 107, 214, 90), color(255, 200, 87, 70)]));
    noStroke();
    rect(random(width), random(height), random(50, 180), random(2, 10));
  }
}
