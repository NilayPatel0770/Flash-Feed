import React from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../../context/ThemeContext";

const ThemeSwitcher = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className="p-2 rounded-xl cursor-pointer hover:bg-slate-200/80 dark:hover:bg-slate-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="h-6 w-6 text-amber-400 hover:text-amber-300 transition-colors" />
      ) : (
        <MoonIcon className="h-6 w-6 text-slate-700 hover:text-slate-900 transition-colors" />
      )}
    </button>
  );
};

export default ThemeSwitcher;