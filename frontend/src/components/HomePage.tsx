import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FileText, ClipboardList, Edit, BookOpen, Flag } from "lucide-react"; // Alternative icons
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Container className="text-center mt-0">
        <header className="hero-section">
          <h1 className="hero-title">
            Your Study Helper{" "}
            <img
              src="https://media.giphy.com/media/9yRMxLuRqyQ0x3jJXD/giphy.gif?cid=790b7611zp1kyu5zszx39agwh7eb5x9am6j8b8d93rwuj4lc&ep=v1_stickers_search&rid=giphy.gif&ct=s"
              alt="ai helper"
              className="gif-image"
            />
          </h1>
          <p className="hero-subtitle">
            Boost your learning with AI-powered tools for MCQs, assignments, and more!
          </p>
        </header>

        {/* Features Section */}
        <Row className="mt-5" style={{ zIndex: -1 }}>
          <Col md={4} className="card-container mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <FileText size={50} />
                </div>
                <Card.Title>PDF to MCQ & Narrative Generator</Card.Title>
                <Card.Text>
                  Convert study materials into MCQs, narrative questions, and structured answers effortlessly.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/pdfToqa`)}>Try Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <ClipboardList size={50} />
                </div>
                <Card.Title>Assignment Or Lab Report Generator</Card.Title>
                <Card.Text>
                  Generate high-quality assignments or lab report in minutes with AI-powered assistance.
                </Card.Text>
                <Button variant="success" onClick={() => navigate(`/lab-report-generator`)}>Generate Assignment</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* New Feature Sections */}
          <Col md={4} className="mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <Edit size={50} />
                </div>
                <Card.Title>Essay or Paragraph Generator</Card.Title>
                <Card.Text>
                  Generate structured essays or reports based on given topics.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/essayReportGenerator`)}>Try Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <BookOpen size={50} />
                </div>
                <Card.Title>Summarization Tool</Card.Title>
                <Card.Text>
                  Summarize long documents or textbooks into concise, digestible summaries.
                </Card.Text>
                <Button  variant="success" onClick={() => navigate(`/summarizer`)}>Try Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <Flag size={50} />
                </div>
                <Card.Title>Topic Explanation</Card.Title>
                <Card.Text>
                  Provide simplified and detailed explanations of complex topics or concepts.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/topicExplanation`)}>Try Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <Edit size={50} />
                </div>
                <Card.Title>Grammar and Language Check</Card.Title>
                <Card.Text>
                  Enhance your assignments or essays with grammar, spelling, and style suggestions.
                </Card.Text>
                <Button  variant="success" onClick={() => navigate(`/grammarCheck`)}>Try Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <Edit size={50} />
                </div>
                <Card.Title>Personalized Study Plan</Card.Title>
                <Card.Text>
                  Generate personalized study schedules based on upcoming exams or projects.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/studyPlan`)}>Try Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <Flag size={50} />
                </div>
                <Card.Title>Time Management Assistant</Card.Title>
                <Card.Text>
                  Track your study hours, set reminders, and get productivity tips for effective learning.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/timeManagement`)}>Try Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer Section */}
      <footer className="footer mt-5">
        <Container>
          <Row className="text-center">
            <Col md={12}>
              <p className="footer-text">
                &copy; {new Date().getFullYear()} Your Study Helper. All Rights Reserved.
              </p>
              <p className="footer-links">
                <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
