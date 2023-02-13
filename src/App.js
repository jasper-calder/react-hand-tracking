import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { useEffect, useRef } from "react";
import { DrawHand } from "./utilities";

import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';



import logo from './logo.svg';
import './App.css';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);


  // Getting handpose models from tensorflow
  const runHandpose = async () => {

    // const net = await handpose.load();

    const model = handPoseDetection.SupportedModels.MediaPipeHands;
    const detectorConfig = {
      runtime: 'tfjs', // or 'tfjs'
      modelType: 'lite'
    };
    const net = await handPoseDetection.createDetector(model, detectorConfig);


    console.log("handpose model loaded");
    // loop and detect hands
    setInterval(() => {
      detect(net);
    }, 16.666)
  }

  const detect = async (net) => {
    // check data is available
    if (
      typeof webcamRef.current != "undefined" &&
      webcamRef.current != null &&
      webcamRef.current.video.readyState === 4
    ) {

    // Get video properties

    const video = webcamRef.current.video;
    const videoWidth = webcamRef.current.video.videoWidth;
    const videoHeight = webcamRef.current.video.videoHeight;

    // set vid heigh and width
    webcamRef.current.video.width = videoWidth;
    webcamRef.current.video.height = videoHeight;

    // set canvas heigh and width
    canvasRef.current.width = videoWidth;
    canvasRef.current.height = videoHeight;

    // make detections (neural net)

    const hand = await net.estimateHands(video);
    const ctx = canvasRef.current.getContext("2d");
    DrawHand(hand, ctx);

  }

    // draw mesh
  }

  useEffect(()=>{
    runHandpose();
  },[])




  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={webcamRef} className="webcam"/>
        <canvas ref={canvasRef}/>
      </header>
    </div>
  );
}

export default App;
