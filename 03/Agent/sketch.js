let centerX, centerY;
let centerXRD, centerYRD;
let centerXLD, centerYLD;
let centerXRU, centerYRU;
let centerXLU, centerYLU;
let running = false;
let stepSize = 10;

const NORTH = 0;
const NORTHEAST = 1;
const EAST = 2;
const SOUTHEAST = 3;
const SOUTH = 4;
const SOUTHWEST = 5;
const WEST = 6;
const NORTHWEST = 7;
let i=0;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  centerX = width / 2;
  centerY = height / 2;

  centerXLD = centerX / 2;
  centerYLD = centerY * 1.5;

  centerXLU = centerX / 2;
  centerYLU = centerY / 2;

  centerXRD = centerX * 1.5;
  centerYRD = centerY * 1.5;

  centerXRU = centerX * 1.5;
  centerYRU = centerY / 2;

  startButton = createButton("Start");
  startButton.position(20, 20);
  startButton.mousePressed(() => running = true);

  stopButton = createButton("Stop");
  stopButton.position(80, 20);
  stopButton.mousePressed(() => running = false);
}

function draw(){

  if (!running) return;

  let direction = floor(random(0, 8));

  switch (direction){
    /*
      N (y-)
      NE (y-,x+)
      E (x+)
      SE (y+, x+)
      S (y+)
      SW (y+, x-)
      W (x-)
      NW (y-,x-)
    */
    case NORTH:      centerY -= stepSize; break;
    case NORTHEAST:  centerX += stepSize; centerY -= stepSize; break;
    case EAST:       centerX += stepSize; break;
    case SOUTHEAST:  centerX += stepSize; centerY += stepSize; break;
    case SOUTH:      centerY += stepSize; break;
    case SOUTHWEST:  centerX -= stepSize; centerY += stepSize; break;
    case WEST:       centerX -= stepSize; break;
    case NORTHWEST:  centerX -= stepSize; centerY -= stepSize; break;
  }

    let directionRU = floor(random(0, 8));

  switch (directionRU){
    /*
      N (y-)
      NE (y-,x+)
      E (x+)
      SE (y+, x+)
      S (y+)
      SW (y+, x-)
      W (x-)
      NW (y-,x-)
    */
    case NORTH:      centerYRU -= stepSize; break;
    case NORTHEAST:  centerXRU += stepSize; centerYRU -= stepSize; break;
    case EAST:       centerXRU += stepSize; break;
    case SOUTHEAST:  centerXRU += stepSize; centerYRU += stepSize; break;
    case SOUTH:      centerYRU += stepSize; break;
    case SOUTHWEST:  centerXRU -= stepSize; centerYRU += stepSize; break;
    case WEST:       centerXRU -= stepSize; break;
    case NORTHWEST:  centerXRU -= stepSize; centerYRU -= stepSize; break;
  }

    let directionLU = floor(random(0, 8));

  switch (directionLU){
 
    case NORTH:      centerYLU -= stepSize; break;
    case NORTHEAST:  centerXLU += stepSize; centerYLU -= stepSize; break;
    case EAST:       centerXLU += stepSize; break;
    case SOUTHEAST:  centerXLU += stepSize; centerYLU += stepSize; break;
    case SOUTH:      centerYLU += stepSize; break;
    case SOUTHWEST:  centerXLU -= stepSize; centerYLU += stepSize; break;
    case WEST:       centerXLU -= stepSize; break;
    case NORTHWEST:  centerXLU -= stepSize; centerYLU -= stepSize; break;
  }

    let directionRD = floor(random(0, 8));

  switch (directionRD){
   
    case NORTH:      centerYRD -= stepSize; break;
    case NORTHEAST:  centerXRD += stepSize; centerYRD -= stepSize; break;
    case EAST:       centerXRD += stepSize; break;
    case SOUTHEAST:  centerXRD += stepSize; centerYRD += stepSize; break;
    case SOUTH:      centerYRD += stepSize; break;
    case SOUTHWEST:  centerXRD -= stepSize; centerYRD += stepSize; break;
    case WEST:       centerXRD -= stepSize; break;
    case NORTHWEST:  centerXRD -= stepSize; centerYRD -= stepSize; break;
  }

    let directionLD = floor(random(0, 8));

  switch (directionLD){
   
    case NORTH:      centerYLD -= stepSize; break;
    case NORTHEAST:  centerXLD += stepSize; centerYLD -= stepSize; break;
    case EAST:       centerXLD += stepSize; break;
    case SOUTHEAST:  centerXLD += stepSize; centerYLD += stepSize; break;
    case SOUTH:      centerYLD += stepSize; break;
    case SOUTHWEST:  centerXLD -= stepSize; centerYLD += stepSize; break;
    case WEST:       centerXLD -= stepSize; break;
    case NORTHWEST:  centerXLD -= stepSize; centerYLD -= stepSize; break;
  }


  i++;
  
  if(i>=255 && i<500){
    fill(random(255), random(255), random(255), 150);
    noStroke();
    circle(centerX, centerY, 40);
  } else if(i<255){
    fill(random(255), random(255), random(255), 150);
    noStroke();
    circle(centerX, centerY, 20);
  } else if(i==500){
    clear();
  }else if(i>=500 && i<755){
    stroke(random(255), random(255), random(255));
    line(centerX,centerY, random(width,-width), random(height, -height));
  }else if(i==755){
    clear();
  }else if(i>=755 && i<855){
    fill(random(255), 0, 0, 0);
    noStroke();
    circle(centerXLU, centerYLU, random(20,80));
  }else if(i>=855 && i<955){
    fill(0, random(255), 0, 0);
    noStroke();
    circle(centerXRU, centerYRU, random(20,80));
  }else if(i>=955 && i<1055){
    fill(0, 0, random(255), 0);
    noStroke();
    circle(centerXLD, centerYLD, random(20,80));
  }else if(i>=1055 && i<1155){
    fill(0, 0, 0, random(255));
    noStroke();
    circle(centerXRD, centerYRD, random(20,80));
  }
}
