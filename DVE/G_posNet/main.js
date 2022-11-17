let video;
let poseNet;
let posLevelSmooth = 0
let fCenter = new p5.Vector();
let center = new p5.Vector();
let move = new p5.Vector();
let pos = new p5.Vector();
let size = new p5.Vector();
let ratio = 1;
let speed = .3;
//recupero il div #text della mia G
const lettera = document.getElementById("text")


let miniMapOn = false;

function setup() {
  createCanvas(windowWidth,windowHeight);
  video = createCapture(VIDEO);
  video.hide();
 

  poseNet = ml5.poseNet(video,modelLoaded);
  poseNet.on('pose',gotPoses);
  console.log(ml5);
  
  imageMode(CENTER);
  center.set(width/2,height/2);
}


function gotPoses(poses) {
  if(poses.length>0){
    let pose = poses[0].pose;
    
    
    
    let p1 = new p5.Vector(pose.leftEar.x,pose.leftEar.y);
    let p2 = new p5.Vector(pose.rightEar.x,pose.rightEar.y);
    
    let d = dist(p1.x,p1.y,p2.x,p2.y);
    ratio = lerp(ratio,d/200,speed);
    
    let c = p5.Vector.add(p1,p2);
    c.div(2);
    
    fCenter.lerp(c, speed);
    move = p5.Vector.sub(center,fCenter);
    let moveCal = p5.Vector.div(move,ratio);
    pos = p5.Vector.add(center,moveCal);
    size.set(width/ratio, height/ratio);
  }
}

function modelLoaded() {
  console.log('Model Loaded');
}

function draw() {

  //posLevelSmooth += (size.x - posLevelSmooth) * 0.08
  //lettera.style["font-size"] = 500 + "px"; 
  lettera.style["font-size"] = size.x/3 + "px"; //dimensione varia alla distanza

  //misuro dimensioni pagina per JS
  //const width = window.innerWidth
  //const height = window.innerHeight
 
  const deep = size.x/3
  const x = map(pos.x,width/2,width, 0,width)
  let level = map(deep/2, 0, 300, 0,100)



  //map
  const w = deep / width * 1000.0
  const c = x / width * 1000.0

  //Il CSS che va a modificare
  lettera.style["font-variation-settings"] = " 'wght' " + w + "," + " 'CONT' " + c;
  lettera.style.transform = "translateY(-" + deep*0.7 + "px)";

  console.log(w)
  console.log(c)

  if(miniMapOn) displayMiniMap(0 + 100, height - 80, 0.2);
}

function keyPressed(){

  if(keyCode == 32) miniMapOn = !miniMapOn; 
}

function displayMiniMap(x,y,dRatio){
  let moveCal = p5.Vector.mult(move,dRatio/ratio);
  let sizeCal = p5.Vector.mult(move,dRatio);
  
  noFill();
  stroke(255);
  rectMode(CENTER);
  tint(255,175);
  image(video,x + moveCal.x,y + moveCal.y,width/ratio*dRatio,height/ratio*dRatio);
  tint(255,255);
  
  rect(x + moveCal.x,y + moveCal.y, (width/ratio)*dRatio, (height/ratio)*dRatio);
  stroke(0,255,0);
  rect(x,y,width*dRatio,height*dRatio);
  stroke(255,0,0);
  rect(x,y,200*dRatio,200*dRatio);
}