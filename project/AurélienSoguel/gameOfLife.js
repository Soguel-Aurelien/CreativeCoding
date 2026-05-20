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

function makeCell(alive, isKiller, isPassive, isAngel) {
  return {
    alive: alive,
    isKiller: isKiller,
    isPassive: isPassive,
    isAngel: isAngel,
  };
}

function setup() {
  createCanvas(1000, 1000);
  cols = width / resolution;
  rows = height / resolution;

  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let alive = floor(random(2)) == 1;
      grid[i][j] = makeCell(alive, false, false);
    }
  }
}

function draw() {
  background(0);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      let cell = grid[i][j];

      if (cell.alive) {
        if (cell.isKiller) {
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

  let next = make2DArray(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);
      let killerNeighbors = countKillerNeighbors(grid, i, j);

      if (!state.alive && neighbors == 3) { //become alive
        next[i][j] = makeCell(true, false, false, false);
      } else if (state.isPassive && killerNeighbors > 3) { //passive killed by too many killers
        next[i][j] = makeCell(false, false, false, false);
      } else if (state.alive && neighbors == 0) { //alone cell
        if (floor(random(3)) == 0) {
          next[i][j] = makeCell(true, false, true, false);
        } else {
          next[i][j] = makeCell(true, true, false, false);
        }
      } else if (state.alive && (neighbors < 2 || neighbors > 3)) { //die
        next[i][j] = makeCell(false, false, false, false);
      } else if (state.alive) {
        next[i][j] = makeCell(state.alive, state.isKiller, state.isPassive);
      } else {
        next[i][j] = makeCell(false, false, false, false);
      }

    }
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
    next[targetX][y] = makeCell(false, false, false);
    next[x][targetY] = makeCell(false, false, false);
  }
}
