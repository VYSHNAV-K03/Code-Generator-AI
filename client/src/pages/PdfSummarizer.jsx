import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const PdfAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => setFile(e.target.files[0]);

    const analyzePDF = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        setData(null);

        const formData = new FormData();
        formData.append("pdf", file);

        try {
            const response = await axios.post("http://localhost:7000/analyze-pdf", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setData(response.data);
        } catch (err) {
            setError("Error analyzing PDF");
        } finally {
            setLoading(false);
        }
    };

    // 🔽 Function to Generate and Download TXT File
    const downloadTxtFile = () => {
        if (!data) return;

        const textContent = `
        📌 Summary:
        ${data.summary}

        ✅ Task Prioritization:
        ${data.taskPrioritization}

        📦 Resource Allocation:
        ${data.resourceAllocation}

        ⚠️ Risk Analysis:
        ${data.riskAnalysis}

        🛠️ Error & Rework Analysis:
        ${data.errorRework}

        💰 Business Cost Optimization:
        ${data.businessCost}
        `;

        const blob = new Blob([textContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Analysis_Report.txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4">
                        <h2 className="text-center">📄 PDF Analysis Report</h2>
                        <input type="file" className="form-control my-3" accept="application/pdf" onChange={handleFileChange} />
                        <button className="btn btn-primary w-100" onClick={analyzePDF} disabled={loading}>
                            {loading ? "Analyzing..." : "Analyze PDF"}
                        </button>

                        {error && <div className="alert alert-danger mt-3">{error}</div>}
                        {data && (
                            <div className="mt-4">
                                <h3 className="text-center">📊 Analysis Report</h3>
                                <div className="card p-3 bg-light">
                                    <p><strong>📌 Summary:</strong> {data.summary}</p>
                                    <p><strong>✅ Task Prioritization:</strong> {data.taskPrioritization}</p>
                                    <p><strong>📦 Resource Allocation:</strong> {data.resourceAllocation}</p>
                                    <p><strong>⚠️ Risk Analysis:</strong> {data.riskAnalysis}</p>
                                    <p><strong>🛠️ Error & Rework Analysis:</strong> {data.errorRework}</p>
                                    <p><strong>💰 Business Cost Optimization:</strong> {data.businessCost}</p>
                                </div>
                                 {/* 📥 Download TXT Button */}
                                 <button className="btn btn-success mt-3 w-100" onClick={downloadTxtFile}>
                                    📥 Download Report as TXT
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PdfAnalyzer;
