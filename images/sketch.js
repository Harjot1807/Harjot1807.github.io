// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let leverImg;

function preload() {
  leverImg = loadImage("leverkusen.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(leverImg, mouseX, mouseY, leverImg.height/2, leverImg.width/2);
}
