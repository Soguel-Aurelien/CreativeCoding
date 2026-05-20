function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

//grid variables
let grid;
let cols;
let rows;
let resolution = 10;
let generationSpeed = 8;
let lastGenerationTime = 0;
let angelSpawnChance = 10000;
let bombSpawnChance = 200000;
let bombRadius = 300;
let bombDelay = 10000;
let bombCountdownDisplay;

function makeCell(alive, isKiller, isPassive, isAngel, isBomb, bombSpawnTime) {
  return {
    alive: alive,
    isKiller: isKiller,
    isPassive: isPassive,
    isAngel: isAngel,
    isBomb: isBomb,
    bombSpawnTime: bombSpawnTime || 0,
  };
}

function setup() {
  let canvas = createCanvas(1000, 1000);
  let canvasContainer = select("#game-of-life-canvas");

  if (canvasContainer) {
    canvas.parent(canvasContainer);
  }

  frameRate(60);
  cols = width / resolution;
  rows = height / resolution;
  lastGenerationTime = millis();
  bombCountdownDisplay = select("#bomb-countdown");
  setupSpeedButtons();

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let alive = floor(random(2)) == 1;
      grid[i][j] = makeCell(alive, false, false, false, false);
    }
  }
}

function setupSpeedButtons() {
  let buttons = selectAll(".speed-button");

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].mousePressed(function() {
      generationSpeed = int(this.attribute("data-speed"));
      updateSpeedButtons(buttons, this);
    });
  }
}

function updateSpeedButtons(buttons, activeButton) {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].removeClass("active");
  }

  activeButton.addClass("active");
}

function draw() {
  explodeExpiredBombs(grid);
  background(0);
  drawGrid();
  updateBombCountdownDisplay();

  if (millis() - lastGenerationTime >= 1000 / generationSpeed) {
    updateGeneration();
    lastGenerationTime = millis();
  }
}

function drawGrid() {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let cell = grid[i][j];

      if (cell.alive) {
        if (cell.isBomb) {
          fill(255, 220, 0);
        } else if (cell.isAngel) {
          fill(90, 190, 255);
        } else if (cell.isKiller) {
          fill(255, 60, 60);
        } else if (cell.isPassive) {
          fill(0, 255, 0);
        } else {
          fill(255);
        }
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }
}

function updateGeneration() {
  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);
      let killerNeighbors = countKillerNeighbors(grid, i, j);

      if (!state.alive && neighbors == 3) { //become alive
        next[i][j] = makeBornCell();
      } else if (state.isBomb) {
        next[i][j] = makeCell(true, false, false, false, true, state.bombSpawnTime);
      } else if (state.isPassive && killerNeighbors > 3) { //passive killed by too many killers
        next[i][j] = makeCell(false, false, false, false, false);
      } else if (state.alive && neighbors == 0) { //alone cell
        if (state.isKiller || state.isPassive || state.isAngel) {
          next[i][j] = makeCell(true, state.isKiller, state.isPassive, state.isAngel, false);
        } else {
          next[i][j] = makeAloneCell();
        }
      } else if (state.alive && (neighbors < 2 || neighbors > 3)) { //die
        next[i][j] = makeCell(false, false, false, false, false);
      } else if (state.alive) {
        next[i][j] = makeCell(state.alive, state.isKiller, state.isPassive, state.isAngel, state.isBomb);
      } else {
        next[i][j] = makeCell(false, false, false, false, false);
      }

    }
  }

  if (hasAngel(next)) {
    convertKillersToPassive(next);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (next[i][j].isKiller) {
        kill(next, i, j);
      }
    }
  }

  grid = next;
}

function makeBornCell() {
  if (floor(random(bombSpawnChance)) == 0) {
    return makeCell(true, false, false, false, true, millis());
  }

  return makeCell(true, false, false, false, false);
}

function makeAloneCell() {
  if (floor(random(bombSpawnChance)) == 0) {
    return makeCell(true, false, false, false, true, millis());
  }

  if (floor(random(angelSpawnChance)) == 0) {
    return makeCell(true, false, false, true, false);
  }

  if (floor(random(3)) == 0) {
    return makeCell(true, false, true, false, false);
  }

  return makeCell(true, true, false, false, false);
}

function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if (grid[col][row].alive) {
        sum++;
      }
    }
  }
  if (grid[x][y].alive) {
    sum--;
  }
  return sum;
}

function countKillerNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      if ((i != 0 || j != 0) && grid[col][row].alive && grid[col][row].isKiller) {
        sum++;
      }
    }
  }
  return sum;
}

function kill(next, x, y){
  let chanceToKill = floor(random(70));

  if (chanceToKill == 67) {
    let targetX = (x + 1) % cols;
    let targetY = (y - 1 + rows) % rows;
    killCell(next, targetX, y);
    killCell(next, x, targetY);
  }
}

function killCell(next, x, y) {
  if (!next[x][y].isBomb) {
    next[x][y] = makeCell(false, false, false, false, false);
  }
}

function updateBombCountdownDisplay() {
  if (!bombCountdownDisplay) {
    return;
  }

  let closestBombTime = getClosestBombTimeLeft();

  if (closestBombTime == null) {
    bombCountdownDisplay.html("Bomb: --");
  } else {
    bombCountdownDisplay.html("Bomb: " + closestBombTime + "s");
  }
}

function getClosestBombTimeLeft() {
  let closestTime = null;

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].alive && grid[i][j].isBomb) {
        let timeLeft = max(0, ceil((bombDelay - (millis() - grid[i][j].bombSpawnTime)) / 1000));

        if (closestTime == null || timeLeft < closestTime) {
          closestTime = timeLeft;
        }
      }
    }
  }

  return closestTime;
}

function explodeExpiredBombs(targetGrid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (targetGrid[i][j].alive && targetGrid[i][j].isBomb && millis() - targetGrid[i][j].bombSpawnTime >= bombDelay) {
        explode(targetGrid, i, j);
      }
    }
  }
}

function explode(targetGrid, bombX, bombY) {
  let radiusInCells = bombRadius / resolution;

  for (let i = -radiusInCells; i <= radiusInCells; i++) {
    for (let j = -radiusInCells; j <= radiusInCells; j++) {
      if (i * i + j * j <= radiusInCells * radiusInCells) {
        let col = (bombX + i + cols) % cols;
        let row = (bombY + j + rows) % rows;
        targetGrid[col][row] = makeCell(false, false, false, false, false);
      }
    }
  }
}

function hasAngel(grid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].alive && grid[i][j].isAngel) {
        return true;
      }
    }
  }
  return false;
}

function convertKillersToPassive(grid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j].alive && grid[i][j].isKiller) {
        grid[i][j] = makeCell(true, false, true, false, false);
      }
    }
  }
}
