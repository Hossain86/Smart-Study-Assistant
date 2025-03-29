import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider, useTheme } from "./layouts/ThemeContext";
import Sidebar from "./layouts/Sidebar";
import Test from "./components/test"; 
import HomePage from "./components/HomePage";
import QuestionGenerator from "./components/QuestionGenerator";
import LabReportGenerator from "./components/Lab-Report/LabReportGenerator";
import PDFSummary from "./components/PDFSummary";
import EssayGenerator from "./components/EssayGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import TopicExplanation from "./components/TopicExplanation";
import StudyPlan from "./components/StudyPlan";
import Aboutme from "./components/About-me/Aboutme";
import ContactMe from "./components/About-me/ContactMe";
import ParaphrasingTool from "./components/Paraphrasing";


const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </Router>
  );
};
const MainApp = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
      <Sidebar />
      <main
        className={`text-align-center pt-5 ${
          isDarkMode ? "dark-mode" : "light-mode"
        }`}
      >
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/pdfToqa" element={<QuestionGenerator />} />
          <Route path="/lab-report-generator" element={<LabReportGenerator />}/>
          <Route path="/pdf-summary" element={ <PDFSummary/> }/>
          <Route path="/eassy-generator" element={ <EssayGenerator/> }/>
          <Route path="/topic-explaination" element={ <TopicExplanation/> }/>
          <Route path="/paraphrase" element={ <ParaphrasingTool/> }/>
          <Route path="/study-plan-generator" element={ <StudyPlan/> }/>
          <Route path="/about-me" element={ <Aboutme/> }/>
          <Route path="/contact" element={ <ContactMe/> }/>
          <Route path="/submit" element={ <Test/> }/>
        </Routes>
      </main>
    </div>
  );
};
export default App;
