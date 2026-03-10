// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const GRIDSIZE = 25;
let no_of_mines = 3;
let grid = [];
let gameOver = false;
let balance = 500;


function setup() {
  createCanvas(windowWidth, windowHeight);
  drawGrid();
}

function draw() {
  background(220);
  drawField();
}

//draws the basic 5x5 grid (the lines)
function drawField() {
  for (let i = 1; i < 5; i++) {
    line(width * i / 5, 0, width * i / 5, height);
  }
  for (let j = 1; j < 5; j++) {
    line(0, height * j / 5, width, height * j / 5);
  }
}

//function that will track the money based on the box clicked
function trackMoney() {
  let money = 500;
  if (mousePressed) { }
}

//making the grid with actual symbols
function drawGrid() {
  grid = [];
  gameOver = false;

  for (let n = 0; n < GRIDSIZE; n++) {
    grid.push({
      numberID: n,
      isMine: false,
      revealed: false,
    });
  }

  let minesPlaced = 0;
  while (minesPlaced < no_of_mines) {
    let chooseRandom = Math.floor(Math.random() * GRIDSIZE);


    if (grid[chooseRandom].isMine === false) {
      grid[chooseRandom].isMine = true;
      minesPlaced++;
    }
  }
}

