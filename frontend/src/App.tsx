import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import QuestionGenerator from "./components/QuestionGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from "./components/HomePage";
import { ThemeProvider, useTheme } from "./layouts/ThemeContext";
import Sidebar from "./layouts/Sidebar";
import Test from "./components/test";
import LabReportGenerator from "./components/Lab-Report/LabReportGenerator";
import PDFSummary from "./components/PDFSummary";
import EssayGenerator from "./components/EssayGenerator";


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
        <Route path="/pdfToqa" element={
            <QuestionGenerator />
         } />
          <Route path="/" element={<HomePage/>}/>
          <Route path="/lab-report-generator" element={<LabReportGenerator />}/>
          <Route path="/submit" element={ <Test/> }/>
          <Route path="/pdf-summary" element={ <PDFSummary/> }/>
          <Route path="/eassy-generator" element={ <EssayGenerator/> }/>
        </Routes>
      </main>
    </div>
  );
};
export default App;
