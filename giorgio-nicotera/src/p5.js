let classifier;
// let imageModelURL = "https://teachablemachine.withgoogle.com/models/lpNOobrjK/";

const modelURL = "https://teachablemachine.withgoogle.com/models/BvCjy7dwK/";


const checkpointURL = modelURL + "model.json";
const metadataURL = modelURL + "metadata.json";
let classification = "None";
let probability = "100";

let poser;
let video;
let flippedVideo;
let label = "";
let value = "";
let ready = false;

// function preload() {
//   classifier = ml5.imageClassifier(imageModelURL + "model.json");
// }

async function load() {
  model = await tmPose.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}

// function setup() {
//   createCanvas(320, 260);
  
//   video = createCapture(VIDEO);
//   video.size(320, 240);
//   video.hide();

//   flippedVideo = ml5.flipImage(video);
//   classifyVideo();
// }

async function setup() {
  myCanvas = createCanvas(400, 400);
  videoCanvas = createCanvas(320, 240);
  await load();
  video = createCapture(VIDEO, videoReady);
  video.size(320, 240);
  video.hide();
  ready = true;
}

function draw() {
  background(0);
  if (video) 
  image(video, 0, 0);
  fill(255, 0, 0);
  textSize(16);
  text("Result:" + classification, 10, 40);
  text("Probability:" + probability, 10, 20);
  textSize(8);

  label = classification;
  confidence = probability;

  if (probability > 0.8 && classification != "None") {
    push();
    textSize(200);
    fill(255);
    textAlign(CENTER);
    //text(classification, width / 2, height - 50);
    pop();

    // you can use thia part for to someting
    // if (classification == "A") {
    // } else if (classification == "O") {
    // } else if (classification == "M") {
    // } else if (classification == "T") {
    // }
  }

  if (poser) {
    for (var i = 0; i < poser.length; i++) {
      let x = poser[i].position.x;
      let y = poser[i].position.y;
      ellipse(x, y, 5, 5);
      text(poser[i].part, x + 4, y);
    }
  }
}


function videoReady() {
  console.log("Video Ready");
  predict();
}

/*
This function is to be copied and pasted.
What happens here is that we make a prediction of what the letter might be
*/
async function predict() {
  const flipHorizontal = false;
  const { pose, posenetOutput } = await model.estimatePose(
    video.elt, //webcam.canvas,
    flipHorizontal
  );
  const prediction = await model.predict(
    posenetOutput,
    flipHorizontal,
    totalClasses
  );

  const sortedPrediction = prediction.sort(
    (a, b) => -a.probability + b.probability
  );

  classification = sortedPrediction[0].className;
  probability = sortedPrediction[0].probability.toFixed(2);
  if (pose) poser = pose.keypoints; // is there a skeleton
  predict();
}

// // Get a prediction for the current video frame
// function classifyVideo() {
//   flippedVideo = ml5.flipImage(video);
//   classifier.classify(flippedVideo, gotResult);
// }

// // When we get a result
// function gotResult(error, results) {
//   if (error) {
//     console.error(error);
//     return;
//   }
//   label = results[0].label;
//   confidence = results[0].confidence;
//   classifyVideo();
// }
