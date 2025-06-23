import React, { useEffect, useRef, useState } from "react";
import * as cam from "@mediapipe/camera_utils";
import { FaceMesh, FACEMESH_LIPS } from "@mediapipe/face_mesh";
import * as drawingUtils from "@mediapipe/drawing_utils";

const LipSync = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  let camera = null;
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // Set language (Change for translation)
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => console.error("Speech error:", event);
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setText(transcript);
    };

    recognition.start();
  };


  useEffect(() => {
    startListening();
    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (videoRef.current) {
      camera = new cam.Camera(videoRef.current, {
        onFrame: async () => {
          await faceMesh.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const onResults = (results) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) return;

    // Set canvas size dynamically based on video
    const video = videoRef.current;
    if (video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    // Clear previous drawings
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    if (results.multiFaceLandmarks) {
      for (const landmarks of results.multiFaceLandmarks) {
        console.log("Detected landmarks:", landmarks);

        // Draw lip landmarks
        drawingUtils.drawConnectors(
          canvasCtx,
          landmarks,
          FACEMESH_LIPS, // ✅ Corrected import
          { color: "red", lineWidth: 2 }
        );

        // Calculate lip movement
        const upperLip = landmarks[13];
        const lowerLip = landmarks[14];
        const mouthOpen = Math.abs(upperLip.y - lowerLip.y);

        setIsSpeaking(mouthOpen > 0.03);
      }
    }
  };

  

  return (
    <div className="flex flex-col items-center relative">
      {/* Video Stream */}
      <video
        ref={videoRef}
        className="absolute"
        autoPlay
        playsInline
        muted
        style={{ width: "640px", height: "480px", zIndex: 1 }}
      />

      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="absolute"
        style={{ zIndex: 2, position: "absolute", left: 0, pointerEvents: "none" }}
      />

      {/* Speaking Status */}
      <div className="mt-4 text-xl font-bold">
        {isSpeaking ? "Speaking... 🎤" : "Silent 🤐"}
      </div>
      <h1 className="text-xl font-bold">🎙️ Speech to Text</h1>
      {/* <button
        onClick={startListening}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        {isListening ? "Listening..." : "Start Listening"}
      </button> */}
      <p className="mt-4 p-2 border rounded w-96">{text || "Say something..."}</p>
    </div>
  );
};

export default LipSync;
