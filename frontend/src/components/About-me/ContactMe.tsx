import "./ContactMe.css"
import { github, linkedin, mail } from "./svg";
function ContactMe(){
  return (
    <div className="contact-container">
      <h2>Contact Me</h2>
      <p>Feel free to reach out if you have any questions, need assistance, or just want to say hi 😀.</p>
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
      <a href="mailto:aftabhossainmikat@gmail.com">
              Click to mail me
            </a>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <input className="btn-grad-orange" type="submit" value="Submit" />
        </form>
      
    </div>
  );
}
export default ContactMe;