// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let myCar;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let myCar = new Vehicle("car", "Kona");
}

function draw() {
  background(220);
}

class Vehicle {
  constructor(type, name){
    this.type = type;
    this.name = name;
  }

  getName(){
    return this.name;
  }

  getType(){
    return this.type;
  }
}
