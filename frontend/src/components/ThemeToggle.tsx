"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faCircleHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { Console } from "console";

type Theme = "light" | "dark" | "system";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    // Get saved theme or default to system
    const savedTheme = (localStorage.getItem("theme") as Theme) || "system";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const html = document.documentElement;

    // Remove all theme classes
    html.classList.remove("light", "dark");

    if (newTheme === "system") {
      // Let CSS media queries handle it
      localStorage.removeItem("theme");
    } else {
      // Apply manual theme
      html.classList.add(newTheme);
      localStorage.setItem("theme", newTheme);
    }
  };

  const toggleTheme = () => {
    setIsSpinning(true);

    setTimeout(() => {
      let newTheme: Theme;

      if (theme === "system") {
        // From system to light
        newTheme = "light";
      } else if (theme === "light") {
        // From light to dark
        newTheme = "dark";
      } else {
        // From dark to system
        newTheme = "system";
      }

      setTheme(newTheme);
      applyTheme(newTheme);
      setIsSpinning(false);
    }, 300);
    console.log(`Theme changed to: ${theme}`);
  };

  const getIcon = () => {
    if (theme === "system") {
      return faCircleHalfStroke; // System icon
    } else if (theme === "light") {
      return faSun; // Sun for light mode
    } else {
      return faMoon; // Moon for dark mode
    }
  };

  const getTooltip = () => {
    if (theme === "system") return "System theme";
    if (theme === "light") return "Light mode";
    return "Dark mode";
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 font-medium transition-colors duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-110 transform transition-transform"
      aria-label={`Toggle theme - Current: ${getTooltip()}`}
      title={getTooltip()}
    >
      <FontAwesomeIcon
        icon={getIcon()}
        className={`text-xl transition-all duration-300 ${
          isSpinning ? "rotate-180 scale-110" : "rotate-0"
        }`}
      />
    </button>
  );
}
