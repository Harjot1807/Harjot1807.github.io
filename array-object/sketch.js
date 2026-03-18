// Array Object Assignment
// Harjot Singh
// March 18, 2026
//
// Extra for Experts:
// - used /n and backticks to sepearate lines
// - used complicated math to make a visual grid
//- used different alignments and modes
//added spunds

//makes the variables and arrays required for the entire code
const GRIDSIZE = 25;
let no_of_mines = 3;
let grid = [];
let gameOver = false;
let mineArray = [];
let gem;
let cross;
let gameWon = false;
let mineSound;

//this function preloads the images and sounds of the gems and mines
function preload() {
  gem = loadImage('gemsquare.jpg');
  cross = loadImage('cross.jpg');
  mineSound = loadSound('explosion.mp3');
}

//this function sets up the canvas and calls to make the numerical array
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  makeArray();
}
// this functon creates every single visual element suchas the grid lines, gems and mines
function draw() {
  background(220);
  drawField();
  mineValues();
  drawPopup();
}

//draws the basic 5x5 grid (the lines)
function drawField() {

  //draws the vertical lines
  for (let i = 1; i < 5; i++) {
    line(width * i / 5, 0, width * i / 5, height);
  }

  //draws the horizontal lines
  for (let j = 1; j < 5; j++) {
    line(0, height * j / 5, width, height * j / 5);
  }
}


//making the coding grid- decides which of the 25 squares will be mines
function makeArray() {
  grid = [];
  gameOver = false;

  //it will only work if the game is going on
  if (!gameOver) {

    //it makes the array with 25 different objects, assigning different values for each
    for (let n = 0; n < GRIDSIZE; n++) {
      grid.push({
        numberID: n,
        isMine: false,
        revealed: false,
      });
    }

    // this entire section, allows the computer to randomly assign three of the squares mines
    let minesPlaced = 0;
    while (minesPlaced < no_of_mines) {
      let chooseRandom = Math.floor(Math.random() * GRIDSIZE);

      // if the square is assigned a mine, it changes the value in the object
      if (grid[chooseRandom].isMine === false) {
        grid[chooseRandom].isMine = true;
        minesPlaced++;
      }
    }
  }
}

//this function will allow the user to see if they clicked a mine or a gem
function mineValues() {

  //sets up variables necessary for this function
  let cellWidth = width / 5;
  let cellHeight = height / 5;

  //it assigns each square an indexvalue which will be checked corresponding it with the indexvalue in the array
  for (let row = 0; row <= 4; row++) {
    for (let column = 0; column <= 4; column++) {
      let indexValue = row * 5 + column;

      //if the use has revealed, it will draw either a mine or a gem
      if (grid[indexValue].revealed) {
        let x = (column + 0.5) * cellWidth;
        let y = (row + 0.5) * cellHeight;

        //drawing a mine/cross
        if (grid[row * 5 + column].isMine) {
          image(cross, x, y, cellWidth * 7 / 10, cellHeight * 7 / 10);
        }

        //drawing a gem
        else {
          image(gem, x, y, cellWidth * 7 / 10, cellHeight * 7 / 10);
        }
      }
    }
  }
}

//function that does changes when mouse is pressed
function mousePressed() {

  //it will onlyallow mouse inputs if the game is neither won nor over
  if (!gameOver && !gameWon){

    //sets up important variables
    let columnValue = Math.floor(mouseX / (width / 5));
    let rowValue = Math.floor(mouseY / (height / 5));
    let cellClicked = rowValue * 5 + columnValue;
    
    //when the square is pressed, it checks if it was previously revealed, to make sure users can't cheat by pressing the same thing 22 times.
    if (!grid[cellClicked].revealed) {
    grid[cellClicked].revealed = true;

      //if the revealed section is a mine, game is over
      if (grid[cellClicked].isMine === true) {
        gameOver = true;
        mineSound.play();
      }

      //the revealed section is a gem, we will add to a counter
      else {
      let gemCounter = 0;
        for (let i = 0; i < grid.length; i++){
          if (grid[i].revealed && !grid[i].isMine){
            gemCounter ++;
          }
        }
        
        //when the counter hits 22, all gems have been revealed which means game is won.
        if (gemCounter === 22) {
          gameWon = true;
        }
      }
    }
  }
}

//function that draws the popup when game is over/won
function drawPopup() {

  if (gameOver || gameWon) {
    //draws the base rectangle and sets everything to follow for center, including text
    fill(0);
    rectMode(CENTER);
    textSize((width+height)/90);
    textAlign(CENTER, CENTER);   
    rect(width / 2, height / 2, width / 2, height / 2);

    //sets the text, that will either choose winning or losing text
    fill("white");

    //if they lost the game, tells their odds
    if (gameOver){
      text(`Your odds of winning are 1/2300\nThis is why gambling almost always makes you lose money.\nIf you want you can keep trying.`, width/2, height/2 - height/8);
    }

    //if they beat the game, tells their odds and congratulates them
    else if (gameWon) {
      text(`Nice\nYou found all 22 gems.\nYou beat the 1/2300 odds` , width/2, height/2 - height/8);
    }

    //draws the base and asks the user if they want to play again
    rect(width/2,  height * 11/20, width / 4, height / 7);
    fill("black");
    text(`Start Again? \nPress F5`, width/2, height *11/20);   
  }
}