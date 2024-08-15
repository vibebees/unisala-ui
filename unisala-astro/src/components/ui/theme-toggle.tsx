import React, { useState, useEffect } from "react";
import { useMounted } from "@/hooks/use-mounted";

const DarkModeToggle: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined;
    }
    return (
      window.localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  const mounted = useMounted();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return mounted ? (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="darkmode-toggle"
        className="sr-only"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />
      <label
        htmlFor="darkmode-toggle"
        className="w-16 h-8 bg-gray-300 rounded-full p-1 flex items-center cursor-pointer
                   relative transition-colors duration-300 ease-in-out
                   dark:bg-gray-700"
      >
        <div
          className={`w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out 
                         ${
                           theme === "dark"
                             ? "translate-x-8 bg-neutral-400"
                             : "translate-x-0 bg-yellow-500"
                         }`}
        >
          <svg
            className={`w-6 h-6 text-white ${
              theme === "dark" ? "opacity-0" : "opacity-100"
            } transition-opacity duration-300 ease-in-out`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <svg
            className={`w-6 h-6 text-white ${
              theme === "dark" ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300 ease-in-out absolute top-0 left-0`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      </label>
    </div>
  ) : (
    <div />
  );
};

export default DarkModeToggle;
