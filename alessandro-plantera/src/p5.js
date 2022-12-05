const modelURL = 'https://teachablemachine.withgoogle.com/models/J3B4aUkU3/';
// the json file (model topology) has a reference to the bin file (model weights)
const checkpointURL = modelURL + "model.json";
// the metatadata json file contains the text labels of your model and additional information
const metadataURL = modelURL + "metadata.json";


const flip = true; // whether to flip the webcam
let model;
let totalClasses;
let myCanvas;
let label = "None Yet";
let probability = "";
let poser;
let video;
let ready = false;

// A function that loads the model from the checkpoint
async function load() {
  model = await tmPose.load(checkpointURL, metadataURL);
  totalClasses = model.getTotalClasses();
  console.log("Number of classes, ", totalClasses);
}


async function setup() {
  myCanvas = createCanvas(400, 400);
  // Call the load function, wait until it finishes loading
  videoCanvas = createCanvas(320, 240)

  await load();
  video = createCapture(VIDEO, videoReady);
  video.size(320, 240);
  video.hide();

}

function draw() {
  background(255);
  if(video) image(video,0,0);
  fill(255,0,0)
  textSize(18);
  text("Result:" + label, 10, 40);

  text("probability:" + probability, 10, 20)
  ///ALEX insert if statement here testing label against apppropriate part of array for this time in your video

  textSize(8);
  if (poser) { //did we get a skeleton yet;
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


async function predict() {
  // Prediction #1: run input through posenet

  // predict can take in an image, video or canvas html element
  const flipHorizontal = true;
  const {
    pose,
    posenetOutput
  } = await model.estimatePose(
    video.elt, //webcam.canvas,
    !flipHorizontal
  );
  // Prediction 2: run input through teachable machine classification model
  const prediction = await model.predict(
    posenetOutput,
    flipHorizontal,
    totalClasses
  );

//   console.log(prediction);
  
  // Sort prediction array by probability
  // So the first classname will have the highest probability
  const sortedPrediction = prediction.sort((a, b) => -a.probability + b.probability);

  //communicate these values back to draw function with global variables
  label = sortedPrediction[0].className;
  probability = sortedPrediction[0].probability.toFixed(2);
  if (pose) poser = pose.keypoints; // is there a skeleton
  predict();
  ready = true;
}