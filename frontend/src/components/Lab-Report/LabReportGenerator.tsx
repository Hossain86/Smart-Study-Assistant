// LabReportGenerator.tsx
import { useState } from "react";
import {
  generateLabReport,
  downloadLabReportDocx,
  downloadFinalDocx,
} from "../../api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import "./LabReportGenerator.css";

const LabReportGenerator = () => {
  const [topic, setTopic] = useState("");
  const [labReport, setLabReport] = useState("");
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
    submitted_to: "Dr. Teacher",
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
    } finally {
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
    setCoverData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-item-center justify-center pt-4 ms-4 me-4">
      <div className="generate-section">
        <h2 className="mb-4 fw-bold">Lab Report Generator</h2>
        <p className="all-p-text mb-3 fw-bold">
          Enter the topic of your lab report and generate it. You can also
          download the generated lab report in DOCX format.
        </p>
        <p className="all-p-text mb-3">
          Example Topic: <br />
          Find out the optimal solution of maximum profit using fractional
          Knapsack algorithm. <br />
        </p>
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
            disabled={isGenerating}
            className="btn-grad-blue fw-bold mt-3 mb-2 px-3 py-2 me-4"
          >
            {isGenerating ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border me-2" role="status">
                  <span className="spinner"></span>
                </div>
                Generating...
              </div>
            ) : (
              "Generate Report"
            )}
          </button>
          {/* New Download DOCX button */}
          <button
            onClick={handleDownloadDocx}
            disabled={isDownloading || !labReport}
            className="btn-grad-blue fw-bold mt-3 mb-2 px-3 py-2 me-3"
          >
            {isDownloading ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border me-2" role="status">
                  <span className="spinner"></span>
                </div>
                Generating and Downloading...
              </div>
            ) : (
              "Download DOCX without Coverpage"
            )}
          </button>
          {/* New Download Final DOCX button */}
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {/* Coverpage input fields */}
        <p className="all-p-text text-danger fw-bold">
          To generate Lab report with Coverpage PLEASE ENTER COVERPAGE DATA 
        </p>
        <div className="coverpage-inputs">
          <h4 className="text-xl font-semibold mb-2">Enter Coverpage Data</h4>
          <div className="input-label-section">
            <div className="all-inputs mb-3">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                placeholder="Department"
                value={coverData.department}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="course_code" className="form-label">
                Course Code
              </label>
              <input
                type="text"
                id="course_code"
                name="course_code"
                placeholder="Course Code"
                value={coverData.course_code}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="course_name" className="form-label">
                Course Name
              </label>
              <input
                type="text"
                id="course_name"
                name="course_name"
                placeholder="Course Name"
                value={coverData.course_name}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="assignment_name" className="form-label">
                Assignment Name
              </label>
              <input
                type="text"
                id="assignment_name"
                name="assignment_name"
                placeholder="Assignment Name"
                value={coverData.assignment_name}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date_of_submission" className="form-label">
                Date of Submission
              </label>
              <input
                type="text"
                id="date_of_submission"
                name="date_of_submission"
                placeholder="Date of Submission"
                value={coverData.date_of_submission}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="submitted_by_name" className="form-label">
                Submitted By (Name)
              </label>
              <input
                type="text"
                id="submitted_by_name"
                name="submitted_by_name"
                placeholder="Submitted By (Name)"
                value={coverData.submitted_by_name}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="submitted_by_roll" className="form-label">
                Roll Number
              </label>
              <input
                type="text"
                id="submitted_by_roll"
                name="submitted_by_roll"
                placeholder="Roll Number"
                value={coverData.submitted_by_roll}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="submitted_by_section" className="form-label">
                Section
              </label>
              <input
                type="text"
                id="submitted_by_section"
                name="submitted_by_section"
                placeholder="Section"
                value={coverData.submitted_by_section}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="submitted_by_series" className="form-label">
                Series
              </label>
              <input
                type="text"
                id="submitted_by_series"
                name="submitted_by_series"
                placeholder="Series"
                value={coverData.submitted_by_series}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="submitted_to" className="form-label">
                Submitted To (Teacher)
              </label>
              <input
                type="text"
                id="submitted_to"
                name="submitted_to"
                placeholder="Submitted To (Teacher)"
                value={coverData.submitted_to}
                onChange={handleCoverDataChange}
                className="all-p-text border rounded p-2"
              />
            </div>
          </div>
        </div>
        <button
          onClick={handleDownloadFinalDocx}
          disabled={isFinalDownloading || !topic.trim()}
          className="btn-grad-blue fw-bold new mt-3 mb-5 px-3 py-2"
        >
          {isFinalDownloading ? (
            <div className="d-flex align-items-center justify-content-center">
              <div className="spinner-border me-2" role="status">
                <span className="spinner"></span>
              </div>
              Generating Lab Report With Coverpage...
            </div>
          ) : (
            "Download DOCX With CoverPage"
          )}
        </button>
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
