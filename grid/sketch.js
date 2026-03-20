// Grid Demo
//learning 2d arrays

let theGrid = [[0, 0, 1, 0],
               [1, 0, 1, 0],
               [0, 1, 1, 0],
               [0, 1, 0, 1]];
const SQUARE_DIMENSIONS = theGrid.length;

let cellSize;

function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width / SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height / SQUARE_DIMENSIONS;
  }
}

function draw() {
  background(220);
  showGrid();
}

function showGrid() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if (theGrid[y][x] === 1) {
        fill("black");
      }
      if (theGrid[y][x] === 0) {
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function mousePressed(){
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x,y);
}

function toggleCell(){
  if (theGrid[y][x] === 1){
    theGrid[y][x] = 0;
  }

  if (theGrid[y][x] === 0){
    theGrid[y][x] = 1;
  }
}