"use client";

import { useState, useEffect } from "react";
import {
  subscribeToThemeChanges,
  getThemeColors,
  getCurrentTheme,
} from "@/utils/simpleTheme";
import { ThemeName } from "@/styles/themes";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    techStack: string[];
    url?: string;
  };
}

export default function ProjectCard({ project }: ProjectCardProps) {
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

  if (project.url && project.url !== "#") {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="h-full block"
      >
        <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300 cursor-pointer group h-full flex flex-col">
          <h3 className="text-xl font-semibold mb-3 transition-colors text-gray-800 hover:text-blue-600">
            {project.title}
          </h3>
          <p className="mb-4 flex-grow text-gray-600">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </a>
    );
  }

  return (
    <div className="h-full">
      <div className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all duration-300 h-full flex flex-col">
        <h3 className="text-xl font-semibold mb-3 text-gray-800">
          {project.title}
        </h3>
        <p className="mb-4 flex-grow text-gray-600">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
