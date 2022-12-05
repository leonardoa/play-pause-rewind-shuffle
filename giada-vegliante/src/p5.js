// Upload models teachable machine 
let imageModelURL = "https://teachablemachine.withgoogle.com/models/fqHnYbrd1/";

// Variables
let classifier;
let video;
let flippedVideo;
let label = "";
let value = "";
let ready = false;
let container = document.querySelector("#container");

// Preload the models ( teachable machine )
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

// Activate the computer camera
function setup() {
  createCanvas(320, 260);
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
}

// Confirms that ml5 is correctly loaded
function modelReady() {
  console.log("Model Loaded");
}

function draw() {
  background(bg);
  push();
  pop();
}

function draw() {
  ready = true;
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  fill(255);
  textSize(20);
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
