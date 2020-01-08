let size = 50;
let arr;
let strokeSize;

let c1 = 0, c2 = 1;

let end=false;
let s=false;

function setup(){
  background(0,0,0);
  createCanvas(windowWidth, windowHeight-30);
  document.body.style.backgroundColor = color(0,0,0);
  let btn = createA("#","Reset");
  btn.id('jsTest');
  btn.style('background-color', 'gray')
  //btn.style('height', 30);
  btn.mousePressed(reset);
  s = true;
  frameRate(100);
  strokeSize = int(width/size);
  
  arr = [];
  
  for(let x=0;x<size;++x){
    arr[x] = int(x+1); 
  }
  
  shuffle(arr, true);
  dispArrBar(1,2);
}

function draw(){
  if(end)
    endDisp();
  else
    bubbleSort();
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight-30);
  strokeSize = int(width/size);
}

//Bar graph way to display array
function dispArrBar(c1, c2){
  translate(0, height);
  scale(1, -1);
  strokeWeight(.5);
  rectMode(CORNERS);
  for(var i=0;i<size;++i){
    if(i==c1||i==c2)
      fill(255,0,0);
    else
      fill(255,255,255);
      rect(strokeSize*i, 0, strokeSize*(i+1), arr[i]*(height/size));
  }
}

var endInd=0;
function endDisp(){
  translate(0, height);
  scale(1, -1);
  strokeWeight(.5);
  if(endInd<size){
    fill(0,255,0);
    rect(strokeSize*endInd, 0, strokeSize*(endInd+1), arr[endInd]*(height/size));
    ++endInd;
  }
}

var i=0;
function bubbleSort(){
  background(0);
  if(i<size-1){
    c2=c1+1;
    dispArrBar(c1,c2);
    if(arr[c1]>arr[c2]){
      var temp=arr[c1];
      arr[c1]=arr[c2];
      arr[c2]=temp;
    }
    ++c1;
    if(c1>size-i-2){
      ++i; 
      c1=0;
    }
  } 
  else
    end = true;
}

var j=-1;
function insertionSort(){
  background(0);
  if(j<size){
    if(i>=0){
      
    }
    else{
      j++;
      i=j-1;
    }
    i--;
  }
  else
    end = true;
}

function reset(){
  removeElements();
  c1 = 0, c2 = 1;
  i=0;
  j=0;
  endInd=0;
  end = false;
  clear();
  setup();
}