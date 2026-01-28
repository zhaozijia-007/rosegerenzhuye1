"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, Briefcase, User, Menu, X } from "lucide-react";
import {
  subscribeToThemeChanges,
  getThemeColors,
  getCurrentTheme,
} from "@/utils/simpleTheme";
import { ThemeName } from "@/styles/themes";

export default function Navbar() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("silicon-valley");
  const [themeColors, setThemeColors] = useState(
    getThemeColors("silicon-valley"),
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // 根据主题应用不同的样式
  const getNavbarStyle = () => {
    // 只返回硅谷风样式
    return {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderColor: "#e5e7eb",
      color: "#111827",
      backdropFilter: "blur(10px)",
    };
  };

  const navbarStyle = getNavbarStyle();

  return (
    <nav
      className="sticky top-0 py-4 px-4 z-50"
      style={{
        backgroundColor: navbarStyle.backgroundColor,
        borderBottom: `1px solid ${navbarStyle.borderColor}`,
        color: navbarStyle.color,
        backdropFilter: navbarStyle.backdropFilter,
      }}
    >
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 text-xl font-bold">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Anime%20style%20portrait%20of%20a%20young%20woman%20with%20black%20hair%20and%20bangs%2C%20wearing%20a%20maroon%20and%20yellow%20scarf%20and%20black%20jacket%2C%20friendly%20smile%2C%20big%20sparkling%20eyes%2C%20manga%20art%20style%2C%20clean%20lines%2C%20colorful&image_size=portrait_4_3"
                alt="Anime Avatar"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <span className="text-sm md:text-xl" style={{ color: "#000000" }}>
              赵子嘉的个人主页
            </span>
          </Link>

          {/* 桌面端导航菜单 */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            <Link
              href="#tools"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Wrench size={16} />
              工具箱
            </Link>
            <Link
              href="#projects"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Briefcase size={16} />
              项目
            </Link>
            <Link
              href="#experience"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <User size={16} />
              经历
            </Link>
          </div>

          {/* 移动端汉堡菜单按钮 */}
          <button
            className="md:hidden text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* 移动端导航菜单 */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="#tools"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Wrench size={16} />
                工具箱
              </Link>
              <Link
                href="#projects"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Briefcase size={16} />
                项目
              </Link>
              <Link
                href="#experience"
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User size={16} />
                经历
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
