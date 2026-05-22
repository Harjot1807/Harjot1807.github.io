//serpienski traingle demo

let initialTriangle = [
  {x: 470, y: 100},
  {x: 70, y: 700},
  {x: 870, y: 700}
];

let theDepth = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
}

function mousePressed(){
  if (theDepth < 9){

    theDepth++;
    background("white");
    serpienski(initialTriangle, theDepth);
  }
}

function serpienski(points, depth){
  triangle(points[0].x, points[0].y,
    points[1].x, points[1].y,
    points[2].x, points[2].y,
  );

  //base case
  if(depth > 0){
    serpienski([points[0], 
      midPoint(points[0], points[1]),
      midPoint(points[0], points[2])],  
    depth-1
    );

    serpienski([points[2], 
      midPoint(points[1], points[2]),
      midPoint(points[0], points[2])],  
    depth-1
    );

    serpienski([points[1], 
      midPoint(points[1], points[2]),
      midPoint(points[0], points[1])],  
    depth-1
    );
  }

  //top triange
}

function midPoint(point1, point2){
  let midX = (point1.x + point2.x)/2;
  let midY = (point1.y + point2.y)/2;
  return {x: midX, y: midY};
}
