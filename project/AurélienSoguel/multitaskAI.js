let bots = [];
let targets = [];

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");

  for (let i = 0; i < 8; i++) {
    bots.push({
      pos: createVector(random(width), random(height)),
      vel: p5.Vector.random2D(),
      role: i % 3,
      energy: random(80, 160)
    });
  }

  for (let i = 0; i < 5; i++) {
    targets.push(createVector(random(60, width - 60), random(60, height - 60)));
  }
}

function draw() {
  background(4, 6, 17, 80);
  drawTargets();

  for (const bot of bots) {
    const target = targets[bot.role % targets.length];
    const desired = p5.Vector.sub(target, bot.pos).setMag(0.28 + bot.role * 0.09);
    const wander = p5.Vector.fromAngle(noise(bot.pos.x * 0.01, bot.pos.y * 0.01, frameCount * 0.01) * TWO_PI * 2).mult(0.18);

    bot.vel.add(desired).add(wander);
    bot.vel.limit(2.8);
    bot.pos.add(bot.vel);
    bot.energy -= 0.08;

    if (p5.Vector.dist(bot.pos, target) < 26 || bot.energy < 0) {
      targets[bot.role % targets.length] = createVector(random(60, width - 60), random(60, height - 60));
      bot.energy = random(90, 170);
    }

    wrap(bot.pos);
    drawBot(bot);
  }
}

function drawTargets() {
  noFill();
  strokeWeight(1);

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    stroke(i % 2 === 0 ? color(104, 232, 255, 130) : color(255, 107, 214, 120));
    circle(t.x, t.y, 22 + sin(frameCount * 0.05 + i) * 8);
    line(t.x - 10, t.y, t.x + 10, t.y);
    line(t.x, t.y - 10, t.x, t.y + 10);
  }
}

function drawBot(bot) {
  const colors = [
    color(104, 232, 255),
    color(255, 107, 214),
    color(255, 200, 87)
  ];

  push();
  translate(bot.pos.x, bot.pos.y);
  rotate(bot.vel.heading());
  noStroke();
  fill(colors[bot.role]);
  triangle(14, 0, -10, -7, -10, 7);
  fill(255, 255, 255, 120);
  circle(-3, 0, 4);
  pop();
}

function wrap(pos) {
  pos.x = (pos.x + width) % width;
  pos.y = (pos.y + height) % height;
}

function mousePressed() {
  targets.push(createVector(mouseX, mouseY));
  if (targets.length > 8) {
    targets.shift();
  }
}
