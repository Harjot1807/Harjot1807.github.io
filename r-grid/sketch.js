// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 250;
let rows;
let columns;
let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  columns = Math.floor(width/CELL_SIZE);
  grid = generateGrid(columns, rows);
}

function draw() {
  background(220);
  drawGrid();
}

function generateGrid(columns, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++ ){
    newGrid.push([]);
    for (let x = 0; x < columns; x++){
      newGrid[y].push(chooseRandom());
    }
  }
  return newGrid;
}

function chooseRandom(){
  if (random(100) < 50){
    return 0;
  }
  else {
    return 1;
  }
}

function drawGrid(){
  for (let y = 0; y < rows; y++){
    for (let x = 0; x < columns; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      else if(grid[y][x] === 1){
        fill("black");
      }
      square(x* CELL_SIZE, y* CELL_SIZE, CELL_SIZE);
    }
  }
}

function mousePressed(){
  let mouseRows = Math.floor(mouseX/CELL_SIZE);
  let mouseColumns = Math.floor(mouseY/CELL_SIZE);

  if(grid[mouseColumns][mouseRows] === 0){
    grid[mouseColumns][mouseRows] = 1;
  }
  else if(grid[mouseColumns][mouseRows] === 1){
    grid[mouseColumns][mouseRows] = 0;
  }

  if(grid[mouseColumns-1][mouseRows] === 0){
    grid[mouseColumns-1][mouseRows] = 1;
  }
  else if(grid[mouseColumns-1][mouseRows] === 1){
    grid[mouseColumns-1][mouseRows] = 0;
  }
  
  if(grid[mouseColumns+1][mouseRows] === 0){
    grid[mouseColumns+1][mouseRows] = 1;
  }
  else if(grid[mouseColumns+1][mouseRows] === 1){
    grid[mouseColumns+1][mouseRows] = 0;
  }
  
  if(grid[mouseColumns][mouseRows-1] === 0){
    grid[mouseColumns][mouseRows-1] = 1;
  }
  else if(grid[mouseColumns][mouseRows-1] === 1){
    grid[mouseColumns][mouseRows-1] = 0;
  }
  
  if(grid[mouseColumns][mouseRows+1] === 0){
    grid[mouseColumns][mouseRows+1] = 1;
  }
  else if(grid[mouseColumns][mouseRows+1] === 1){
    grid[mouseColumns][mouseRows+1] = 0;
  }



}

function keyPressed(){
  if (key === 'r'){
    grid = generateGrid(columns, rows);
  }
  else if (key === 'e'){
    grid = generateEGrid(columns, rows);
  }
}

function generateEGrid(columns, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++ ){
    newGrid.push([]);
    for (let x = 0; x < columns; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

