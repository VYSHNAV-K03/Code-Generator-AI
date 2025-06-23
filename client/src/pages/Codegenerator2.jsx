// // code latest
// import { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../index.css";

// const CodeGenerator = () => {
//   const [prompt, setPrompt] = useState("");
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [cleanedCode, setCleanedCode] = useState("");
//   const [generatedTestCases, setGeneratedTestCases] = useState("");
//   const [codeDescription, setCodeDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [cleaning, setCleaning] = useState(false);
//   const [running, setRunning] = useState(false);
//   const [describing, setDescribing] = useState(false);
//   const [output, setOutput] = useState("");
//   const [language, setLanguage] = useState("javascript");
//   const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));

//   const handleGenerate = async () => {
//     setLoading(true);
//     setGeneratedCode("");
//     setCleanedCode("");
//     setGeneratedTestCases("");
//     setCodeDescription("");

//     try {
//       const response = await axios.post("http://localhost:7000/generatecode", {
//         prompt,
//       });
//       setGeneratedCode(response.data.code);
//       setLanguage(response.data.language);
//     } catch (error) {
//       console.error("Error generating code:", error);
//       setGeneratedCode("Failed to generate code.");
//     }
//     setLoading(false);
//   };

//   const handleGenerateTestCases = async () => {
//     if (!generatedCode) return;
//     setGeneratedTestCases("");

//     try {
//       const response = await axios.post(
//         "http://localhost:7000/generateTestCases",
//         {
//           code: generatedCode,
//         }
//       );
//       setGeneratedTestCases(response.data.testCases);
//     } catch (error) {
//       console.error("Error generating test cases:", error);
//       setGeneratedTestCases("Failed to generate test cases.");
//     }
//   };

//   const handleClean = async () => {
//     if (!generatedCode) return;
//     setCleaning(true);
//     setCleanedCode("");

//     try {
//       const response = await axios.post("http://localhost:7000/clean", {
//         code: generatedCode,
//       });
//       setCleanedCode(response.data.cleanedCode);
//     } catch (error) {
//       console.error("Error cleaning code:", error);
//       setCleanedCode("Failed to clean the code.");
//     }
//     setCleaning(false);
//   };

//   const handleRunCode = async () => {
//     setRunning(true);
//     try {
//       const response = await axios.post("http://localhost:7000/run", {
//         code: cleanedCode,
//         language,
//       });
//       setOutput(response.data.output);
//     } catch (error) {
//       setOutput("Error running code.");
//     }
//     setRunning(false);
//   };

//   const handleDescribeCode = async () => {
//     if (!cleanedCode) return;
//     setDescribing(true);
//     setCodeDescription("");

//     try {
//       const response = await axios.post("http://localhost:7000/describe", {
//         code: cleanedCode,
//       });
//       setCodeDescription(response.data.description);
//     } catch (error) {
//       console.error("Error describing code:", error);
//       setCodeDescription("Failed to generate code description.");
//     }
//     setDescribing(false);
//   };

//   const handleUpload = async () => {
//     const createdAt = new Date().toISOString();

//     try {
//       await axios.post("http://localhost:7000/uploadCode", {
//         userId: user.id,
//         prompt,
//         code: cleanedCode || generatedCode,
//         createdAt,
//       });
//       alert("Code uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading code:", error);
//       alert("Failed to upload code.");
//     }
//   };

//   return (
//     <div className="code-generator-page">
//       <div className="code-container">
//         <div className="container mt-4">
//           <h2 className="text-center">AI Code Generator</h2>

//           <div className="mb-3">
//             <label className="form-label">Enter Coding Task/prompt:</label>
//             <textarea
//               className="form-control"
//               rows="3"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//             ></textarea>
//           </div>

//           <button
//             className="btn btn-primary"
//             onClick={handleGenerate}
//             disabled={loading}
//           >
//             {loading ? "Generating..." : "Generate Code"}
//           </button>

//           {generatedCode && (
//             <div className="mt-4">
//               <h4>Generated Code:</h4>
//               <pre className="bg-light p-3">{generatedCode}</pre>
//               <button
//                 className="btn btn-success mt-2"
//                 onClick={handleClean}
//                 disabled={cleaning}
//               >
//                 {cleaning ? "Cleaning..." : "Refine Code"}
//               </button>
//               <button
//                 className="btn btn-info mt-2 ms-2"
//                 onClick={handleGenerateTestCases}
//               >
//                 Generate Test Cases
//               </button>
//             </div>
//           )}

//           {generatedTestCases && (
//             <div className="mt-4">
//               <h4>Generated Test Cases:</h4>
//               <pre className="bg-light p-3">{generatedTestCases}</pre>
//             </div>
//           )}

//           {cleanedCode && (
//             <div className="mt-4">
//               <div className="d-flex align-items-center justify-content-between">
//                 <h4>Refined Code (Bug-Free):</h4>
//                 <button
//                   className="btn btn-sm btn-outline-secondary"
//                   onClick={() => {
//                     navigator.clipboard.writeText(cleanedCode);
//                     alert("Code copied to clipboard!");
//                   }}
//                 >
//                   <i className="bi bi-clipboard"></i>
//                 </button>
//               </div>
//               <pre className="bg-light p-3">{cleanedCode}</pre>

//               <button
//                 className="btn btn-warning mt-2"
//                 onClick={handleDescribeCode}
//                 disabled={describing}
//               >
//                 {describing ? "Describing..." : "Describe Code"}
//               </button>
//               <button
//                 className="btn btn-success mt-2 ms-2"
//                 onClick={handleRunCode}
//                 disabled={running}
//               >
//                 {running ? "Running..." : "Run Code"}
//               </button>
//             </div>
//           )}

//           {codeDescription && (
//             <div className="mt-4">
//               <h4>Code Description:</h4>
//               <pre className="bg-light p-3">{codeDescription}</pre>
//             </div>
//           )}

//           {output && (
//             <div className="mt-4">
//               <h4>Output:</h4>
//               <pre className="bg-light p-3">{output}</pre>
//             </div>
//           )}
//           {(generatedCode || cleanedCode) && (
//             <div className="mt-4">
//               <button className="btn btn-dark" onClick={handleUpload}>
//                 Upload to Database
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CodeGenerator;


// code latest
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";

const CodeGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [cleanedCode, setCleanedCode] = useState("");
  const [generatedTestCases, setGeneratedTestCases] = useState("");
  const [codeDescription, setCodeDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [cleaning, setCleaning] = useState(false);
  const [running, setRunning] = useState(false);
  const [describing, setDescribing] = useState(false);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleGenerate = async () => {
    setLoading(true);
    setGeneratedCode("");
    setCleanedCode("");
    setGeneratedTestCases("");
    setCodeDescription("");

    try {
      const response = await axios.post("http://localhost:7000/generatecode", {
        prompt,
      });
      setGeneratedCode(response.data.code);
      setLanguage(response.data.language);
    } catch (error) {
      console.error("Error generating code:", error);
      setGeneratedCode("Failed to generate code.");
    }
    setLoading(false);
  };

  const handleGenerateTestCases = async () => {
    if (!generatedCode) return;
    setGeneratedTestCases("");

    try {
      const response = await axios.post(
        "http://localhost:7000/generateTestCases",
        {
          code: generatedCode,
        }
      );
      setGeneratedTestCases(response.data.testCases);
    } catch (error) {
      console.error("Error generating test cases:", error);
      setGeneratedTestCases("Failed to generate test cases.");
    }
  };

  const handleClean = async () => {
    if (!generatedCode) return;
    setCleaning(true);
    setCleanedCode("");

    try {
      const response = await axios.post("http://localhost:7000/clean", {
        code: generatedCode,
      });
      setCleanedCode(response.data.cleanedCode);
    } catch (error) {
      console.error("Error cleaning code:", error);
      setCleanedCode("Failed to clean the code.");
    }
    setCleaning(false);
  };

  const handleRunCode = async () => {
    setRunning(true);
    try {
      const response = await axios.post("http://localhost:7000/run", {
        code: cleanedCode,
        language,
      });
      setOutput(response.data.output);
    } catch (error) {
      setOutput("Error running code.");
    }
    setRunning(false);
  };

  const handleDescribeCode = async () => {
    if (!cleanedCode) return;
    setDescribing(true);
    setCodeDescription("");

    try {
      const response = await axios.post("http://localhost:7000/describe", {
        code: cleanedCode,
      });
      setCodeDescription(response.data.description);
    } catch (error) {
      console.error("Error describing code:", error);
      setCodeDescription("Failed to generate code description.");
    }
    setDescribing(false);
  };

  const handleUpload = async () => {
    const createdAt = new Date().toISOString();

    try {
      await axios.post("http://localhost:7000/uploadCode", {
        userId: user.id,
        prompt,
        code: cleanedCode || generatedCode,
        createdAt,
      });
      alert("Code uploaded successfully!");
    } catch (error) {
      console.error("Error uploading code:", error);
      alert("Failed to upload code.");
    }
  };

  return (
    <div className="code-generator-page">
      <div className="code-container">
        <div className="container mt-4">
          <h2 className="text-center">AI Code Generator</h2>

          <div className="mb-3">
            <label className="form-label">Enter Coding Task/prompt:</label>
            <textarea
              className="form-control"
              rows="3"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            ></textarea>
          </div>

          <button
            className="btn btn-primary"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Code"}
          </button>

          {generatedCode && (
            <div className="mt-4">
              <h4>Generated Code:</h4>
              <pre className="bg-light p-3">{generatedCode}</pre>
              <button
                className="btn btn-success mt-2"
                onClick={handleClean}
                disabled={cleaning}
              >
                {cleaning ? "Cleaning..." : "Refine Code"}
              </button>
            </div>
          )}

          {cleanedCode && (
            <div className="mt-4">
              <div className="d-flex align-items-center justify-content-between">
                <h4>Refined Code (Bug-Free):</h4>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    navigator.clipboard.writeText(cleanedCode);
                    alert("Code copied to clipboard!");
                  }}
                >
                  <i className="bi bi-clipboard"></i>
                </button>
              </div>
              <pre className="bg-light p-3">{cleanedCode}</pre>

              <button
                className="btn btn-warning mt-2"
                onClick={handleDescribeCode}
                disabled={describing}
              >
                {describing ? "Describing..." : "Describe Code"}
              </button>
              <button
                className="btn btn-success mt-2 ms-2"
                onClick={handleRunCode}
                disabled={running}
              >
                {running ? "Running..." : "Run Code"}
              </button>
            </div>
          )}

          {codeDescription && (
            <div className="mt-4">
              <h4>Code Description:</h4>
              <pre className="bg-light p-3">{codeDescription}</pre>
            </div>
          )}

          {output && (
            <div className="mt-4">
              <h4>Output:</h4>
              <pre className="bg-light p-3">{output}</pre>
            </div>
          )}
          {(generatedCode || cleanedCode) && (
            <div className="mt-4">
              <button className="btn btn-dark" onClick={handleUpload}>
                Upload to Database
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;
