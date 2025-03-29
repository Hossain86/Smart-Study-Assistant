import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fileDocument,paragraph, report,studyPlan,topic,lan, textView } from './svg';
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
        <Row className="mt-4" style={{ zIndex: -1 }}>
          
          <Col md={4} className="card-container">
          <div className="card-wrapper">
          {/* Recommended Label */}
          <div className="recommended-label">Recommended</div>
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                <img src={fileDocument} className="svg-icons" alt="Icon"/>
                </div>
                <Card.Title>PDF to MCQ & Narrative Generator</Card.Title>
                <Card.Text className="card-text">
                  Convert study materials into MCQs, narrative questions, and structured answers effortlessly.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/pdfToqa`)}>
                  Try Now
                </Button>
              </Card.Body>
            </Card>
          </div>
          </Col>

          
          <Col md={4} className="card-container">
          <div className="card-wrapper">
          {/* Recommended Label */}
          <div className="recommended-label">Recommended</div>

            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <img src={report} className="svg-icons" alt="Icon"/>
                </div>
                <Card.Title>Lab Report Generator</Card.Title>
                <Card.Text className="card-text">
                  Generate high-quality assignments or lab report in minutes with AI-powered assistance.
                </Card.Text>
                <Button variant="success" onClick={() => navigate(`/lab-report-generator`)}>
                  Generate Assignment
                </Button>
              </Card.Body>
            </Card>
        </div>
          </Col>


          <Col md={4} className="card-container">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                  <img src={textView} className="svg-icons" alt="Icon"/>
                </div>
                <Card.Title>Summarization Tool</Card.Title>
                <Card.Text className="card-text">
                  Summarize long documents or textbooks into concise, digestible summaries.
                </Card.Text>
                <Button variant="success" onClick={() => navigate(`/pdf-summary`)}>
                  Try Now
                </Button>
              </Card.Body>
            </Card>
          </Col>


          {/* New Feature Sections */}
          <Col md={4} className="card-container">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                <img src={paragraph} className="svg-icons" alt="Icon"/>
                </div>
                <Card.Title>Essay or Paragraph Generator</Card.Title>
                <Card.Text className="card-text">
                  Generate structured essays or reports based on given topics.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/eassy-generator`)}>
                  Try Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          

          <Col md={4} className="card-container">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                <img src={topic} className="svg-icons" alt="Icon"/>
                </div>
                <Card.Title>Topic Explanation</Card.Title>
                <Card.Text className="card-text">
                  Provide simplified and detailed explanations of complex topics or concepts.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/topic-explaination`)}>
                  Try Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="card-container">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                <img src={lan} className="svg-icons" alt="Icon"/>
                </div>
                <Card.Title>Paraphrasing Tool</Card.Title>
                <Card.Text className="card-text">
                Paraphrase text instantly without losing meaning with our free AI-powered paraphrasing tool.</Card.Text>
                <Button variant="success" onClick={() => navigate(`/paraphrase`)}>
                  Try Now
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="card-container">
            <Card className="feature-card" style={{ backgroundColor: "transparent", color: "inherit" }}>
              <Card.Body>
                <div className="feature-icon">
                <img src={studyPlan} className="svg-icons" alt="Icon"/>
                </div>
                <Card.Title>Personalized Study Plan</Card.Title>
                <Card.Text className="card-text">
                  Generate personalized study schedules based on upcoming exams or projects.
                </Card.Text>
                <Button className="btn-grad-orange" onClick={() => navigate(`/study-plan-generator`)}>
                  Try Now
                </Button>
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
                <a href="/about-me">About</a> | <a href="/contact">Contact</a> | <a href="/privacy">Privacy Policy</a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
};

export default Home;
