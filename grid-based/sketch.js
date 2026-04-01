// Grid Based Assignment
// Harjot Singh
// March 23, 2026
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let cellSize;
let rows;
let cols;
let grid;
let state = "menu";
let startFinishLine;
let glass;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function preload() {
  startFinishLine = loadImage("line.png");
  glass = loadImage("Transparent.png");
}


function draw() {
  background(220);
  whichDisplay();
}

function revealAll() {
  let timer = millis();
  if (millis()>millis()+timer) {
    for (let x = 0; x < cols; x++){
      for (let y = 0; y<rows; y++){
        if (grid[y][x].isSafe){
          
        }
      }
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX / cellSize);
  let y = Math.floor(mouseY / cellSize);

  //self
  toggleTile(x, y);
}
function toggleTile(x, y) {
  //make sure the tile you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[x][y].revealed === false) {
      grid[x][y].revealed = true;
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push({
        isSafe: false,
        revealed: false,
      });
    }
  }
  return newGrid;
}

function displayGrid(rows, cols) {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (x === 0) {
        image(startFinishLine, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (x === cols - 1) {
        image(startFinishLine, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (!grid[x][y].revealed) {
        image(glass, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        fill("black");
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function chooseCorrectPath(rows, cols) {
  let currentY = Math.floor(random(rows));
  let currentX = 0;
  while (currentX < cols - 1) {
    grid[currentX][currentY].isSafe = true;
    let move = Math.floor(random(3));
    if (move === 0) {
      currentX++;
    }
    else if (move === 1 && currentY > 0) {
      currentY--;
    }
    else if (move === 2 && currentY < rows - 1) {
      currentY++;
    }
  }
  for (let i = 0; i < rows; i++){
    grid[i][0].isSafe = true;
    grid[i][rows-1].isSafe = true;
  }
}


function checkCellSize(cellSizeWidth, cellSizeHeight) {
  if (cellSizeWidth < cellSizeHeight) {
    cellSize = cellSizeWidth;
  }
  else {
    cellSize = cellSizeHeight;
  }
}

function displayEasy() {
  let rows = 4;
  let cols = 6;
  let cellSizeWidth = width / cols;
  let cellSizeHeight = height / rows;
  checkCellSize(cellSizeWidth, cellSizeHeight);

  grid = generateEmptyGrid(rows, cols );
  chooseCorrectPath(rows, cols);
  displayGrid(rows, cols);
}

function displayMedium() {
  let rows = 5;
  let cols = 10;
  cellSize = width / cols;
  let cellSizeWidth = width / cols;
  let cellSizeHeight = height / rows;
  checkCellSize(cellSizeWidth, cellSizeHeight);
  grid = generateEmptyGrid(rows, cols + 2);
  chooseCorrectPath(rows, cols);
  displayGrid(rows, cols);
}

function displayHard() {
  let rows = 7;
  let cols = 15;
  cellSize = width / cols;
  let cellSizeWidth = width / cols;
  let cellSizeHeight = height / rows;
  checkCellSize(cellSizeWidth, cellSizeHeight);
  grid = generateEmptyGrid(rows, cols + 2);
  chooseCorrectPath(rows, cols);
  displayGrid(rows, cols);
}


function whichDisplay() {

  //changes the state to the exact menu
  if (state === "menu") {
    displayMenu();
  }
  if (state === "easy") {
    displayEasy();
  }
  if (state === "medium") {
    displayMedium();
  }
  if (state === "hard") {
    displayHard();
  }
}

function displayMenu() {

  // resetting the feedback everytime we go to the menu we don't show this tho
  feedback = "Type a number and press ENTER";

  //making a box with the text easy
  fill(255);
  rect(width / 4, height / 12, width / 2, height / 4);
  textSize((height + width) / 20);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Easy", width / 2, height * 5 / 24);

  //making it change state into easy if the easy box is pressed
  if (mouseIsPressed &&
    mouseX > width / 4 &&
    mouseY > height / 12 &&
    mouseX < width * 3 / 4 &&
    mouseY < height / 3) {
    state = "easy";
  }

  //making the medium mode box and giving it text
  fill(255);
  rect(width / 4, height * 9 / 24, width / 2, height / 4);
  fill(0);
  text("Medium", width / 2, height / 2);

  // making it change state into medium if the medium box is pressed
  if (mouseIsPressed &&
    mouseX > width / 4 &&
    mouseY > height * 9 / 24 &&
    mouseX < width * 3 / 4 &&
    mouseY < height * 5 / 8) {
    state = "medium";
  }

  //making the hard mode box and giving it text
  fill(255);
  rect(width / 4, height * 16 / 24, width / 2, height / 4);
  fill(0);
  text("Hard", width / 2, height * 19 / 24);

  // making it change state into hard if the hard box is pressed
  if (mouseIsPressed &&
    mouseX > width / 4 &&
    mouseY > height * 2 / 3 &&
    mouseX < width * 3 / 4 &&
    mouseY < height * 11 / 12) {
    state = "hard";
  }
}