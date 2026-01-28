// 简化版主题管理工具
import { ThemeName, themes } from '@/styles/themes';

// 全局主题状态
let currentTheme: ThemeName = 'silicon-valley';
let themeListeners: ((theme: ThemeName) => void)[] = [];

// 检测是否在浏览器环境中
const isBrowser = typeof window !== 'undefined';

// 颜色映射表
const colorMap: Record<string, string> = {
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'purple-600': '#7e22ce',
  'purple-700': '#6b21a8',
  'orange-500': '#f97316',
  'orange-600': '#ea580c',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'neon-green': '#39ff14',
  'neon-green-bright': '#5eff3a',
  'cyber-purple': '#9d4edd',
  'cyber-purple-bright': '#c77dff',
  'inter-blue': '#0066cc',
  'inter-blue-dark': '#0052a3',
  'black': '#000000',
};

// 初始化：从 localStorage 加载主题
if (isBrowser) {
  const savedTheme = localStorage.getItem('theme') as ThemeName | null;
  if (savedTheme && Object.keys(themes).includes(savedTheme)) {
    currentTheme = savedTheme;
  }
}

// 订阅主题变化
export function subscribeToThemeChanges(callback: (theme: ThemeName) => void) {
  themeListeners.push(callback);
  // 立即调用一次，获取当前主题
  callback(currentTheme);
  return () => {
    themeListeners = themeListeners.filter(listener => listener !== callback);
  };
}

// 设置主题
export function setTheme(theme: ThemeName) {
  currentTheme = theme;
  // 保存到 localStorage
  if (isBrowser) {
    localStorage.setItem('theme', theme);
  }
  // 通知所有订阅者
  themeListeners.forEach(listener => listener(theme));
  console.log('Theme set to:', theme);
}

// 获取当前主题
export function getCurrentTheme() {
  return currentTheme;
}

// 获取主题颜色
export function getThemeColors(theme: ThemeName = 'silicon-valley') {
  // 始终使用 silicon-valley 主题
  const colors = themes['silicon-valley'].colors;
  
  // 只返回硅谷风主题颜色
  return {
    primary: colorMap[colors.primary] || '#0066cc',
    primaryHover: colorMap[colors.primaryHover] || '#0052a3',
    background: '#f9fafb', // bg-gray-50
    card: '#ffffff', // bg-white
    text: '#111827', // text-gray-900
    textSecondary: '#4b5563', // text-gray-600
    border: '#e5e7eb', // border-gray-200
    borderHover: '#dbeafe', // border-blue-100
    shadow: 'rgba(0, 0, 0, 0.05)', // 微质感阴影
  };
}
