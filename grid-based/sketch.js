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

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function preload(){

}


function draw() {
  background(220);
  whichDisplay();
}

function whichDisplay() {

  //changes the state to the exact menu
  if (state === "menu") {
    displayMenu();
  }
  if (state === "easy") {
    displayEasy();
  }
  if (state === "custom") {
    displayCustom();
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
  textSize((height+width)/20);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Easy", width / 2, height * 5 / 24);

  //making it change state into easy if the easy box is pressed
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height/12 &&
      mouseX < width*3/4 &&
      mouseY < height/3) {
    state = "easy";
  }

  //making the medium mode box and giving it text
  fill(255);
  rect(width / 4, height * 9 / 24, width / 2, height / 4);
  fill(0);
  text("Medium", width / 2, height / 2);

  // making it change state into medium if the medium box is pressed
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*9/24 &&
      mouseX < width*3/4 &&
      mouseY < height*5/8) {
    state = "medium";
  }

  //making the hard mode box and giving it text
  fill(255);
  rect(width / 4, height * 16 / 24, width / 2, height / 4);
  fill(0);
  text("Hard", width / 2, height * 19 / 24);

  // making it change state into hard if the hard box is pressed
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*2/3 &&
      mouseX < width*3/4 &&
      mouseY < height*11/12) {
    state = "hard";
  }
}

function revealAll() {
  
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  //self
  toggleTile(x, y);
}

function toggleTile(x, y) {
  //make sure the tile you're toggling is in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x].revealed === false) {
      grid[y][x].revealed = true;
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(DEAD_CELL);
    }
  }
  return newGrid;
}