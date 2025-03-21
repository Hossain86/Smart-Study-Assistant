import { createContext, useState, useContext, ReactNode } from "react";

// Define a type for the context value
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create Context with default values
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component to wrap the app
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Load the theme from localStorage or default to false (light mode)
  const storedTheme = localStorage.getItem("theme");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    storedTheme ? JSON.parse(storedTheme) : false
  );

  // Toggle the theme
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Save the new theme in localStorage
    localStorage.setItem("theme", JSON.stringify(newMode));
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
