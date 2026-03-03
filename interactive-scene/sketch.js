// Number Guessing Game
// Harjot Singh
// March 3,2026
//
// Extra for Experts:
// used strings
// 

// set variables that will be used later
let state = "menu";
let numberGuess;
let gameInitialized = false;
let userGuess = "";
let numericalGuess;
let feedback = "";

//standard setup function
function setup() {
  createCanvas(windowWidth, windowHeight);
}

//draw function in which it chooses which display it wants to show from the function
function draw() {
  background(220);
  whichDisplay();
}

//if the state is menu it will display this
function displayMenu() {

  // resetting the feedback everytime we go to the menu we don't show this tho
  feedback = "Type a number and press ENTER"

  //making a box with the text easy
  fill(255);
  rect(width / 4, height / 12, width / 2, height / 4);
  textSize((height+width)/20);
  textAlign(CENTER, CENTER);
  fill(0);
  text("Easy, 1-100", width / 2, height * 5 / 24);

  //making it change state into easy if the easy box is pressed
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height/12 &&
      mouseX < width*3/4 &&
      mouseY < height/3) {
    state = "easy";
  }

  //making the hard mode box and giving it text
  fill(255);
  rect(width / 4, height * 9 / 24, width / 2, height / 4);
  fill(0);
  text("Hard, 1-1000", width / 2, height / 2);

  // making it change state into hard if the hard box is pressed
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*9/24 &&
      mouseX < width*3/4 &&
      mouseY < height*5/8) {
    state = "hard";
  }

  //making the custom mode box and giving it text
  fill(255);
  rect(width / 4, height * 16 / 24, width / 2, height / 4);
  fill(0);
  text("Custom", width / 2, height * 19 / 24);

  // making it change state into custom if the custom box is pressed
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*2/3 &&
      mouseX < width*3/4 &&
      mouseY < height*11/12) {
    state = "custom";
  }
}

// if the state is easy
function displayEasy(){

  // allows game to run, also picks an integer between 1 and 100
  if (!gameInitialized) {
    numberGuess = random(0, 101);
    numberGuess = floor(numberGuess);
    gameInitialized = true;
  }
   
  // text which will give feedback to the user
  textAlign(CENTER, CENTER);
  textSize(50);
  text(feedback, width/2, height/3);

  // text that shows what the user has typed
  textSize(50);
  fill(0);
  text(userGuess, width / 2, height/2);

  // text that reminds the user they can go back to the menu whenever they want
  textSize(15);
  text("Press ESCAPE to return to menu", width/2, height*11/12)
}

//if the state is custom
// my plan was that the user can choose the upper and lower limit they want it to randomize from
// if I ever get time I will do this, track is killing me
function displayCustom(){
  text("Coming soon", width/2, height/2)
}

// if the state is hard
function displayHard(){

  //allows game to run, chooses a random integer between 1 and 1000
  if (!gameInitialized) {
    numberGuess = random(0, 1001);
    numberGuess = floor(numberGuess);
    gameInitialized = true;
  }
 
  //displays the feedback to the user (feedback is made in the last function)
  textAlign(CENTER, CENTER);
  textSize(50);
  text(feedback, width/2, height/3);

  //displays what the user has written till now
  textSize(50);
  fill(0);
  text(userGuess, width / 2, height/2);

  // reminds the user they can exit back to the menu
  textSize(15);
  text("Press ESCAPE to return to menu", width/2, height*11/12)
}

//function that checks the state to see which menu to display
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

//if numerical keys or escape, backspace or enter is pressed
function keyPressed() {

  // if escape is pressed it will change the display back to menu and reset all the 'game' mechanics and tell the code that the game is off
  if (keyCode === ESCAPE){
    gameInitialized = false;
    state = "menu";
    userGuess = "";
    feedback = "";
  }

  //if we are in the easy or hard mode (it would had included custom if I made it)
  if (state === "easy" || state === "hard"){

    //if the user presses a numerical key, it adds that number to their guess
    if (key >= '0' && key <= '9'){
      userGuess += key;
    }

    //if the user presses backspace, it deletes their last digit
    else if (keyCode === BACKSPACE) {
      userGuess = userGuess.substring(0, userGuess.length - 1)
    }

    // if the user presses enter it checks their guess
    else if (keyCode === ENTER) {
      numericalGuess = Number(userGuess);

      //if by any chance they get around and input a non number, the computer will ask for a number only
      if (userGuess === "" || isNaN(numericalGuess)){
        feedback = "Please input a number only";
      }

      //if the number is too high
      else if (numericalGuess > numberGuess) {
        feedback = "Your number is too high"
      }

      //if the number is too low
      else if (numericalGuess < numberGuess) {
        feedback = "Your number is too low"
      }

      //they got the number
      else {
        feedback = "Congratulatons, you got the correct number!!"
      }

      //resets their guess
      userGuess = "";
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}