var a, r, g, b;

var c, w;

var scroll;

var darkTree = false;
var toColor, fromColor;
var darkColor, lightColor;
var treeColor;

function tree(length, angle){
  if(length<4)
    return;
  line(0,0,0,-length);
  translate(0, -length);
  push();
  rotate(angle);
  tree(length*2/3, angle);
  pop();
  rotate(-angle);
  tree(length*2/3, angle);
}

function clamp(x, min, max){
  return Math.min(Math.max(x, min), max);
}

function setup(){
  a = 0;
  r = 255; 
  g = 255;
  b = 255;

  c = color(r,g,b);
  w = color(0,0,0);

  darkColor = color(0, 107, 179);
  lightColor = color(153, 221, 255)

  fromColor = darkColor;
  toColor = lightColor;
  treeColor = fromColor;

  initDark();

  frameRate(60);
  var canvas = createCanvas(windowWidth,windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  canvas.style('top', '135px');
  stroke(treeColor);
  strokeWeight(5);
  resetMatrix();
  translate(width/2, height);
  clear();
  tree(windowHeight/2.9, a);
  if(!animStart)
    setTimeout(function(){animStart=true}, 2000);
}

var animTime = 5;
var totTime = 0;
var animStart = false;

function startAnim(){
  // loop();
  animStart = true;
}

function draw(){
  if(animStart){
    totTime += deltaTime/1000.;

    drawTree();
    
    if(totTime > animTime){
      noLoop();
    }
  }
}

function drawTree(){
  //Calculate animation angle using exponential
  var B = 6;
  var x = clamp(map(totTime, 0, animTime, 1, 5),0,5);
  var y = Math.log(x)/Math.log(B);

  a = map(y, 0, Math.log(5)/Math.log(B), 0, PI/4.0);
  treeColor = lerpColor(fromColor, toColor, y/(Math.log(5)/Math.log(B)));
  
  stroke(treeColor);
  strokeWeight(5);
  resetMatrix();
  translate(width/2, height);
  clear();
  tree(windowHeight/2.9, a);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  if(totTime > animTime){
    drawTree();
  }
}

function mouseMoved(){
  //a = map(mouseX, 0, width, PI/8.0, PI/4.0);
  // r = map(mouseX, 0, width, 0, 255);
  // g = map(mouseY, 0, height, 0, 255);
  // b = map(mouseX*mouseY, 0, width*height, 0, 255);
  // c = color(r,g,b);
}

function toggleDark(){
  if(!dark){
    fromColor = darkColor;
    toColor = lightColor;
  }
  else {
    fromColor = lightColor;
    toColor = darkColor;
  }
  
  drawTree();
}