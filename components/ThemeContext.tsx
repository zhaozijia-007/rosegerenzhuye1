"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { ThemeName, themes } from "@/styles/themes";

export interface ThemeContextType {
  currentTheme: ThemeName;
  themeColors: (typeof themes)["silicon-valley"]["colors"];
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // 服务器端和客户端首次渲染都使用默认主题，避免水合错误
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("silicon-valley");
  // 直接存储主题颜色，确保状态更新时能够正确触发重新渲染
  const [themeColors, setThemeColors] = useState(
    themes["silicon-valley"].colors,
  );

  // 当主题变化时，更新主题颜色
  useEffect(() => {
    setThemeColors(themes[currentTheme].colors);
    console.log(
      "Theme changed:",
      currentTheme,
      "Colors:",
      themes[currentTheme].colors,
    );
  }, [currentTheme]);

  // 只在客户端执行，读取 localStorage 并更新主题
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeName | null;
    if (savedTheme && Object.keys(themes).includes(savedTheme)) {
      setCurrentTheme(savedTheme);
      console.log("Loaded theme from localStorage:", savedTheme);
    }
  }, []);

  // 保存主题到 localStorage
  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    console.log("Saved theme to localStorage:", currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeName) => {
    console.log("Setting theme:", theme);
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, themeColors, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
