// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let state = "menu";

function setup() {
  createCanvas(480, 480);
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
  text("Medium", width / 2, height / 2);
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*9/24 &&
      mouseX < width*3/4 &&
      mouseY < height*5/8) {
    state = "medium";
  }
  //add difficulty text

  rect(width / 4, height * 16 / 24, width / 2, height / 4);
  text("Hard", width / 2, height * 19 / 24);
  if (mouseIsPressed &&
      mouseX > width/4 &&
      mouseY > height*2/3 &&
      mouseX < width*3/4 &&
      mouseY < height*11/12) {
    state = "hard";
  }
  //add difficulty text
}

function displayEasy(){
  keyPressed();
}

function displayMedium(){
  keyPressed();
}

function displayHard(){
  keyPressed();
}

function whichDisplay() {
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

function keyPressed() {
  if (keyCode === ESCAPE){
    state = "menu";
    return state;
  }
}