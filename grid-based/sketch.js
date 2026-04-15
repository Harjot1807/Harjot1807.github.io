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
let time;
let gameOn = false;
let player;
let playerX;
let playerY;
let startY;
let rTimer = 3000;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function preload() {
  startFinishLine = loadImage("line.png");
  glass = loadImage("Transparent.png");
  player = loadImage("player.png");
}


function draw() {
  background(220);
  whichDisplay();
  revealAll();
}



function revealAll() {
  let timer = 3000;
  if (state !== "menu" && grid) {
    if (millis() < time + timer) {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          grid[x][y].revealed = true;
        }
      }
    }
    else {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          if (!grid[x][y].isPlayer) {
            grid[x][y].revealed = false;
          }
        }
      }
    }
  }
}

function keyPressed(){
  if (gameOn && millis() > time + rTimer) {
    let positionAfterX = playerX;
    let positionAfterY = playerY;

    if (key === "w"){
      nextY--;
    }
    if (key === "a"){
      nextX--;
    }
    if (key === "s"){
      nextY++;
    }
    if (key === "d"){
      nextX++;
    }

    toggleTile(nextX, nextY);
  }
}

function mousePressed() {
  if (state === "menu"){    

    //making it change state into easy if the easy box is pressed
    if ( mouseX > width / 4 &&
      mouseY > height / 12 &&
      mouseX < width * 3 / 4 &&
      mouseY < height / 3 &&
      gameOn === false) {
      rows = 4;
      cols = 6;
      gameOn = true;
      setupLevel("easy");
    }

    if (mouseX > width / 4 &&
    mouseY > height * 9 / 24 &&
    mouseX < width * 3 / 4 &&
    mouseY < height * 5 / 8 &&
    gameOn === false) {
    rows = 5;
    cols = 10;
    gameOn = true;
    setupLevel("medium");
    }

    // making it change state into hard if the hard box is pressed
    if (mouseX > width / 4 &&
      mouseY > height * 2 / 3 &&
      mouseX < width * 3 / 4 &&
      mouseY < height * 11 / 12 &&
      gameOn === false) {
      rows = 7;
      cols = 15;
      gameOn = true;
      setupLevel("hard");
    }

  }
  else if (gameOn && millis() > time + rTimer){
    let x = Math.floor(mouseX / cellSize);
    let y = Math.floor(mouseY / cellSize);
      //self
    toggleTile(x, y);
  }
  

}

function toggleTile(x, y) {

  if (millis() > time + rTimer) {
  //make sure the tile you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    grid[x][y].revealed = true;

    let isAdjacent = (abs(x-playerX) <= 1 && abs(y-playerY) <= 1);

    if (isAdjacent){
      grid[playerX][playerY].isPlayer = false;
      playerX = x;
      playerY = y;
      grid[playerX][playerY].isPlayer = true;

      grid[x][y].revealed = true;
    
      if (!grid[x][y].isSafe) {
        gameOn = false;
        state = "menu";
      }

      else if (x === cols-1) {
        alert("You Win!");
        gameOn = false;
        state = "menu";
      }
    }
  }
}

function generateEmptyGrid(levelCols, levelRows) {
  let newGrid = [];
  for (let x = 0; x < levelCols; x++) {
    newGrid.push([]);
    for (let y = 0; y < levelRows; y++) {
      newGrid[x].push({
        isSafe: false,
        revealed: false,
        isPlayer: false,
      });
    }
   }
  }
  return newGrid;
}

function displayGrid(rows, cols) {
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (grid[x][y].isPlayer){
        image(player, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (x === 0 || x === cols - 1) {
        image(startFinishLine, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (!grid[x][y].revealed) {
        image(glass, x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else {
        if (grid[x][y].isSafe) {
          fill("white");
        }
        else {
          fill("black");
        }
        square(x * cellSize, y * cellSize, cellSize);
      }
    }
  }
}

function chooseCorrectPath(rows, cols) {
  let currentY = Math.floor(random(rows));
  let currentX = 0;

  startY = currentY;

  while (currentX < cols) {
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
  displayGrid(4, 6);
}

function displayMedium() {
  displayGrid(5, 10);
}

function displayHard() {
  displayGrid(7, 15);
}


function whichDisplay() {

  //changes the state to the exact menu
  if (state === "menu") {
    displayMenu();
  }
  else if (state === "easy" && gameOn === true) {
    displayEasy();
  }
  else if (state === "medium" && gameOn === true) {
    displayMedium();
  }
  else if (state === "hard" && gameOn === true) {
    displayHard();
  }
}

function displayMenu() {

  //making a box with the text easy
  fill(255);
  rect(width / 4, height / 12, width / 2, height / 4);
  textSize((height + width) / 40);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Easy", width / 2, height * 5 / 24);


  //making the medium mode box and giving it text
  fill(255);
  rect(width / 4, height * 9 / 24, width / 2, height / 4);
  fill(0);
  text("Medium", width / 2, height / 2);

  // making it change state into medium if the medium box is pressed


  //making the hard mode box and giving it text
  fill(255);
  rect(width / 4, height * 16 / 24, width / 2, height / 4);
  fill(0);
  text("Hard", width / 2, height * 19 / 24);


}

function setupLevel(difficulty) {
  if (gameOn){
    state = difficulty;
    time = millis();
    checkCellSize(width / cols, height / rows);
    
    grid = generateEmptyGrid(cols, rows);
    chooseCorrectPath(rows, cols);

    playerX = 0;
    playerY = startY;
    grid[playerX][playerY].isPlayer = true;
  }
}