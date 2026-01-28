// 主题管理工具
import { ThemeName, themes } from '@/styles/themes';

// 检测是否在浏览器环境中
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

// 获取当前主题
export function getCurrentTheme(): ThemeName {
  if (isBrowser) {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    return savedTheme && Object.keys(themes).includes(savedTheme) 
      ? savedTheme 
      : 'silicon-valley';
  }
  return 'silicon-valley';
}

// 保存主题
export function saveTheme(theme: ThemeName): void {
  if (isBrowser) {
    localStorage.setItem('theme', theme);
    // 触发主题变化事件
    window.dispatchEvent(new CustomEvent('themeChange', { detail: theme }));
  }
}

// 获取主题颜色
export function getThemeColors(theme: ThemeName = getCurrentTheme()) {
  return themes[theme].colors;
}
