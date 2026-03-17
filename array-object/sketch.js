// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//makes the variables and arrays required for the entire code
const GRIDSIZE = 25;
let no_of_mines = 3;
let grid = [];
let gameOver = false;
let mineArray = [];
let gem;
let cross;
let gemCounter = 0;

//this function preloads the images of the gems and mines
function preload() {
  gem = loadImage('gemsquare.jpg');
  cross = loadImage('cross.jpg');
}

//this function sets up the 
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  makeArray();
}

function draw() {
  background(220);
  drawField();
  mineValues();
  drawPopup();
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


//making the coding grid- decides which of the 25 squares will be mines
function makeArray() {
  grid = [];
  gameOver = false;
  if (!gameOver) {
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
}

function mineValues() {
  let cellWidth = width / 5;
  let cellHeight = height / 5;

  for (let row = 0; row <= 4; row++) {
    for (let column = 0; column <= 4; column++) {
      let indexValue = row * 5 + column;

      if (grid[indexValue].revealed) {
        let x = (column + 0.5) * cellWidth;
        let y = (row + 0.5) * cellHeight;

        if (grid[row * 5 + column].isMine) {
          image(cross, x, y, cellWidth * 7 / 10, cellHeight * 7 / 10);
        }
        else {
          image(gem, x, y, cellWidth * 7 / 10, cellHeight * 7 / 10);
        }
      }
    }
  }
}

function mousePressed() {
  gemCounter += 1;
  let columnValue = Math.floor(mouseX / (width / 5));
  let rowValue = Math.floor(mouseY / (height / 5));

  let cellClicked = rowValue * 5 + columnValue;
  grid[cellClicked].revealed = true;
  if (grid[cellClicked].revealed === true && grid[cellClicked].isMine === true) {
    gameOver = true;
  }

}

function drawPopup() {
  if (gameOver) {
    fill(0);
    rectMode(CENTER);
    textSize((width+height)/90);
    textAlign(CENTER, CENTER);
   
    rect(width / 2, height / 2, width / 2, height / 2);

    fill("white");
    rect(width/2,  height * 11/20, width / 4, height / 7);
    text(`Your odds of winning are 1/2300\nThis is why gambling almost always makes you lose money.\nIf you want you can keep trying.`, width/2, height/2 - height/8);
    fill("black");
    text(`Start Again? \nPress F5`, width/2, height *11/20);

    
    
  }
}