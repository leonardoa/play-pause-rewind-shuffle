
let video;
let poseNet;
let poses = [];
let bg = "rgba(220,220,220,0)";
let container = document.querySelector("#container");
let distance = "";

function setup() {
  createCanvas(300, 300);

  // Activate the computer camera.
  // We initialise the camera and tell them the size.
  video = createCapture(VIDEO);
  video.size(width, height);

  // Send the room data directly to posenet.
  // Pose net is a function of ml5 that recognises the human body.
  // The results will be passed to the pose variable.
  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on("pose", function (results) {
  poses = results;
  });
}

function modelReady() {
  console.log("Model Loaded");
}

function draw() {
  background(bg);
  push();
  pop();
  drawKeypoints();
}

function drawKeypoints() {
  let i = 0;

  // If pose net recognises a person.
  if (poses[0]) {

    // Get the position of the body.
    let pose = poses[i].pose;
    let nose = pose.nose;
    let LeftEye = pose.leftEye;
    let rightEye = pose.righttEye;

    // Calculate the distance of the human from the computer.
    // This calculation understands the space between the nose and the eye.
    distance = dist(LeftEye.x, LeftEye.y, nose.x, nose.y);

    // If you bring your face closer or further away, something happens.
    // Change the colors and the texts of the joystick.

    // Zoooming in (short distance).
    if (distance >= 70) {
      bg = "rgba(0,0,0,1)";
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
          if (keypoint.part == "nose") {
            fill(0,100,0);
            stroke(255,255,255)
            strokeWeight(2.5);
            rect(keypoint.position.x - distance / 2, keypoint.position.y - distance / 2, distance, distance);
            noFill();
            rect(1.25,1.25, 297.5, 297.5);
          }
        }
      }
      fill(255,255,255);
      textAlign(CENTER)
      textSize(40)
      noStroke()
      text('ZOOM IN', width / 2, height / 2 - 50);
      textSize(14)
      text('Now try to go away!', width / 2, height / 2);
    }
		// Zooming out (average distance).
    else if (distance < 70 && distance >= 50) {
      bg = "rgba(150,0,0,1)";
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
          if (keypoint.part == "nose") {
            noFill();
            stroke(255,255,255)
            strokeWeight(2.5);
            rect(keypoint.position.x - distance / 2, keypoint.position.y - distance / 2, distance, distance);
            rect(1.25,1.25, 297.5, 297.5);
          }
        }
      }
      fill(255,255,255);
      textAlign(CENTER)
      noStroke()
      textSize(40)
      text('ZOOM OUT', width / 2, height / 2 - 50);
      textSize(14)
      text('Try to get even closer!', width / 2, height / 2); 
    }
    // View the global list of all frames (long distance).
    else if (distance < 50) {
      bg = "rgba(0,0,0,1)";
      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.score > 0.2) {
          if (keypoint.part == "nose") {
            noFill();
            stroke(255,255,255)
            strokeWeight(2.5);
            rect(keypoint.position.x - distance / 2, keypoint.position.y - distance / 2, distance, distance);
            rect(1.25,1.25, 297.5, 297.5);
          }
        }
      }
      fill(255,255,255);
      textAlign(CENTER)
      noStroke()
      textSize(14)
      text('Bring your face closer!', width / 2, height / 2); 
      text('SCROLL UP', width / 2, 40);
      text('SCROLL DOWN', width / 2, height - 35);
      stroke(255);
      line(0, height / 4, width, height / 4);
      line(0, height - height / 4, width, height - height / 4);
    }
    
    // Move your face to scroll up and scroll down the frames.
    // The scroll function dipends by the position of your nose in the joystick.
    if (nose.y > height - height / 4 && distance < 50) {
      bg = "rgba(0,0,0,1)";
      container.scrollBy({top: 20});
      console.log(container.scrollTop);
      fill(50,50,50)
      noStroke();
      rect(2.5, height - height / 4, width - 5, height / 4 - 2.5);
      fill(255,255,255)
      text('SCROLL DOWN', width / 2, height - 35);
      stroke(255);
      line(0, height / 4, width, height / 4);
      line(0, height - height / 4, width, height - height / 4);
    }
    else if (nose.y < height / 4 && distance < 50){
      bg = "rgba(0,0,0,1)";
      container.scrollBy({top: -20});
      fill(50,50,50)
      noStroke();
      rect(2.5, 2.5, width - 5, height / 4 - 2.5);
      fill(255,255,255)
      text('SCROLL UP', width / 2, 40);
      stroke(255);
      line(0, height / 4, width, height / 4);
      line(0, height - height / 4, width, height - height / 4);
    }
  }
}
