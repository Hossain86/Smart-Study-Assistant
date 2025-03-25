import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import './PDFSummary.css';  // Assuming you want to use custom styles as well

const API_URL = "http://localhost:5000"; // Update this if deployed

const PDFSummary: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please select a PDF file.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await axios.post(`${API_URL}/summarize-pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSummary(response.data.summary);
    } catch (err) {
      setError("Failed to summarize the PDF. Please try again.");
      console.error("Error summarizing PDF:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="summary-container py-5">
      <h2 className="text-center mb-4">Upload PDF for Summary</h2>
      <div className=" justify-content-center w-100">
        <div className="col-md-6">
          <div className="mb-4">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="form-control"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="btn btn-primary w-100"
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>

          {error && <p className="text-danger mt-3">{error}</p>}

          {summary && (
            <div className="mt-4 p-3 border rounded bg-light w-100">
              <h3 className="h5">Summary:</h3>
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PDFSummary;
