// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let theGrid = [[1, 0, 0, 0],
[1, 0, 1, 0],
[0, 1, 0, 0],
[0, 0, 1, 1]];

const SQUARE_DIMEN = theGrid.length;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showGrid();
}

function showGrid(){
  for (let y = 0; y < SQUARE_DIMEN; y++){
    for (let x = 0; x < SQUARE_DIMEN; x++){
      if (theGrid[y][x] === 1){
        fill("black");
      }
      else if (theGrid[y][x] === 0){
        fill("white");
      }
      rect(x*(width/SQUARE_DIMEN), y*(width/SQUARE_DIMEN), width/SQUARE_DIMEN, height/SQUARE_DIMEN);
    }
  }
}
