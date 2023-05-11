class MYFITSTAI {
  constructor() {
    this.models = [];
  }
}

export default MYFITSTAI;

// let statesquate="close"
//  let img;
// let bar = document.querySelector(".bar")
// let rightleg="close"
// let distance
// let d
// let timeot
// let stateplaying=false
// let angle =180
// let poseNet;
// let pose;
// let skeleton;
// let counter =0
// let brain;
// let poseLabel = "";
// let score= document.getElementById("hosl-score")
// let state = 'waiting';
// let targetLabel;
// let begin = document.querySelector(".begin-ai")
// let videoo= document.querySelector(".vivv")
// let video
// let start =false
// begin.addEventListener("click",function(){
//   if (stateplaying==false) {
// navigator.mediaDevices.getUserMedia({
//   video:true,
//   audio:false
// }).then((stream)=>{
// videoo.srcObject=stream
// videoo.play()
// start=true
// LoadAi()
// //updatebar()
// document.querySelector(".display-itme-reletated").style.backgroundColor="transparent"
// begin.style.backgroundColor="rgb(255,255,255,0.1)"
// })

//   }else{
//     console.log("already playing")
//   }

// })

// function LoadAi(){
// video = createCapture(VIDEO);
// video.hide()
// stateplaying=true
// poseNet = ml5.poseNet(video, modelLoaded);
//   poseNet.on('pose', gotPoses);
//   let options = {
//     inputs: 34,
//     outputs: 3,
//     task: 'classification',
//     debug: true
//   }
//   brain = ml5.neuralNetwork(options);

// // LOAD PRETRAINED MODEL
//   //Uncomment to train your own model!
//  const modelInfo = {
//     model: 'model/model.json',
//    metadata: 'model/model_meta.json',
//   weights: 'model/model.weights.bin',
// };
// brain.load(modelInfo, brainLoaded);

// }

// function brainLoaded() {
//   console.log('pose classification ready!');
//   classifyPose();
// }

// function classifyPose() {
//   if (pose) {
//     let inputs = [];
//     for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       inputs.push(x);
//       inputs.push(y);
//     }
//     brain.classify(inputs, gotResult);
//   } else {
//       setTimeout(classifyPose, 100);

//   }
// }

// function gotResult(error, results) {
//   if (results[0].a>0.90) {
//   	statesquate="open"

//   }
//   if (results[0].c>0.90 && rightleg=="open" && start==true ){
// if (statesquate=="open") {
// 	counter= counter+1
// 	document.querySelector(".hosl-score").innerText=counter
// 	statesquate="close"

// }
//   }
// classifyPose();
//   }

// function gotPoses(poses) {

//   if (poses.length > 0 ) {
//     pose = poses[0].pose;
//     skeleton = poses[0].skeleton;
//   }
// }

// function modelLoaded() {
//   console.log('poseNet ready');
// }
// function draw() {
//   if (stateplaying==true) {
//     if (pose) {
// if (
//   pose.rightHip.confidence>0.90&&
//   pose.rightKnee.confidence>0.90&&
//   pose.rightAnkle.confidence>0.90&&
//   pose.rightShoulder.confidence>0.90&&
//    pose.rightEye.confidence>0.90
//   ){
//   rightleg="open"

// /*computer(
//   pose.rightShoulder.x,
//   pose.rightShoulder.y,
//   pose.rightHip.x,
//   pose.rightHip.y,
//   pose.rightKnee.x,
//   pose.rightKnee.y)*/
// }else{
//   rightleg="close"
// }
//   //d  = dist(pose.rightEye.x,pose.rightEye.y,pose.leftEye.x,pose.leftEye.y)

//   }
//   }

// }
// function computer(ax,ay,bx,by,cx,cy){
// let a =  Math.sqrt(Math.pow((bx -  cx),2 ) + Math.pow((by -  cy),2 ) )
// let b =  Math.sqrt(Math.pow((ax -  cx),2 ) + Math.pow((ay -  cy),2 ) )
// let c =  Math.sqrt(Math.pow((ax -  bx),2 ) + Math.pow((ay -  by),2 ) )
// let calutleoneA = (Math.pow(b,2) + Math.pow(c,2) - Math.pow(a,2))
// let calutletwoA= b*c*2
// let calculeA = calutleoneA/calutletwoA
// let calutleoneB = (Math.pow(a,2) + Math.pow(c,2) - Math.pow(b,2))
// let calutletwoB= a*c*2
// let calculeB = calutleoneB/calutletwoB
// let angleA = Math.acos(calculeB)*180/Math.PI
// //angle=angleA
// //console.log(100 - (angleA *  100/180))
// //bar.style.height=`${100 - (angleA *  100/180) + 20}% `

// }

// function setup(){
//   console.log("create")
// }

// let conter= 100
//   let x

// let b
// function updatebar(){

//   x= setInterval(function(){
//     conter = conter - 10
// bar.style.height=`${conter}% `

// if (conter==10) {
//   clearInterval(x)

// b= setInterval(function(){
//  conter = conter+ 10
// bar.style.height=`${conter}% `
// if (conter==100) {
//   clearInterval(b)
//  conter=100
// updatebar()
// }
// },150)
// }
// if (conter==50) {

// }
//   },150)
// }

// function StopAi(){

//   if (stateplaying==true) {
// let videos= document.querySelectorAll("video")
// videos.forEach(item=>{

//   let mediaStream = item.srcObject;
// // hrough the MediaStream, you can get the MediaStreamTracks with getTracks():
// let tracks = mediaStream.getTracks();
// // Tracks are returned as an array, so if you know you only have one, you can stop it with:
// tracks[0].stop();
// // Or stop all like so:
// tracks.forEach(track => track.stop())
// video.stop()
//  if (item.classList.contains("vivv")) {

//   }else{

//     item.remove()
//   }
// })
// stateplaying=false
// clearInterval(b)
// clearInterval(x)
// conter=100

// poseNet.removeListener('pose',end);
// document.querySelector(".display-itme-reletated").style.backgroundColor="#2d3136"

//   }

// }

// function end(){
// console.log("end")
// }
