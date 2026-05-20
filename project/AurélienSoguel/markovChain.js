const sourceText = `
creative coding creates small machines for surprise. color follows color,
signal follows signal, and each rule opens a new orbit. a system can repeat,
break, recover, mutate, drift, and return with a different rhythm. the sketch
does not explain itself: it generates traces, fragments, echoes, patterns and
possible futures. every word becomes a gate to another word.
`;

let markovIndex = {};
let generated = "";
let generateButton;
let seedInput;

function setup() {
  const canvas = createCanvas(760, 420);
  canvas.parent("sketch-container");
  textFont("monospace");

  markovIndex = buildMarkov(sourceText);

  const controls = select("#sketch-controls");
  seedInput = createInput("creative");
  seedInput.attribute("aria-label", "Starting word");
  seedInput.parent(controls);

  generateButton = createButton("Generate text");
  generateButton.parent(controls);
  generateButton.mousePressed(generateNewText);

  generateNewText();
}

function buildMarkov(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);
  const index = {};

  for (let i = 0; i < words.length - 1; i++) {
    const current = words[i];
    const next = words[i + 1];
    if (!index[current]) {
      index[current] = [];
    }
    index[current].push(next);
  }

  return index;
}

function generateNewText() {
  generated = generateText(seedInput.value().toLowerCase(), 72);
}

function generateText(seed, length) {
  const words = Object.keys(markovIndex);
  let current = markovIndex[seed] ? seed : random(words);
  const result = [current];

  for (let i = 0; i < length; i++) {
    const options = markovIndex[current];
    if (!options || options.length === 0) {
      current = random(words);
    } else {
      current = random(options);
    }
    result.push(current);
  }

  return result.join(" ");
}

function draw() {
  background(4, 6, 17);
  drawConstellation();

  fill(238, 247, 255);
  textSize(19);
  text("Markov transmission", 34, 48);

  fill(159, 179, 200);
  textSize(16);
  textWrap(WORD);
  text(generated, 34, 86, width - 68, height - 110);
}

function drawConstellation() {
  stroke(104, 232, 255, 50);
  noFill();
  for (let i = 0; i < 18; i++) {
    const x = noise(i, frameCount * 0.006) * width;
    const y = noise(i + 20, frameCount * 0.006) * height;
    circle(x, y, 4);
    if (i > 0) {
      const px = noise(i - 1, frameCount * 0.006) * width;
      const py = noise(i + 19, frameCount * 0.006) * height;
      line(x, y, px, py);
    }
  }
}
