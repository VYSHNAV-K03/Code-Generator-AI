import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const TextAnalyzer = () => {
    const [text, setText] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeText = async () => {
        if (!text) return;
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post("http://localhost:7000/analyze-text", { text });
            setResult(response.data.result);
        } catch (err) {
            setError("Error analyzing text");
        } finally {
            setLoading(false);
        }
    };

    const getAnalysisMessage = () => {
        console.log(result);
        
        if (!result || !result[0]) return null;
        const realScore = result[0][0].score;
        const label = result[0][0].label;

        return label =="Fake"
        ? { text: "This text is Human-Generated!", variant: "success" }
        : { text: "Th is text is AI-Generated!", variant: "danger" };
    };

    const analysisMessage = getAnalysisMessage();

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center mb-4">📝 AI Text Detector</h2>
                        <textarea
                            className="form-control mb-3"
                            rows="5"
                            placeholder="Enter text here..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>
                        <button
                            className="btn btn-primary w-100"
                            onClick={analyzeText}
                            disabled={loading}
                        >
                            {loading ? "Analyzing..." : "Check AI Generated"}
                        </button>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}

                        {result && (
                            <div className="mt-4">
                                <h3 className="text-center">Analysis Result:</h3>
                                {analysisMessage && (
                                    <div className={`alert alert-${analysisMessage.variant} text-center fw-bold`}>
                                        {analysisMessage.text}
                                    </div>
                                )}
                                <div className="card p-3 bg-light">
                                    <pre className="m-0">{JSON.stringify(result, null, 2)}</pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TextAnalyzer;
