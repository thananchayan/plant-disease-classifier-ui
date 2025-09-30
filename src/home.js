import React, { useState, useEffect } from "react";
import axios from "axios";
import "./home.css";
import { FaCloudUploadAlt } from "react-icons/fa";


import logo from "./assets/logoA.png";
import bg from "./bg.png"; 

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000/analyze";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url); 
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    setSelectedFile(f || null);
    setResult(null);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert("Please upload an image");
    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    setProgress(0);
    setResult(null);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded * 100) / evt.total);
            setProgress(pct);
          }
        },
      });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
      setTimeout(() => setProgress(0), 1500);
    }
  };

  return (
    <div className="pg-page" style={{ backgroundImage: `url(${bg})` }}>

      <header className="pg-header">
        <div className="pg-left">
          <img className="pg-logo" src={logo} alt="PlantGuard" />
        </div>
        <div className="pg-tagline">AI powered Plant Disease Detector</div>
      </header>


      <div className="pg-divider" />


      <section className="pg-backdrop">
        <p className="pg-caption">
          Our smart Plant Disease Detector helps farmers and gardeners identify plant diseases within minutes, ensuring healthier crops and better yields. By simply scanning the plant, you can quickly detect issues before they spread, saving time, effort, and money. Early detection means early action, allowing you to protect your harvest and maintain a thriving farm. Fast, reliable, and easy to use – it’s your trusted partner in sustainable agriculture  </p>


        <div className="pg-card">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpload();
            }}
            className="resume-form"
          >
        
            <div className="upload-box">
              <FaCloudUploadAlt className="upload-icon" />
              <p>{selectedFile ? selectedFile.name : "Drag and drop a plant leaf image here"}</p>
              <small>Maximum file size 20MB · JPG/PNG</small>

              <input
                id="fileUpload"
                type="file"
                accept=".png,.jpg,.jpeg,image/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="fileUpload" className="browse-btn upload-btn">
                Browse File
              </label>
            </div>

            {previewUrl && (
              <div className="preview-wrap">
                <img src={previewUrl} alt="preview" className="preview-img" />
              </div>
            )}

      
            {loading && (
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

   
            <div className="action-row">
              <button
                type="submit"
                className={`browse-btn analyze-btn ${loading ? "loading" : ""}`}
                disabled={loading || !selectedFile}
              >
                {loading ? "Analyzing..." : "Analyze"}
              </button>

              {previewUrl && (
                <button
                  type="button"
                  className="browse-btn clear-btn"
                  onClick={clearSelection}
                >
                  Remove
                </button>
              )}
            </div>
          </form>

      
          {result && (
            <div className="pg-result">
              {result.class && (
                <p>
                  <strong>Label:</strong> {result.class}
                </p>
              )}
              {result.confidence != null && (
                <p>
                  <strong>Confidence:</strong>{" "}
                  {(parseFloat(result.confidence) * 100).toFixed(2)}%
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
