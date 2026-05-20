let rings = [];

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  colorMode(HSB, 360, 100, 100, 100);
  noFill();
}

function draw() {
  background(228, 80, 5, 24);

  stroke(190, 40, 80, 18);
  for (let x = 0; x <= width; x += 38) {
    line(x, 0, x + sin(frameCount * 0.02 + x) * 18, height);
  }

  const attractX = mouseX || width / 2;
  const attractY = mouseY || height / 2;

  for (let i = rings.length - 1; i >= 0; i--) {
    const ring = rings[i];
    ring.radius += ring.speed;
    ring.alpha -= 1.35;

    stroke(ring.hue, 70, 100, ring.alpha);
    strokeWeight(ring.weight);
    circle(ring.x, ring.y, ring.radius);

    ring.x = lerp(ring.x, attractX, 0.008);
    ring.y = lerp(ring.y, attractY, 0.008);

    if (ring.alpha <= 0) {
      rings.splice(i, 1);
    }
  }

  blendMode(ADD);
  noStroke();
  fill(190, 90, 100, 35);
  circle(attractX, attractY, 90 + sin(frameCount * 0.06) * 18);
  fill(315, 80, 100, 30);
  circle(attractX, attractY, 38);
  blendMode(BLEND);

  if (frameCount % 12 === 0) {
    addRing(random(width), random(height), random(175, 320));
  }
}

function mouseDragged() {
  addRing(mouseX, mouseY, random(175, 320));
}

function mousePressed() {
  for (let i = 0; i < 8; i++) {
    addRing(mouseX, mouseY, random(175, 320));
  }
}

function addRing(x, y, hue) {
  rings.push({
    x,
    y,
    hue,
    radius: random(8, 30),
    speed: random(1.8, 4.8),
    weight: random(1, 3),
    alpha: 80
  });

  if (rings.length > 90) {
    rings.shift();
  }
}
