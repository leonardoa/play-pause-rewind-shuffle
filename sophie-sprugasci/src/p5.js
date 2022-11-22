let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/PdFD_Qpz-/";

let video;
let flippedVideo;
let label = "";
let value = "";
let ready = false;

function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

function draw() {
  ready = true;
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  confidence = results[0].confidence;
  classifyVideo();
}




/*
We change the volume depending on the space between the thumb and index finger.
*/

let handPose;
let hands;
let bg = "rgb(220,220,220)";
let distance = 0;
let sound;
let volume;

function modelReady() {
  console.log("hand pose loaded");
  handpose.on("predict", gotPose);
}

function preload() {
  sound = loadSound("superpose.mp3");
}

/*
We take the information of the hand.
Machine learning recognises fingers and hand movement.
We pass this information to the variable result.
*/

function gotPose(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(160, 120);
  video.hide();
  handpose = ml5.handpose(video, modelReady);
}

function draw() {
  background(bg);

  /*
  Let's play a song
  */
  if (!sound.isPlaying()) {
    sound.play();
  }

  /*
  Place the video in the top left-hand corner. 
  This can be used to understand in real time what is happening.
  */
  if (video) {
    image(video, 0, 0);
  }

  //if hand exist
  if (hands && hands.length > 0) {
    let hand = hands[0];

    let landmarks = hand.landmarks;
    fill(0);
    stroke(0);
    for (let i = 0; i < landmarks.length; i++) {
      /*
      Here we draw the hand joints
      */
      let [x, y, z] = landmarks[i];
      ellipse(x, y, 5);
      text(i, x + 10, y + 10);
    }

    /*
    This part is a bit complicated.
    Its purpose is to draw the lines of the hand.
    */
    let annotations = hand.annotations;
    let parts = Object.keys(annotations);
    for (let part of parts) {
      for (let position of annotations[part]) {
        stroke(0);
        strokeWeight(1);
        noFill();
        beginShape();
        for (let position of annotations[part]) {
          let [x, y, z] = position;
          vertex(x, y);
        }
        endShape();
      }

      /*
      Here we draw the line showing the distance between the thumb and index finger.
      */
      stroke("rgb(0,255,0)");
      line(
        annotations.thumb[3][0],
        annotations.thumb[3][1],
        annotations.indexFinger[3][0],
        annotations.indexFinger[3][1]
      );
    }

    /*
      Here we calculate the distance between the two fingers.
    */
    distance = dist(
      annotations.thumb[3][0],
      annotations.thumb[3][1],
      annotations.indexFinger[3][0],
      annotations.indexFinger[3][1]
    );

    /*
  Here we change the volume depending 
  on the distance between index finger and thumb
  */
    volume = map(distance, 50, 175, 0, 1);
    sound.setVolume(volume);
  }
}
