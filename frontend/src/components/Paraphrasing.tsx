import React, { useState } from "react";
import { paraphraseText } from "../api"; // Import API function
import ReactMarkdown from "react-markdown";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const ParaphrasingTool: React.FC = () => {
  const [text, setText] = useState("");
  const [paraphrased, setParaphrased] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleParaphrase = async () => {
    if (!text.trim()) {
      setError("⚠️ Please enter some text to paraphrase.");
      return;
    }

    setLoading(true);
    setError("");
    setParaphrased("");

    try {
      const result = await paraphraseText(text);
      setParaphrased(result.paraphrased_text);
    } catch (err) {
      setError("❌ Failed to paraphrase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (paraphrased) {
      navigator.clipboard.writeText(paraphrased);
      alert("✅ Paraphrased text copied!");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center fw-bold">🔄 Paraphrasing Tool</h2>
        
        <textarea
          className="form-control mt-3"
          rows={5}
          placeholder="Enter text to paraphrase..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleParaphrase}
          className="btn btn-primary w-100 mt-3"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              Paraphrasing...
            </>
          ) : (
            "Paraphrase"
          )}
        </button>

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {paraphrased && (
          <div className="mt-4 p-3 bg-light border rounded">
            <h4 className="fw-semibold">📝 Paraphrased Text:</h4>
            <button
              onClick={handleCopy}
              className="btn btn-outline-secondary mt-2"
            >
              📋 Copy
            </button>
            <ReactMarkdown>{paraphrased}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default ParaphrasingTool;