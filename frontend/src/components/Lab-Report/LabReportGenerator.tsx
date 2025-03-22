import { useState } from "react";
import { generateLabReport } from "../../api";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';


const LabReportGenerator = () => {
  const [topic, setTopic] = useState("");
  const [labReport, setLabReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateReport = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }

    setLoading(true);
    setError("");
    setLabReport("");

    try {
      const report = await generateLabReport(topic);
      console.log("Received Lab Report:", report); // Debugging line
      setLabReport(report);
    } catch (err) {
      setError("Failed to generate the lab report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-item-center justify-center pt-4 ms-4 me-4 mt-4">
      <h1 className="text-3xl font-bold mb-4">Lab Report Generator</h1>

      <input
        type="text"
        placeholder="Enter lab report topic..."
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border rounded p-2 w-75 me-2"
      />

      <button
        onClick={handleGenerateReport}
        disabled={loading}
        className="btn-grad-blue mt-4 px-4 py-2"
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {labReport && (
        <div className="mt-6 p-4 bg-white rounded shadow-md w-2/3">
          <h2 className="text-xl font-semibold mb-2">Generated Lab Report:</h2>
          <ReactMarkdown 
        children={labReport} 
        remarkPlugins={[remarkGfm]} 
        rehypePlugins={[rehypeRaw]} // ✅ Enable HTML parsing
      />
        </div>
      )}

    </div>
  );
};

export default LabReportGenerator;
