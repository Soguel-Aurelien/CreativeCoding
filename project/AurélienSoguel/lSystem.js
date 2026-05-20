let axiom = "X";
let sentence = axiom;
let baseLen = 86;
let angle = 22;
let lineColor;
let generation = 0;
let maxGenerations = 5;
let infoText;

const rules = [
  { a: "X", b: "F[+X][-X]FX" },
  { a: "F", b: "FF" }
];

function setup() {
  const canvas = createCanvas(760, 520);
  canvas.parent("sketch-container");

  const controls = select("#sketch-controls");
  const generateButton = createButton("Generate");
  const colorButton = createButton("Change color");
  const resetButton = createButton("Reset");

  generateButton.parent(controls);
  colorButton.parent(controls);
  resetButton.parent(controls);

  generateButton.mousePressed(nextGeneration);
  colorButton.mousePressed(changeLineColor);
  resetButton.mousePressed(resetTree);

  infoText = createP("");
  infoText.parent(controls);

  changeLineColor();
  turtle();
}

function resetTree() {
  sentence = axiom;
  generation = 0;
  turtle();
}

function nextGeneration() {
  if (generation >= maxGenerations) {
    return;
  }

  generate();
  turtle();
}

function changeLineColor() {
  lineColor = color(random(90, 140), random(170, 240), random(120, 220));
  turtle();
}

function generate() {
  let nextSentence = "";

  for (let i = 0; i < sentence.length; i++) {
    const current = sentence.charAt(i);
    const rule = rules.find((item) => item.a === current);
    nextSentence += rule ? rule.b : current;
  }

  sentence = nextSentence;
  generation++;
}

function turtle() {
  background(4, 6, 17);

  const bounds = getTree();
  const treeWidth = max(1, bounds.maxX - bounds.minX);
  const offsetX = width / 2 - (bounds.minX + treeWidth / 2);
  const offsetY = height * 0.9 - bounds.maxY;

  resetMatrix();
  translate(offsetX, offsetY);
  stroke(lineColor || color(104, 232, 255));
  noFill();

  const stepLen = getLength();
  let branchDepth = 0;

  for (let i = 0; i < sentence.length; i++) {
    const c = sentence.charAt(i);

    switch (c) {
      case "F":
        drawSegment(stepLen, branchDepth);
        translate(0, -stepLen);
        break;
      case "+":
        rotate(radians(angle + random(-5, 4)));
        break;
      case "-":
        rotate(radians(-(angle + random(-4, 5))));
        break;
      case "[":
        branchDepth++;
        push();
        break;
      case "]":
        pop();
        branchDepth = max(0, branchDepth - 1);
        break;
    }
  }

  resetMatrix();
  if (infoText) {
    infoText.html("Generation " + generation + " / " + maxGenerations);
  }
}

function drawSegment(stepLen, branchDepth) {
  const thickness = max(1, map(branchDepth, 0, generation + 4, 5, 1.1));
  const lean = random(-2, 2);
  const nextX = lean;
  const nextY = -stepLen;

  strokeWeight(thickness);
  line(0, 0, nextX, nextY);

  if (branchDepth > 1 && random() > 0.73) {
    const leafSize = random(5, 10);
    noStroke();
    fill(121, 255, 180, 130);
    ellipse(nextX, nextY, leafSize, leafSize * 0.75);
    stroke(lineColor || color(104, 232, 255));
    noFill();
  }
}

function getLength() {
  return baseLen * pow(0.68, generation);
}

function getTree() {
  const stepLen = getLength();
  const angleStack = [];
  const positionStack = [];
  let x = 0;
  let y = 0;
  let currentAngle = -HALF_PI;
  let minX = 0;
  let maxX = 0;
  let minY = 0;
  let maxY = 0;

  for (let i = 0; i < sentence.length; i++) {
    const c = sentence.charAt(i);

    switch (c) {
      case "F":
        x += cos(currentAngle) * stepLen;
        y += sin(currentAngle) * stepLen;
        minX = min(minX, x);
        maxX = max(maxX, x);
        minY = min(minY, y);
        maxY = max(maxY, y);
        break;
      case "+":
        currentAngle += radians(angle);
        break;
      case "-":
        currentAngle -= radians(angle);
        break;
      case "[":
        positionStack.push({ x, y });
        angleStack.push(currentAngle);
        break;
      case "]":
        const savedPosition = positionStack.pop();
        x = savedPosition.x;
        y = savedPosition.y;
        currentAngle = angleStack.pop();
        break;
    }
  }

  return { minX, maxX, minY, maxY };
}

function draw() {}
