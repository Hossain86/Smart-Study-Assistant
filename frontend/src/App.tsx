import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; 
import QuestionGenerator from "./components/QuestionGenerator";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import HomePage from "./components/HomePage";
import { ThemeProvider, useTheme } from "./layouts/ThemeContext";
import Sidebar from "./layouts/Sidebar";


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
        </Routes>
      </main>
    </div>
  );
};
export default App;
