import React, { useEffect, useRef, useState } from "react";
let options = {
  inputs: 34,
  outputs: 3,
  task: "classification",
  debug: true,
};

function VideoPlayer() {
  const videoPlayer = useRef();
  const [stateplaying, setStateplaying] = useState(false);
  const [videoStart, setVideoStart] = useState(false);
  const [poseNet, setPoseNet] = useState(null);
  const [brain, setBrain] = useState(null);

  function LoadAi() {
    stateplaying = true;
    // eslint-disable-next-line no-undef
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
    let options = {
      inputs: 34,
      outputs: 3,
      task: "classification",
      debug: true,
    };
    // eslint-disable-next-line no-undef
    setBrain(ml5.neuralNetwork(options));
  }

  async function start() {
    if (!stateplaying && videoPlayer) {
      // const stream =await  navigator.mediaDevices.getUserMedia({video:true,audio:false})
      //   videoPlayer.current.srcObject=stream
      //   videoPlayer.current.play()
      // eslint-disable-next-line no-undef
      const pp = ml5.imageClassifier("MobileNet", modelLoaded);
      setPoseNet(pp);
      var image = new Image();
      image.crossOrigin = "anonymous";
      image.src =
        "https://myfitsta.s3.us-east-2.amazonaws.com/29f4f55f-de9e-469d-bb95-44f57e9339f0.jpeg";
      image.width = 500;
      image.height = 500;
      pp.classify(image, gotPoses);

      console.log(videoPlayer.current);
      setVideoStart(true);
    } else {
      console.log("already playing");
    }
  }

  function modelLoaded() {
    console.log("poseNet ready");
  }
  function gotPoses(poses) {
    console.log(poses);
    if (!poses) return;
    if (poses.length > 0) {
      let pose = poses[0].pose;
      let skeleton = poses[0].skeleton;
    }
  }
  if (poseNet) {
    // poseNet.on('pose', gotPoses)
  }

  useEffect(() => {
    setTimeout(() => {
      start();
    }, 3000);
  }, []);

  return (
    <div className="wraperr-box-video">
      {/* <video className="vivv" ></video> */}
      <img
        ref={videoPlayer}
        src="https://myfitsta.s3.us-east-2.amazonaws.com/29f4f55f-de9e-469d-bb95-44f57e9339f0.jpeg"
      />
    </div>
  );
}
export default VideoPlayer;
