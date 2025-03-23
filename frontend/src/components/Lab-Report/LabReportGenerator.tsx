// LabReportGenerator.tsx
import { useState } from "react";
import { generateLabReport, downloadLabReportDocx , downloadFinalDocx } from "../../api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./LabReportGenerator.css";

const LabReportGenerator = () => {
  const [topic, setTopic] = useState("");
  const [labReport, setLabReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isFinalDownloading, setIsFinalDownloading] = useState(false);

  // State for coverpage details with default values
  const [coverData, setCoverData] = useState({
    department: "Computer Science and Engineering",
    course_code: "CSE-1102",
    course_name: "Introduction to Programming",
    assignment_name: "Lab Report Assignment",
    date_of_submission: "01/01/2025",
    submitted_by_name: "Student Name",
    submitted_by_roll: "2103000",
    submitted_by_section: "A",
    submitted_by_series: "21",
    submitted_to: "Dr. Teacher"
  });

  const handleGenerateReport = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    setIsGenerating(true);
    setError("");
    setLabReport("");

    try {
      const report = await generateLabReport(topic);
      console.log("Received Lab Report:", report); // Debugging line
      setLabReport(report);
    } catch (err) {
      setError("Failed to generate the lab report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadDocx = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic to download the DOCX.");
      return;
    }
    setError("");
    setIsDownloading(true);
    try {
      const blob = await downloadLabReportDocx(topic);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "lab_report.docx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download the lab report DOCX. Please try again.");
    }
    finally {
      setIsDownloading(false);
    }
  };


  const handleDownloadFinalDocx = async () => {
    if (!topic.trim()) {
      setError("Please enter a topic to download the final DOCX.");
      return;
    }
    setError("");
    setIsFinalDownloading(true);
    try {
      const blob = await downloadFinalDocx(topic, coverData);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "final_lab_report.docx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to download final DOCX. Please try again.");
    } finally {
      setIsFinalDownloading(false);
    }
  };

  // Handle change for coverData fields
  const handleCoverDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoverData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-item-center justify-center pt-4 ms-4 me-4">
      <div className="generate-section">
        <h1 className="text-3xl font-bold mb-4">Lab Report Generator</h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter lab report topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="all-p-text border rounded h-25 w-100 p-2"
          />
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating || isDownloading}
            className="btn-grad-blue mt-3 mb-4 px-3 py-2 me-4"
          >
            {isGenerating ? "Generating..." : "Generate Report"}
          </button>
          {/* New Download DOCX button */}
          <button
            onClick={handleDownloadDocx}
            disabled={isGenerating || isDownloading || !labReport}
            className="btn-grad-blue mt-3 mb-4 px-3 py-2 me-3"
          >
            {isDownloading ? "Preparing DOCX..." : "Download DOCX"}
          </button>
          {/* New Download Final DOCX button */}
          <button
            onClick={handleDownloadFinalDocx}
            disabled={isGenerating || isFinalDownloading || !topic.trim()}
            className="btn-grad-blue mt-3 mb-4 px-3 py-2"
          >
            {isFinalDownloading ? "Preparing Final DOCX..." : "Download Final DOCX With CoverPage"}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Coverpage input fields */}
        <div className="coverpage-inputs mt-4">
          <h2 className="text-xl font-semibold mb-2">Coverpage Details</h2>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={coverData.department}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="course_code"
            placeholder="Course Code"
            value={coverData.course_code}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="course_name"
            placeholder="Course Name"
            value={coverData.course_name}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="assignment_name"
            placeholder="Assignment Name"
            value={coverData.assignment_name}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="date_of_submission"
            placeholder="Date of Submission"
            value={coverData.date_of_submission}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="submitted_by_name"
            placeholder="Submitted By (Name)"
            value={coverData.submitted_by_name}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="submitted_by_roll"
            placeholder="Roll Number"
            value={coverData.submitted_by_roll}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="submitted_by_section"
            placeholder="Section"
            value={coverData.submitted_by_section}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="submitted_by_series"
            placeholder="Series"
            value={coverData.submitted_by_series}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
          <input
            type="text"
            name="submitted_to"
            placeholder="Submitted To (Teacher)"
            value={coverData.submitted_to}
            onChange={handleCoverDataChange}
            className="all-p-text border rounded p-2 mb-2"
          />
        </div>
        
        
        <p className="all-p-text">
          Ex Topic: <br />
          Study the efficiency of different converters, such as DC-DC or AC-DC <br />
          Find out the optimal solution of maximum profit using fractional Knapsack algorithm. <br />
          Implement and compare Insertion Sort, Counting Sort, and Merge Sort based on various input size on randomly generated data.  The comparison metric should be the execution time of each sorting algorithm. <br />
          Compare Quickhull and Graham Scan based on various input size on randomly generated points.  The comparison metric should be the execution time of each sorting algorithm. 
        </p>
      </div>
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
