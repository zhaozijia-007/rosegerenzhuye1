"use client";

import { useState, useEffect } from "react";
import { Github, MessageSquare, Mail, Linkedin } from "lucide-react";
import {
  subscribeToThemeChanges,
  getThemeColors,
  getCurrentTheme,
} from "@/utils/simpleTheme";
import { ThemeName } from "@/styles/themes";
import { PERSONAL_INFO } from "@/lib/data";

export default function Hero() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("silicon-valley");
  const [themeColors, setThemeColors] = useState(
    getThemeColors("silicon-valley"),
  );

  const fullText = PERSONAL_INFO.bio;

  // 订阅主题变化并初始化状态
  useEffect(() => {
    // 只在客户端运行，避免水合错误
    if (typeof window !== "undefined") {
      const initialTheme = getCurrentTheme();
      setCurrentTheme(initialTheme);
      setThemeColors(getThemeColors(initialTheme));

      const unsubscribe = subscribeToThemeChanges((theme) => {
        setCurrentTheme(theme);
        setThemeColors(getThemeColors(theme));
      });

      return unsubscribe;
    }
  }, []);

  // 只渲染硅谷风 Hero 区域
  return (
    <section className="py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-5">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
            <img
              src="/images/avatar.png"
              alt="Rose"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="text-left">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3"
              style={{ color: themeColors.primary }}
            >
              {PERSONAL_INFO.name}
            </h1>
            <p
              className="text-base sm:text-lg md:text-xl mb-4"
              style={{ color: themeColors.textSecondary }}
            >
              {PERSONAL_INFO.title}
            </p>
            <p className="text-sm sm:text-base md:text-lg mb-6 max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>
            <div className="flex space-x-4 sm:space-x-6">
              <div className="relative group">
                <a
                  href="#"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <MessageSquare size={24} />
                </a>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  小红书 388092636
                </span>
              </div>
              <div className="relative group">
                <a
                  href="mailto:zhaozijiaer@163.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Mail size={24} />
                </a>
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  zhaozijiaer@163.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
