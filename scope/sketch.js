// Scope demo
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let number = 80;

function setup() {
  createCanvas(700, 400);
  background("black");
  stroke("white");
  noLoop();
}

function draw() {
  line(number, 0, number, height);
  number = 50;
  
  for (let number = 120; number < 200; number +=2 ) {
    line(number, 0, number, height);
    // console.log(number);
  }

  drawAnotherLine();

  drawYetLine();
}

function drawAnotherLine() {
  let number = 320;
  line(number, 0, number, height);}

function drawYetLine () {
  line(number + 5, 0, number+ 5, height);
}

