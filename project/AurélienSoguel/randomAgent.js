let agents = [];
let running = true;
let startButton;
let stopButton;
let resetButton;

function setup() {
  const canvas = createCanvas(760, 460);
  canvas.parent("sketch-container");
  background(4, 6, 17);

  const controls = select("#sketch-controls");
  startButton = createButton("Start");
  stopButton = createButton("Stop");
  resetButton = createButton("Reset");
  startButton.parent(controls);
  stopButton.parent(controls);
  resetButton.parent(controls);

  startButton.mousePressed(() => running = true);
  stopButton.mousePressed(() => running = false);
  resetButton.mousePressed(resetAgents);

  resetAgents();
}

function resetAgents() {
  background(4, 6, 17);
  agents = [];

  for (let i = 0; i < 22; i++) {
    agents.push({
      x: width / 2,
      y: height / 2,
      angle: random(TWO_PI),
      speed: random(1.2, 3.2),
      hue: random([190, 315, 42, 145]),
      step: random(8, 22)
    });
  }
}

function draw() {
  if (!running) {
    return;
  }

  fill(4, 6, 17, 10);
  noStroke();
  rect(0, 0, width, height);

  for (const agent of agents) {
    const oldX = agent.x;
    const oldY = agent.y;

    agent.angle += random([-1, 0, 1]) * HALF_PI * 0.5;
    agent.x += cos(agent.angle) * agent.step * 0.24 * agent.speed;
    agent.y += sin(agent.angle) * agent.step * 0.24 * agent.speed;

    if (agent.x < 0 || agent.x > width || agent.y < 0 || agent.y > height) {
      agent.x = width / 2 + random(-80, 80);
      agent.y = height / 2 + random(-80, 80);
    }

    strokeWeight(1.6);
    stroke(agentColor(agent.hue, 145));
    line(oldX, oldY, agent.x, agent.y);
    noStroke();
    fill(agentColor(agent.hue, 210));
    circle(agent.x, agent.y, 4);
  }
}

function agentColor(hue, alpha) {
  if (hue === 190) {
    return color(104, 232, 255, alpha);
  }
  if (hue === 315) {
    return color(255, 107, 214, alpha);
  }
  if (hue === 42) {
    return color(255, 200, 87, alpha);
  }
  return color(121, 255, 180, alpha);
}
