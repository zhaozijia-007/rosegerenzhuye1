"use client";

import { useState, useEffect } from "react";
import { ThemeName, themes } from "@/styles/themes";
import {
  subscribeToThemeChanges,
  setTheme as setSimpleTheme,
} from "@/utils/simpleTheme";

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("silicon-valley");

  // 订阅主题变化
  useEffect(() => {
    const unsubscribe = subscribeToThemeChanges((theme) => {
      setCurrentTheme(theme);
    });

    return unsubscribe;
  }, []);

  const handleThemeChange = (theme: ThemeName) => {
    console.log("ThemeSwitcher: handleThemeChange called with:", theme);
    setSimpleTheme(theme);
  };

  return (
    <div className="relative">
      <button
        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors flex items-center space-x-1"
        aria-expanded={false}
      >
        <span>{themes[currentTheme].displayName}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
        {Object.values(themes).map((theme) => (
          <button
            key={theme.name}
            onClick={() => handleThemeChange(theme.name)}
            className={`block w-full text-left px-4 py-2 text-sm ${
              currentTheme === theme.name
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            {theme.displayName}
          </button>
        ))}
      </div>
    </div>
  );
}
