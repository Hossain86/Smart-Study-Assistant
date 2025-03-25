import "./about-me.css";
import { github, linkedin, mail } from "./svg";

function SecondComponent() {
  return (
    <div className="second-container">
      <div className="heading-message">
        <h1>About Me</h1>
        <h4>Be Humble | Be Kind | Be Strong</h4>
        <div className="imageContainer1">
          {/* <img
            src="/image1.png"
            alt="Portfolio Preview"
            className="heroImage1"
          /> */}
          <p>
            <h4>Hi, I am Aftab Hossain Mikat</h4>I am a CSE undergraduate at RUET with a
            passion for web development, problem-solving, and competitive
            programming. 🚀 I specialize in Node.js, Express.js, React, TypeScript, and JavaScript
            and love building interactive and efficient web applications.
            <br />
            {/* <button className="view-cv">View My Resume</button> */}
          </p>
        </div>
      </div>
      {/* Social Links Section */}
      <div className="socialLinks">
          <p>Feel free to get in touch:</p>
          <div className="icons">
            <a href="https://github.com/Hossain86" target="_blank" rel="noopener noreferrer">
              <img src={github} alt="github" style={{ height: "35px" }} />
            </a>
            
            <a href="https://linkedin.com/in/aftab-hossain-mikat-307a05249" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="linkedin" style={{ height: "30px" }} />
            </a>
            <a href="mailto:aftabhossainmikat@gmail.com">
            <img src={mail} alt="mail" style={{ height: "35px" }} />
            </a>
          </div>
        </div>
      
    </div>
  );
}

export default SecondComponent;
