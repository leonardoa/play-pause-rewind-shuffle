let classifier;
let imageModelURL = "https://teachablemachine.withgoogle.com/models/PdFD_Qpz-/";
// let imageModelURL = "https://teachablemachine.withgoogle.com/models/PdFD_Qpz-/";


let video;
let flippedVideo;
let label = "";
let value = "";
let ready = false;
let distanceMapped = 0;
let wristDxInside = 0;
let wristSxInside = 0;

///
let poseNet;
let poses = [];


function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 240);
  
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  classifyVideo();
  flippedVideo.hide();

  ///
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
    poses = results;
  });
}

///
function modelReady() {
  console.log("Model Loaded");
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


  ///
  drawKeypoints();
  drawSkeleton();

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


////
function drawKeypoints() {
  let i = 0;
  /*
  If pose net recognises a person.
  */
  if (poses[0]) {
    /*
    We can get the position of the body
    */
    let pose = poses[i].pose;

    let nose = pose.nose;
    let LeftEye = pose.leftEye;
    let rightEye = pose.righttEye;
    let leftWrist = pose.leftWrist;
    let rightWrist = pose.rightWrist;

    /*
    We can calculate the distance.
    We can calculate the distance of the human from the computer 
    by making a calculation that understands the space       
    between the nose and the eye.
    */
    let distance = dist(LeftEye.x, LeftEye.y, nose.x, nose.y);
    // distanceMapped the distance for real distance between face and screen
    distanceMapped = map(distance,20,200,3,25);
    // console.log(distanceMapped)

    /*
    If our nose is on the right of the screen we can do something.
    If the left arm is up, we can do something else.
    */
    if (leftWrist.y < height / 2) {
      bg = "rgba(0,255,0,1)";
    } else if (rightWrist.y < height / 2) {
      bg = "rgba(255,255,0,1)";
    } else if (nose.x > width / 2) {
      bg = "rgba(220,220,220,1)";
    } else {
      bg = "rgba(255,0,0,1)";
    }

    // position of the wrist (left and right) for the next and prev function
    //  console.log(rightEye.x)

    if(rightWrist.confidence > 0.3 ) {
      console.log(rightWrist.confidence)
      wristDxInside = true;
    }
    else {
      wristDxInside = false;
    }

    if (leftWrist.confidence > 0.3) {
      wristSxInside = true;
    }
    else {
      wristSxInside = false;
    }


    /*
    Here we draw the nose/face and the rest of joint
    The for is a loop. 
    In this case the for loops all the body positions that pose net returns.
    */

    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.score > 0.2) {
        if (keypoint.part == "nose") {
          fill(0, 0, 255);
          ellipse(keypoint.position.x, keypoint.position.y, distance,   distance);
        } else {
          fill(0, 0, 255);
          ellipse(keypoint.position.x, keypoint.position.y, 5, 5);
          textSize(8);
          text(keypoint.part, keypoint.position.x + 5, keypoint.position.y + 5);
        }
        noStroke();
      }
    }
  }
}

/*
In this case, however, we are going to draw the skeleton.
That is, all the lines that connect the joints of the body.
*/
function drawSkeleton() {
  let i = 0;
  if (poses[0]) {
    let skeleton = poses[i].skeleton;
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      noFill();
      stroke(0, 0, 255);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y
      );
    }
  }
}
