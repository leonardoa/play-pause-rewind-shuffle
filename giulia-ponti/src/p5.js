let classifier;

let video;
let label = "";
let value = "";
let ready = false;

let poseNet;
let poses = [];
let distance = 0;

let statusImage = 0;

function setup() {
  createCanvas(320, 260);
  //video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();
  //posenet
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
}

function modelReady() {
  console.log("Model Loaded");
}

//start video and face recognition 
function draw() {
  ready = true;
  background(0);
  // Draw the video
  image(video, 0, 0);

  drawKeypoints();

}

//face recognition
function drawKeypoints() {
  let i = 0;
  if (poses[0]) {
    let pose = poses[i].pose;

    let nose = pose.nose;
    let LeftEye = pose.leftEye;
    let rightEye = pose.rightEye;
    let leftWrist = pose.leftWrist;
    let rightWrist = pose.rightWrist;

    //distance between left eye and nose
    distance = dist(LeftEye.x, LeftEye.y, nose.x, nose.y);

    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      //style keypoints
      fill(0, 0, 255);
      ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      textSize(10);
      text(keypoint.part, keypoint.position.x + 5, keypoint.position.y + 5);
        }
      }
    }

