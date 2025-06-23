import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import DoctorRegisterPage from "./pages/DoctorRegisterPage";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/Admin";
import DoctorPanel from "./pages/DoctorPanel";
import Profile from "./pages/Profile";
import LipReader from "./pages/LipReader";
import LipSyncAudioTranscriber from "./pages/LipSyncAudioTranscriber";
import LipSync from "./pages/LipSync";
import TextAnalyzer from "./pages/TextAnalyzer";
import PdfAnalyzer from "./pages/PdfSummarizer";
import QAEvaluator from "./pages/QAEvaluator";
import PdfQA from "./pages/PdfQA";
import SignatureVerification from "./pages/SignatureDetector";
import StudentEvaluation from "./pages/StudentEvaluation";
import StudentForm from "./pages/StudentEvaluation";
import CodeGenerator from "./pages/Codegenerator2";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const App = () => {
  return (
    <Router>
      <div className="bg-custom vh-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-teacher" element={<DoctorRegisterPage />} />
          <Route path="/dashboard" element={<CodeGenerator />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/student" element={<DoctorPanel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
