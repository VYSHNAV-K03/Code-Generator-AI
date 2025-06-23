// const { exec } = require("child_process");
// const express = require("express");
// const router = express.Router();
// const axios = require("axios");
// const pdfParse = require("pdf-parse");
// const multer = require("multer");
// const fetch = require("node-fetch");
// const fs = require("fs");

// const COHERE_API_URL = "https://api.cohere.ai/v1/generate";
// const API_KEY = "7Dbjk8G3UCx4QSkXxuApvNpPH4AFKaW1aOy743z3"; // Store API key securely

// const extractCode = (text) => {
//   const codeRegex = /```[\s\S]*?```/g;
//   const matches = text.match(codeRegex);

//   if (matches) {
//     return matches
//       .map((match) => match.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, ""))
//       .join("\n");
//   }

//   return text;
// };

// const detectLanguage = (code) => {
//   if (
//     code.includes("console.log") ||
//     code.includes("function") ||
//     code.includes("=>")
//   ) {
//     return "javascript";
//   } else if (code.includes("print(") || code.includes("def ")) {
//     return "python";
//   } else if (code.includes("#include") || code.includes("int main()")) {
//     return "cpp";
//   } else {
//     return "unknown";
//   }
// };

// router.post("/generatecode", async (req, res) => {
//   console.log("Generating code...");

//   try {
//     const { prompt } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt,
//         max_tokens: 300,
//         temperature: 0.7,
//         stop_sequences: ["\n\n"],
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       const rawCode = data.generations[0].text;
//       const cleanCode = extractCode(rawCode);
//       const detectedLang = detectLanguage(cleanCode);

//       return res.json({ code: cleanCode, language: detectedLang });
//     }

//     res.status(400).json({ error: "Failed to generate code." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // **2. Clean & Debug the Code**
// router.post("/clean", async (req, res) => {
//   try {
//     const { code } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt: `Refactor and debug the following code. Remove unnecessary comments, fix syntax errors, and ensure it runs correctly:\n\n${code}`,
//         max_tokens: 300,
//         temperature: 0.5,
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       const rawCode = data.generations[0].text;
//       const cleanCode = extractCode(rawCode);
//       return res.json({ cleanedCode: cleanCode });
//     }

//     res.status(400).json({ error: "Failed to clean code." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // **3. Generate Test Cases**
// router.post("/generateTestCases", async (req, res) => {
//   try {
//     const { code } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt: `Generate test cases for the following code. Ensure coverage of edge cases and typical scenarios:\n\n${code}`,
//         max_tokens: 300,
//         temperature: 0.5,
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       const rawTestCases = data.generations[0].text;
//       const cleanTestCases = extractCode(rawTestCases);
//       return res.json({ testCases: cleanTestCases });
//     }

//     res.status(400).json({ error: "Failed to generate test cases." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // **4. Describe the Code**
// router.post("/describe", async (req, res) => {
//   try {
//     const { code } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt: `Provide a detailed explanation of the following code. Describe its purpose and explain each segment in simple terms:\n\n${code}`,
//         max_tokens: 400,
//         temperature: 0.5,
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       return res.json({ description: data.generations[0].text });
//     }

//     res.status(400).json({ error: "Failed to describe code." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.post("/run", async (req, res) => {
//   try {
//     const { code, language } = req.body;
//     const filename = `temp.${language === "python" ? "py" : "js"}`;
//     fs.writeFileSync(filename, code);
//     const command =
//       language === "python" ? `python ${filename}` : `node ${filename}`;

//     exec(command, (error, stdout, stderr) => {
//       if (error) return res.json({ output: stderr || error.message });
//       res.json({ output: stdout });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

//modified code

const { exec } = require("child_process");
const express = require("express");
const router = express.Router();
const axios = require("axios");
const pdfParse = require("pdf-parse");
const multer = require("multer");
const fetch = require("node-fetch");
const fs = require("fs");

const COHERE_API_URL = "https://api.cohere.ai/v1/generate";
const API_KEY = "7Dbjk8G3UCx4QSkXxuApvNpPH4AFKaW1aOy743z3"; // Store API key securely

const extractCode = (text) => {
  const codeRegex = /```[\s\S]*?```/g;
  const matches = text.match(codeRegex);

  if (matches) {
    return matches
      .map((match) => match.replace(/```[a-zA-Z]*\n?/g, "").replace(/```/g, ""))
      .join("\n");
  }

  return text;
};

const detectLanguage = (code) => {
  if (
    code.includes("console.log") ||
    code.includes("function") ||
    code.includes("=>")
  ) {
    return "javascript";
  } else if (code.includes("print(") || code.includes("def ")) {
    return "python";
  } else if (code.includes("#include") || code.includes("int main()")) {
    return "cpp";
  } else {
    return "unknown";
  }
};

// Utility function to detect if the prompt is code-related
function isCodeGenerationPrompt(prompt) {
  const keywords = [
    "generate code",
    "write code",
    "write a function",
    "create a class",
    "code for",
    "program in",
    "write a program",
    "implement",
    "build a script",
    "generate function",
    "generate a python",
    "generate a python function",
    "generate a javascript",
    "generate a class",
    "generate a method",
    "generate script",
    "generate snippet",
    "generate source code",
    "build code",
    "build a program",
    "build function",
    "build class",
    "code snippet",
    "write a snippet",
    "create code",
    "create a function",
    "create a script",
    "create a method",
    "develop a function",
    "develop a code",
    "develop a class",
    "implement a function",
    "implement a python function",
    "implement a javascript function",
    "implement a method",
    "write a method",
    "produce code",
    "show me code",
    "give me code",
    "provide code",
    "generate source",
    "code example",
    "sample code",
    "sample script",
    "example code",
    "write loop in",
    "generate loop in",
    "write class in",
    "generate algorithm",
    "implement algorithm",
    "how to code",
    "how to implement",
    "code to",
    "script to",
    "function to",
    "write logic to",
    "generate logic to",
    "write a python",
    "write a javascript",
    "write a CPP",
    "create a python",
    "create a javascript"
    
  ];
  

  const loweredPrompt = prompt.toLowerCase();
  return keywords.some((keyword) => loweredPrompt.includes(keyword));
}

router.post("/generatecode", async (req, res) => {
  console.log("Generating code...");

  try {
    const { prompt } = req.body;
    console.log(prompt);
    
    if (!isCodeGenerationPrompt(prompt)) {
      return res.status(400).json({ error: "Only code generation prompts are supported." });
    }

    const response = await fetch(COHERE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt,
        max_tokens: 300,
        temperature: 0.7,
        stop_sequences: ["\n\n"],
      }),
    });

    const data = await response.json();
    if (data.generations && data.generations.length > 0) {
      const rawCode = data.generations[0].text;
      const cleanCode = extractCode(rawCode);
      const detectedLang = detectLanguage(cleanCode);

      return res.json({ code: cleanCode, language: detectedLang });
    }

    res.status(400).json({ error: "Failed to generate code." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// router.post("/generatecode", async (req, res) => {
//   console.log("Generating code...");

//   try {
//     const { prompt } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt,
//         max_tokens: 300,
//         temperature: 0.7,
//         stop_sequences: ["\n\n"],
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       const rawCode = data.generations[0].text;
//       const cleanCode = extractCode(rawCode);
//       const detectedLang = detectLanguage(cleanCode);

//       return res.json({ code: cleanCode, language: detectedLang });
//     }

//     res.status(400).json({ error: "Failed to generate code." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

    // **2. Clean & Debug the Code**
// router.post("/clean", async (req, res) => {
//   try {
//     const { code } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt: `Refactor and debug the following code. Remove unnecessary comments, fix syntax errors, and ensure it runs correctly:\n\n${code}`,
//         max_tokens: 300,
//         temperature: 0.5,
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       const rawCode = data.generations[0].text;
//       const cleanCode = extractCode(rawCode);
//       return res.json({ cleanedCode: cleanCode });
//     }

//     res.status(400).json({ error: "Failed to clean code." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // **3. Generate Test Cases**
// router.post("/generateTestCases", async (req, res) => {
//   try {
//     const { code } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt: `Generate test cases for the following code. Ensure coverage of edge cases and typical scenarios:\n\n${code}`,
//         max_tokens: 300,
//         temperature: 0.5,
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       const rawTestCases = data.generations[0].text;
//       const cleanTestCases = extractCode(rawTestCases);
//       return res.json({ testCases: cleanTestCases });
//     }

//     res.status(400).json({ error: "Failed to generate test cases." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // **4. Describe the Code**
// router.post("/describe", async (req, res) => {
//   try {
//     const { code } = req.body;
//     const response = await fetch(COHERE_API_URL, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${API_KEY}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         model: "command",
//         prompt: `Provide a detailed explanation of the following code. Describe its purpose and explain each segment in simple terms:\n\n${code}`,
//         max_tokens: 400,
//         temperature: 0.5,
//       }),
//     });

//     const data = await response.json();
//     if (data.generations && data.generations.length > 0) {
//       return res.json({ description: data.generations[0].text });
//     }

//     res.status(400).json({ error: "Failed to describe code." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.post("/run", async (req, res) => {
//   try {
//     const { code, language } = req.body;
//     const filename = `temp.${language === "python" ? "py" : "js"}`;
//     fs.writeFileSync(filename, code);
//     const command =
//       language === "python" ? `python ${filename}` : `node ${filename}`;

//     exec(command, (error, stdout, stderr) => {
//       if (error) return res.json({ output: stderr || error.message });
//       res.json({ output: stdout });
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

    // **2. Clean & Debug the Code**
router.post("/clean", async (req, res) => {
  try {
    const { code } = req.body;
    const response = await fetch(COHERE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `Refactor and debug the following code. Remove unnecessary comments, fix syntax errors, and ensure it runs correctly:\n\n${code}`,
        max_tokens: 300,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    if (data.generations && data.generations.length > 0) {
      const rawCode = data.generations[0].text;
      const cleanCode = extractCode(rawCode);
      return res.json({ cleanedCode: cleanCode });
    }

    res.status(400).json({ error: "Failed to clean code." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// **4. Describe the Code**
router.post("/describe", async (req, res) => {
  try {
    const { code } = req.body;
    const response = await fetch(COHERE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "command",
        prompt: `Provide a detailed explanation of the following code. Describe its purpose and explain each segment in simple terms:\n\n${code}`,
        max_tokens: 500,
        temperature: 0.5,
      }),
    });

    const data = await response.json();
    if (data.generations && data.generations.length > 0) {
      return res.json({ description: data.generations[0].text });
    }

    res.status(400).json({ error: "Failed to describe code." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/run", async (req, res) => {
  try {
    const { code, language } = req.body;
    const filename = `temp.${language === "python" ? "py" : "js"}`;
    fs.writeFileSync(filename, code);
    const command =
      language === "python" ? `python ${filename}` : `node ${filename}`;

    exec(command, (error, stdout, stderr) => {
      if (error) return res.json({ output: stderr || error.message });
      res.json({ output: stdout });
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;


