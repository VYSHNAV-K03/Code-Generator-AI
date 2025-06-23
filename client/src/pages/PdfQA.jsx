import React, { useState } from "react";
import axios from "axios";

const PdfQA = () => {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");
    const [context, setContext] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const summarizePDF = async () => {
        if (!file) return;
        setLoading(true);
        setSummary("");
        setContext("");
    
        const formData = new FormData();
        formData.append("pdf", file);
    
        try {
            const response = await axios.post("http://localhost:7000/summarize", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
    
            setSummary(response.data.summary);
            setContext(response.data.fullText); // Use full PDF text for Q&A
        } catch (err) {
            console.error("Error summarizing PDF");
        } finally {
            setLoading(false);
        }
    };
    

    const askQuestion = async () => {
        if (!question || !context) return;
        setLoading(true);

        console.log("Question:", question);
        console.log("Context:", context);
        

        try {
            const response = await axios.post("http://localhost:7000/ask", { question, text:context });
            setAnswer(response.data.answer);
        } catch (err) {
            console.error("Error getting answer");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">📄 PDF Summarizer & QA</h2>
            <input type="file" className="form-control my-3" accept="application/pdf" onChange={handleFileChange} />
            <button className="btn btn-primary w-100" onClick={summarizePDF} disabled={loading}>
                {loading ? "Processing..." : "Summarize PDF"}
            </button>

            {summary && (
                <div className="mt-4">
                    <h4>📌 Summary:</h4>
                    <p>{summary}</p>
                </div>
            )}

            {summary && (
                <div className="mt-4">
                    <h4>🔍 Ask a Question:</h4>
                    <input
                        type="text"
                        className="form-control my-2"
                        placeholder="Enter your question..."
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <button className="btn btn-success w-100" onClick={askQuestion} disabled={loading}>
                        {loading ? "Searching..." : "Get Answer"}
                    </button>

                    {answer && (
                        <div className="alert alert-info mt-3">
                            <h5>✅ Answer:</h5>
                            <p>{answer}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PdfQA;
