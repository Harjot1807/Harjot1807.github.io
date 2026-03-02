// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "menu";
let numberGuess;
let gameInitialized = false;
let userGuess;
let numericalGuess;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  whichDisplay();
}

function displayMenu() {
  rect(width / 4, height / 12, width / 2, height / 4);
  textSize((height+width)/20);
  textAlign(CENTER, CENTER);
  text("Easy", width / 2, height * 5 / 24);
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height/12 &&
      mouseX < width*3/4 &&
      mouseY < height/3) {
    state = "easy";
  }
  //add difficulty text

  rect(width / 4, height * 9 / 24, width / 2, height / 4);
  text("Hard", width / 2, height / 2);
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*9/24 &&
      mouseX < width*3/4 &&
      mouseY < height*5/8) {
    state = "hard";
  }
  //add difficulty text

  rect(width / 4, height * 16 / 24, width / 2, height / 4);
  text("Custom", width / 2, height * 19 / 24);
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*2/3 &&
      mouseX < width*3/4 &&
      mouseY < height*11/12) {
    state = "custom";
  }
  //add difficulty text
}

function displayEasy(){
  if (!gameInitialized) {
    numberGuess = random(0, 101);
    numberGuess = floor(numberGuess);
    console.log(numberGuess);
    gameInitialized = true;
  }
  
  userGuess = prompt("What is your number?");
  numericalGuess = Number(userGuess);
  while (isNaN(numericalGuess) || userGuess === "") {
    userGuess = prompt("Please input just a number");
    numericalGuess = Number(userGuess);
  }
  
  while (numericalGuess !== numberGuess) {
    if (numericalGuess > numberGuess){
      userGuess = prompt("Your number is too high; pick another number");
      numericalGuess = Number(userGuess);
      while (isNaN(numericalGuess) || userGuess === "") {
        userGuess = prompt("Please input just a number");
        numericalGuess = Number(userGuess);
      }
    }
    if (numericalGuess < numberGuess){
      userGuess = prompt("Your number is too low; pick another number");
      numericalGuess = Number(userGuess);
      while (isNaN(numericalGuess) || userGuess === "") {
        userGuess = prompt("Please input just a number");
        numericalGuess = Number(userGuess);
      }
    }
  }

  if (numericalGuess === numberGuess){
    gameInitialized = false;
    alert("Congratulations, you got the number!! Press ESCAPE to return to the menu");
  }
}

function displayCustom(){
  
}

function displayHard(){
  if (!gameInitialized) {
    numberGuess = random(0, 1001);
    numberGuess = floor(numberGuess);
    console.log(numberGuess);
    gameInitialized = true;
  }
  
  userGuess = prompt("What is your number?");
  numericalGuess = Number(userGuess);
  while (isNaN(numericalGuess) || userGuess === "") {
    userGuess = prompt("Please input just a number");
    numericalGuess = Number(userGuess);
  }
  
  while (numericalGuess !== numberGuess) {
    if (numericalGuess > numberGuess){
      userGuess = prompt("Your number is too high; pick another number");
      numericalGuess = Number(userGuess);
      while (isNaN(numericalGuess) || userGuess === "") {
        userGuess = prompt("Please input just a number");
        numericalGuess = Number(userGuess);
      }
    }
    if (numericalGuess < numberGuess){
      userGuess = prompt("Your number is too low; pick another number");
      numericalGuess = Number(userGuess);
      while (isNaN(numericalGuess) || userGuess === "") {
        userGuess = prompt("Please input just a number");
        numericalGuess = Number(userGuess);
      }
    }
  }

  if (numericalGuess === numberGuess){
    gameInitialized = false;
    alert("Congratulations, you got the number!! Press ESCAPE to return to the menu");
  }
}


function whichDisplay() {
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

function keyPressed() {
  if (keyCode === ESCAPE){
    gameInitialized = false;
    state = "menu";
    return state;
  }
}