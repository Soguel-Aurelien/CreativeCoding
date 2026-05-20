var axiom = "X";
var sentence = axiom;
var baseLen = 85;
var angle = 22;
var lineColor;
var generation = 0;
var maxGenerations = 5;

var rules = [
    {
        a: "X",
        b: "F[+X][-X]FX"
    },
    {
        a: "F",
        b: "FF"
    }
];

function setup() {
    createCanvas(700, 700);
    infoText = createP("");

    let btn = createButton("Generate and draw");
    btn.mousePressed(notMoreThanFive);

    let colorBtn = createButton("Change line color");
    colorBtn.mousePressed(changeLineColor);

    changeLineColor();
    turtle();
}

function notMoreThanFive() {
    if (generation >= maxGenerations) {
        return;
    }

    generate();
    turtle();
}

function changeLineColor() {
    lineColor = color(random(50, 120), random(90, 170), random(40, 110));
    turtle();
}


function generate() {
    let nextSentence = "";

    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        let found = false;

        for (let r of rules) {
            if (current === r.a) {
                nextSentence += r.b;
                found = true;
                break;
            }
        }

        if (!found) {
            nextSentence += current;
        }
    }

    sentence = nextSentence;
    generation++;
}

function turtle() {
    clear();

    let bounds = getTree();
    let treeWidth = max(1, bounds.maxX - bounds.minX);
    let treeHeight = max(1, bounds.maxY - bounds.minY);
    let offsetX = width / 2 - (bounds.minX + treeWidth / 2);
    let offsetY = height * 0.9 - bounds.maxY;

    resetMatrix();
    translate(offsetX, offsetY);
    stroke(lineColor || color(70, 120, 70));
    noFill();

    let stepLen = getLength();
    let branchDepth = 0;

    for (let i = 0; i < sentence.length; i++) {
        let c = sentence.charAt(i);

        switch (c) {
            case "F":
                drawSegment(stepLen, branchDepth);
                translate(0, -stepLen);
                break;

            case "+":
                rotate(radians(angle + random(-6, 4)));
                break;

            case "-":
                rotate(radians(-(angle + random(-4, 6))));
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
}

function drawSegment(stepLen, branchDepth) {
    let thickness = max(1, map(branchDepth, 0, generation + 4, 5, 1.2));
    let lean = random(-2, 2);
    let nextX = lean;
    let nextY = -stepLen;

    strokeWeight(thickness);
    line(0, 0, nextX, nextY);

    if (branchDepth > 1 && random() > 0.72) {
        let leafSize = random(5, 9);
        strokeWeight(1);
        stroke(70, 130, 70, 180);
        fill(100, 165, 90, 120);
        ellipse(nextX, nextY, leafSize, leafSize * 0.75);
        stroke(lineColor || color(70, 120, 70));
        noFill();
    }
}

function getLength() {
    return baseLen * pow(0.68, generation);
}

function getTree() {
    let stepLen = getLength();
    let angleStack = [];
    let positionStack = [];
    let x = 0;
    let y = 0;
    let currentAngle = -HALF_PI;
    let minX = 0;
    let maxX = 0;
    let minY = 0;
    let maxY = 0;

    for (let i = 0; i < sentence.length; i++) {
        let c = sentence.charAt(i);

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
                positionStack.push({ x: x, y: y });
                angleStack.push(currentAngle);
                break;

            case "]":
                let savedPosition = positionStack.pop();
                x = savedPosition.x;
                y = savedPosition.y;
                currentAngle = angleStack.pop();
                break;
        }
    }

    return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
}

function draw() {}
