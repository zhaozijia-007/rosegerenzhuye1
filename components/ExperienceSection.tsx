"use client";

import { useState, useEffect } from "react";
import { EXPERIENCES, SKILLS } from "@/lib/data";
import {
  subscribeToThemeChanges,
  getThemeColors,
  getCurrentTheme,
} from "@/utils/simpleTheme";
import { ThemeName } from "@/styles/themes";

export default function ExperienceSection() {
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

  // 只渲染硅谷风 ExperienceSection
  return (
    <section id="experience" className="py-16">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">经历与技能</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* 工作经历时间轴 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-6">工作经历</h3>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div
                  key={exp.id}
                  className="relative pl-8 border-l border-gray-200"
                >
                  <div
                    className="absolute left-[-5px] top-0 w-2 h-2 rounded-full"
                    style={{ backgroundColor: themeColors.primary }}
                  ></div>
                  <div className="mb-1">
                    <span className="font-semibold">{exp.position}</span>
                    <span className="text-gray-500 ml-2">@ {exp.company}</span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2">{exp.period}</div>
                  <p className="text-gray-600">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 技能标签云 */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold mb-6">技能</h3>
            <div className="flex flex-wrap gap-3">
              {SKILLS.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full transition-colors hover:bg-blue-50 hover:text-blue-600"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
