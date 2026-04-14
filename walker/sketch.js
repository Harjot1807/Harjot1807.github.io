// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
class Walker {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = "red";
    this.speed = 5;
    this.diameter = 10;
  }

  display(){
    fill(this.color);
    stroke(this.color);
    circle(this.x, this.y, this.diameter);
  }

  move(){
    let choice = random(100);

    if (choice < 25){
      this.x += this.speed;
    }
    else if (choice < 50){
      this.x -= this.speed;
    }
    else if (choice < 75){
      this.y += this.speed;
    }
    else{
      this.y -= this.speed;
    }
    
  }
}

let harjot;
let mitt;

function setup() {
  createCanvas(windowWidth, windowHeight);
  harjot = new Walker(width/2, height/2);
  mitt = new Walker(width/4, height/2);
  mitt.color = "blue";
}

function draw() {
  harjot.display();
  harjot.move();
  mitt.display();
  mitt.move();
}
