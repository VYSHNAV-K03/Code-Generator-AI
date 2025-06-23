import React, { useState } from "react";
import axios from "axios";

const LipReader = () => {
    const [video, setVideo] = useState(null);
    const [result, setResult] = useState("");

    const handleFileChange = (e) => {
        setVideo(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!video) {
            alert("Please select a video first!");
            return;
        }

        const formData = new FormData();
        formData.append("video", video);

        try {
            const response = await axios.post("http://localhost:7000/lip-read", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setResult(response.data.predictedText);
        } catch (error) {
            console.error("Error:", error);
            setResult("Failed to process lip reading.");
        }
    };

    return (
        <div>
            <h2>Lip Sync Analyzer</h2>
            <input type="file" accept="video/mp4" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload & Analyze</button>
            {result && <p><strong>Predicted Sentence:</strong> {result}</p>}
        </div>
    );
};

export default LipReader;
