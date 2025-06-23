const express = require("express");
const CodeModel = require("../models/CodeModel");

const router = express.Router();

router.post("/uploadCode", async (req, res) => {
  const { userId, prompt, code, createdAt } = req.body;

  try {
    // Save to your database - replace with actual DB logic
    await CodeModel.create({ userId, prompt, code, createdAt });

    res.json({ message: "Uploaded successfully." });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Upload failed." });
  }
});

// GET all codes for a user
router.get("/user/:id", async (req, res) => {
  try {
    const codes = await CodeModel.find({ userId: req.params.id }).sort({
      createdAt: -1,
    });
    res.json(codes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch codes" });
  }
});

// DELETE a code by ID
router.delete("/code/:id", async (req, res) => {
  try {
    await CodeModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Code deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete code" });
  }
});

module.exports = router;
