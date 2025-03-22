import "bootstrap/dist/css/bootstrap.min.css";
import { useTheme } from "./ThemeContext";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";


const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();


  return (
      <div className="new-class">
        <img
          className="h-7 img-fluid custom-logo cursor-pointer"
          src="https://media.giphy.com/media/mrkk6ctjilhoKnFH8d/giphy.gif?cid=790b7611vla8d1bmshd9ce8spgelpl2jojdnpzdyti54ewqh&ep=v1_stickers_search&rid=giphy.gif&ct=s"
          alt="Logo"
          onClick={() => navigate("/")}
        />
        <h5
          className="all-h-text"
          onClick={() => navigate("/")}
        >
          BoostLearning<span className="text-warning"> AI</span>
        </h5>

        <button
          className="all-p-text btn-grad-blue btn btn-sm btn-outline-light ms-auto fs-10"
          onClick={toggleTheme}
          style={{ zIndex: 1100 }}
        >
          <b>{isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}</b>
        </button>
      </div>
  );
};

export default Sidebar;
