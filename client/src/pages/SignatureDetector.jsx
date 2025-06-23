import { useState } from "react";

const SignatureVerification = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle form submission
    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file first!");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setResult(data.result); // Display result
        } catch (error) {
            console.error("Error:", error);
            setResult("Error processing image");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Signature Verification</h1>
            
            <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="mb-4 p-2 border rounded"
            />
            
            <button 
                onClick={handleUpload} 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Processing..." : "Upload & Verify"}
            </button>

            {result && (
                <div className="mt-4 text-xl font-semibold">
                    Result: <span className={result === "Genuine" ? "text-green-500" : "text-red-500"}>{result}</span>
                </div>
            )}
        </div>
    );
};

export default SignatureVerification;
