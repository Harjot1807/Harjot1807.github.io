// Grid Based Assignment
// Harjot Singh
// March 23, 2026
//
// Extra for Experts:
// made a margin and a grid that auto adjusts to the screen
// have a reveal phase at the start that shows the entire correct grid at the start without letting the player move
// - describe what you did to take this project "above and beyond"


//makes the starting variables required for the program
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
let xBorder;
let yBorder;

//creates the canvas
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//preloads the required pictures
function preload() {
  startFinishLine = loadImage("line.png");
  glass = loadImage("Transparent.png");
  player = loadImage("player.png");
}

//runs the main function by calling them multiple times a second
function draw() {
  background(220);
  whichDisplay();
  revealAll();
}

//at the start reveals everything for 3 seconds to let the user see the correct path
function revealAll() {

  //for the first 3 seconds shows the entire grid by turning on reveal for everuthinh
  let timer = 3000;
  if (state !== "menu" && grid) {
    if (millis() < time + timer) {
      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          grid[x][y].revealed = true;
        }
      }
    }

    //after the 3 seconds turns off everything by turning off the reveal for everything
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


//moves the player if you press wasd
function keyPressed(){

  //you can only change the player position after the first 3 seconds
  if (gameOn && millis() > time + rTimer) {
    let positionAfterX = playerX;
    let positionAfterY = playerY;

    //moves up
    if (key === "w"){
      positionAfterY--;
    }

    //moves left
    if (key === "a"){
      positionAfterX--;
    }

    //moves down
    if (key === "s"){
      positionAfterY++;
    }

    //moves right
    if (key === "d"){
      positionAfterX++;
    }

    //changes and checks the cell player went to
    toggleTile(positionAfterX, positionAfterY);
  }
}

//function that allows the user to choose the mode and ouse if they dont want to use the keyboard
function mousePressed() {
  if (state === "menu"){    

    //making it change state into easy if the easy box is pressed
    if ( mouseX > width / 4 &&
      mouseY > height / 12 &&
      mouseX < width * 3 / 4 &&
      mouseY < height / 3 &&
      gameOn === false) {
      rows = 4;
      cols = 10;
      gameOn = true;
      setupLevel("easy");
    }

    //making ti change state inyo medium if the medium box is pressed
    if (mouseX > width / 4 &&
    mouseY > height * 9 / 24 &&
    mouseX < width * 3 / 4 &&
    mouseY < height * 5 / 8 &&
    gameOn === false) {
    rows = 7;
    cols = 15;
    gameOn = true;
    setupLevel("medium");
    }

    // making it change state into hard if the hard box is pressed
    if (mouseX > width / 4 &&
      mouseY > height * 2 / 3 &&
      mouseX < width * 3 / 4 &&
      mouseY < height * 11 / 12 &&
      gameOn === false) {
      rows = 11;
      cols = 22;
      gameOn = true;
      setupLevel("hard");
    }

  }

  //allows the user to use mouse if they dont want to use the keyboard
  else if (gameOn && millis() > time + rTimer){
    let x = Math.floor((mouseX - xBorder) / cellSize);
    let y = Math.floor((mouseY - yBorder) / cellSize);
      //self
    toggleTile(x, y);
  }
  

}

//main logic of the code, checks the new cell is safe or not
function toggleTile(x, y) {
 
  // makes sure that the first 3 seconds are up
  if (millis() > time + rTimer) {

    //make sure the tile you're toggling is in the grid
    if (x >= 0 && x < cols && y >= 0 && y < rows) {
      grid[x][y].revealed = true;

      //makes sure that the new square is within the direct vicinity of the user
      let isAdjacent = (abs(x-playerX) <= 1 && abs(y-playerY) <= 1);

      //if it is directly in the vicinity
      if (isAdjacent){

        //turns off the old player and the puts the player into the new cell
        grid[playerX][playerY].isPlayer = false;
        playerX = x;
        playerY = y;
        grid[playerX][playerY].isPlayer = true;
        grid[x][y].revealed = true;
      
        //if the new cell is not safe, tells the user they lost and retuens them to the menu
        if (!grid[x][y].isSafe) {
          alert("You lost!");
          gameOn = false;
          state = "menu";
        }

        //if the user reaches the last column tells them they win
        else if (x === cols-1) {
          alert("You Win!");
          gameOn = false;
          state = "menu";
        }
      }
    }
  }
}

//generates an empty grid
function generateEmptyGrid(levelCols, levelRows) {
  let newGrid = [];
  for (let x = 0; x < levelCols; x++) {
    newGrid.push([]);
    for (let y = 0; y < levelRows; y++) {

      //sets the required 3 categories to false
      newGrid[x].push({
        isSafe: false,
        revealed: false,
        isPlayer: false,
      });
    }
   }  
  return newGrid;
}


//displays the grid
function displayGrid(rows, cols) {

  //checks if the grid is created
  if (grid) {

    //checks every square to show their icon
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {

        //checks and makes the border
        let displayingX = x*cellSize + xBorder;
        let displayingY = y*cellSize + yBorder;

        //displays the player
        if (grid[x][y].isPlayer){
          image(player, displayingX, displayingY, cellSize, cellSize);
        }

        //displays the start and end
        else if (x === 0 || x === cols - 1) {
          image(startFinishLine, displayingX, displayingY, cellSize, cellSize);
        }

        //displays the glass
        else if (!grid[x][y].revealed) {
          image(glass, displayingX, displayingY, cellSize, cellSize);
        }

        //shows the one opened and not safe at the start
        else {
          if (grid[x][y].isSafe) {
            fill("white");
          }
          else {
            fill("black");
          }
          square(displayingX, displayingY, cellSize);
        }
     }
   } 
 }
}

//randomly chooses the correct path
function chooseCorrectPath(rows, cols) {

  //makes the start and end column safe
  for (let i = 0; i < rows; i += 1){
    grid[0][i].isSafe = true;
    grid[cols-1][i].isSafe = true;
  }

  //starts from the first column
  let currentY = Math.floor(random(rows));
  let currentX = 0;

  //chooses the random Y value and starst from there
  startY = currentY;
  while (currentX < cols) {

    //chooses a random number - 3 options
    grid[currentX][currentY].isSafe = true;
    let move = Math.floor(random(3));

    //if it is 0- goes straight and makes it safe
    if (move === 0) {
      currentX++;
    }

    //if it is 1- goes up and makes it safe, it also checks if it is in the grid
    else if (move === 1 && currentY > 0) {
      currentY--;
    }

    //if it is 2- goes down and makes it safe, it also checks if it is in the grid
    else if (move === 2 && currentY < rows - 1) {
      currentY++;
    }
  }
}

//makes the cellsize so it is perfectly centered
function checkCellSize(cellSizeWidth, cellSizeHeight) {

  //sets the maximum height and width ensuring border
  let maxWidth = (width * 0.9) / cols;
  let maxHeight = (height * 0.9) / rows;

  // if the height is bigger
  if (maxWidth < maxHeight) {
    cellSize = maxWidth;
  }

  //if the width is bigger
  else {
    cellSize = maxHeight;
  }
 
  //sets the border perfectly
  xBorder = (width - (cols * cellSize)) / 2;
  yBorder = (height - (rows * cellSize)) / 2;
}

//displays the easy function if they choose that
function displayEasy() {
  displayGrid(4, 10);
}

//displays the medium function if they choose that
function displayMedium() {
  displayGrid(7, 15);
}

//displays the hard function if they choose that
function displayHard() {
  displayGrid(11, 22);
}

  //changes the state to the exact menu
function whichDisplay() {

  //if state is menu
  if (state === "menu") {
    displayMenu();
  }

  //if tehe state is easy
  else if (state === "easy" && gameOn === true) {
    displayEasy();
  }

  //if the state is medium
  else if (state === "medium" && gameOn === true) {
    displayMedium();
  }

  //if the state is hard
  else if (state === "hard" && gameOn === true) {
    displayHard();
  }
}

//if the state is menu, displays it
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


  //making the hard mode box and giving it text
  fill(255);
  rect(width / 4, height * 16 / 24, width / 2, height / 4);
  fill(0);
  text("Hard", width / 2, height * 19 / 24);
}


//function that calls in every function
function setupLevel(difficulty) {

  //while the game is on
  if (gameOn){

    //sets the difficulyy and time
    state = difficulty;
    time = millis();

    //calls the previous functions required for the program to work
    checkCellSize();  
    grid = generateEmptyGrid(cols, rows);
    chooseCorrectPath(rows, cols);

    //starts the player and turns on the player there and makes it revealed
    playerX = 0;
    playerY = startY;
    grid[playerX][playerY].isPlayer = true;
    grid[playerX][playerY].revealed = true;
  }
}