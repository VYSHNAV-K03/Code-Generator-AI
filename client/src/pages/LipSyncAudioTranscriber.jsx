import React, { useRef, useEffect, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const LipSyncAudioTranscriber = () => {
    const videoRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [audioChunks, setAudioChunks] = useState([]);
    const [transcript, setTranscript] = useState("");

    useEffect(() => {
        console.log("🟢 Initializing FaceMesh..."); // ✅ Add this line
    
        const faceMesh = new FaceMesh({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });
    
        faceMesh.setOptions({ maxNumFaces: 1 });
        faceMesh.onResults((results) => {
            console.log("🎥 FaceMesh processing frame..."); // ✅ Add this line
    
            if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
                console.log("✅ Face detected!"); // ✅ Add this line
    
                const lips = results.multiFaceLandmarks[0].slice(61, 68); // Lip keypoints
                const lipDistance = Math.abs(lips[6].y - lips[0].y);
    
                console.log("Lip distance:", lipDistance);
    
                if (lipDistance > 0.02) {
                    console.log("👄 Lips OPEN!");
                    if (!isSpeaking) startRecording();
                    setIsSpeaking(true);
                } else {
                    console.log("🤐 Lips CLOSED!");
                    if (isSpeaking) stopRecording();
                    setIsSpeaking(false);
                }
            } else {
                console.log("❌ No face detected!");
            }
        });
    
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                console.log("🎥 Video & 🎤 Audio stream initialized.");
                videoRef.current.srcObject = stream;
    
                const camera = new Camera(videoRef.current, {
                    onFrame: async () => {
                        await faceMesh.send({ image: videoRef.current });
                    },
                    width: 640,
                    height: 480,
                });
                camera.start(); // ✅ Ensure the camera starts processing
            })
            .catch((error) => console.error("❌ Error accessing media devices:", error));
    
        return () => {
            faceMesh.close();
        };
    }, []);
    
    const isSpeakingRef = useRef(false);

const startRecording = () => {
    console.log("🛠 startRecording() function triggered!");  // ✅ Debug log

    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== "inactive") return;

    console.log("🎤 Recording started...");
    console.log("🎤 MediaRecorder state:", mediaRecorderRef.current?.state);
    console.log("🎤 MediaRecorder object:", mediaRecorderRef.current);

    mediaRecorderRef.current.start();
    isSpeakingRef.current = true;

    let tempChunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
        console.log("📥 Received audio chunk:", event.data);
        tempChunks.push(event.data);
    };

    mediaRecorderRef.current.onstop = () => {
        if (tempChunks.length === 0) {
            console.error("❌ No audio data recorded!");
            return;
        }
        const audioBlob = new Blob(tempChunks, { type: "audio/webm" });
        console.log("🎧 Audio ready for upload:", audioBlob, "Size:", audioBlob.size);
    
        // Ensure it's not an empty blob
        if (audioBlob.size > 0) {
            uploadAudio(audioBlob);
        } else {
            console.error("❌ Recorded audio is empty!");
        }
    };
    
};

const stopRecording = () => {
    console.log("🛠 stopRecording() function triggered!");  // ✅ Debug log

    if (!mediaRecorderRef.current || mediaRecorderRef.current.state !== "recording") return;

    console.log("🛑 Recording stopped...");
    mediaRecorderRef.current.stop();
    isSpeakingRef.current = false;
};
    

    const uploadAudio = async (audioBlob) => {
        const formData = new FormData();
        formData.append("audio", audioBlob, "speech.webm");

        const response = await fetch("http://localhost:7000/transcribe", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        setTranscript(data.transcript);
    };

    return (
        <div>
            <video ref={videoRef} autoPlay muted style={{ width: "300px" }} />
            <p>{isSpeaking ? "Speaking..." : "Not speaking"}</p>
            <h3>Transcription:</h3>
            <p>{transcript}</p>
        </div>
    );
};

export default LipSyncAudioTranscriber;
