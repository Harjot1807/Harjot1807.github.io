// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawField();
}

//draws the basic 5x5 grid
function drawField() {
  for (let i = 1; i <5; i++) {
    line(width*i/5, 0, width*i/5, height);
  }
  for (let j = 1; j <5; j++) {
    line(0, height*j/5, width, height*j/5);
  }
}

//function that will track the money based on the box clicked
function trackMoney(){
  let money = 500;
  if (mousePressed){}
}

//giving values and different colors to each gem and mine
function giveValues() {

}


