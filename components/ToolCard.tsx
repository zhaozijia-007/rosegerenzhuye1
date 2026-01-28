"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import {
  subscribeToThemeChanges,
  getThemeColors,
  getCurrentTheme,
} from "@/utils/simpleTheme";
import { ThemeName } from "@/styles/themes";

interface ToolCardProps {
  tool: {
    id: number;
    name: string;
    description: string;
    url: string;
    icon: string;
  };
}

export default function ToolCard({ tool }: ToolCardProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("silicon-valley");
  const [themeColors, setThemeColors] = useState(
    getThemeColors("silicon-valley"),
  );

  // 订阅主题变化并初始化状态
  useEffect(() => {
    // 初始化状态
    const initialTheme = getCurrentTheme();
    setCurrentTheme(initialTheme);
    setThemeColors(getThemeColors(initialTheme));

    const unsubscribe = subscribeToThemeChanges((theme) => {
      setCurrentTheme(theme);
      setThemeColors(getThemeColors(theme));
    });

    return unsubscribe;
  }, []);

  // 只渲染硅谷风卡片
  return (
    <a href={tool.url} target="_blank" rel="noopener noreferrer">
      <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300 flex flex-col h-full group">
        <div className="text-4xl mb-4">{tool.icon}</div>
        <h3 className="text-xl font-semibold mb-2 transition-colors text-gray-800 hover:text-blue-600">
          {tool.name}
        </h3>
        <p className="mb-4 flex-grow text-gray-600">{tool.description}</p>
        <div className="flex items-center font-medium text-blue-600">
          <span>访问工具</span>
          <ArrowRight
            size={16}
            className="ml-2 group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </a>
  );
}
