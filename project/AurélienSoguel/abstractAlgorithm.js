let nodes = [];
let pulse = 0;

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  colorMode(HSB, 360, 100, 100, 100);
  initNodes();
}

function initNodes() {
  nodes = [];

  for (let i = 0; i < 46; i++) {
    nodes.push({
      x: random(width),
      y: random(height),
      r: random(18, 120),
      speed: random(0.002, 0.012),
      phase: random(TWO_PI),
      hue: random(175, 325)
    });
  }
}

function draw() {
  background(228, 78, 5, 18);
  pulse += 0.01;

  for (let i = 0; i < nodes.length; i++) {
    const a = nodes[i];
    a.x += cos(frameCount * a.speed + a.phase) * 0.8;
    a.y += sin(frameCount * a.speed * 1.4 + a.phase) * 0.8;
    a.x = (a.x + width) % width;
    a.y = (a.y + height) % height;

    noFill();
    stroke(a.hue, 70, 100, 18);
    circle(a.x, a.y, a.r + sin(pulse + a.phase) * 18);

    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];
      const d = dist(a.x, a.y, b.x, b.y);

      if (d < 130) {
        stroke(190 + d * 0.5, 70, 100, map(d, 0, 130, 45, 0));
        line(a.x, a.y, b.x, b.y);
      }
    }
  }

  blendMode(ADD);
  noStroke();
  for (const node of nodes) {
    fill(node.hue, 85, 100, 18);
    circle(node.x, node.y, 5);
  }
  blendMode(BLEND);
}

function mousePressed() {
  initNodes();
}
