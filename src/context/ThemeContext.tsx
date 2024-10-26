"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    // Retrieve the theme from localStorage on initial load
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      console.log("Restoring theme:", savedTheme);
      setTheme(savedTheme);
    } else {
      setTheme("light"); // Default to light theme if no saved theme
    }
  }, []); // Run only on initial mount

  useEffect(() => {
    if (theme) {
      console.log("Applying theme:", theme);
      // Apply the current theme to the document body
      document.body.dataset.theme = theme;
      // Save the theme to localStorage whenever it changes
      localStorage.setItem("theme", theme);
    }
  }, [theme]); // Run when theme changes

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme: theme || "light", toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;