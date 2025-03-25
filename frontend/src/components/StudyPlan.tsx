import { useState } from "react";
import axios  from "axios";
import ReactMarkdown from "react-markdown";

const StudyPlan = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [educationLevel, setEducationLevel] = useState("");
  const [examDate, setExamDate] = useState("");
  const [daysLeft, setDaysLeft] = useState<number | "">("");
  const [subjects, setSubjects] = useState<string[]>([]);
  const [preferences, setPreferences] = useState("");
  const [availability, setAvailability] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subjectOptions = [
    "Math",
    "Physics",
    "Chemistry",
    "Computer Science",
    "Biology",
    "History",
    "Economics",
  ];

  const handleSubjectChange = (subject: string) => {
    if (subjects.includes(subject)) {
      setSubjects(subjects.filter((s) => s !== subject));
    } else {
      setSubjects([...subjects, subject]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setLoading(true);
    setPlan("");

    try {
      const response = await axios.post("http://localhost:5000/generate-study-plan", {
        name,
        age,
        educationLevel,
        examDate,
        daysLeft,
        subjects,
        preferences,
        availability,
      });
      setPlan(response.data.studyPlan || "");

      console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to generate study plan.");
      } else {
        setError("An unexpected error occurred.");
      }    
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h2 className="card-title text-center text-primary mb-4">
                Personalized Study Plan Generator
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    placeholder="Your Age"
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <select
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    required
                    className="form-select"
                  >
                    <option value="">Select Education Level</option>
                    <option value="High School">High School</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Exam Date:</label>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={daysLeft}
                    onChange={(e) => setDaysLeft(Number(e.target.value))}
                    placeholder="Days left until exam"
                    required
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Select Subjects:</label>
                  <div className="row">
                    {subjectOptions.map((subject) => (
                      <div key={subject} className="col-6 mb-2">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={subjects.includes(subject)}
                            onChange={() => handleSubjectChange(subject)}
                            id={subject}
                          />
                          <label className="form-check-label" htmlFor={subject}>
                            {subject}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <textarea
                    value={preferences}
                    onChange={(e) => setPreferences(e.target.value)}
                    placeholder="Study preferences (e.g., morning, night, visual learning)"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="Daily study availability (e.g., 2 hours in the evening)"
                    className="form-control"
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  {loading ? (
                    <span>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Generating...
                    </span>
                  ) : (
                    "Generate Study Plan"
                  )}
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}

              {plan && (
                <div className="alert alert-success mt-4">
                  <h5>Your Study Plan:</h5>
                  <ReactMarkdown>{plan}</ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;