// 主题配置文件
export type ThemeName = 'silicon-valley';

export interface Theme {
  name: ThemeName;
  displayName: string;
  colors: {
    primary: string;
    primaryHover: string;
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    borderHover: string;
    shadow: string;
  };
}

export const themes: Record<ThemeName, Theme> = {
  'silicon-valley': {
    name: 'silicon-valley',
    displayName: '硅谷 SaaS 风',
    colors: {
      primary: 'inter-blue',
      primaryHover: 'inter-blue-dark',
      background: 'bg-gray-50',
      card: 'bg-white',
      text: 'text-gray-900',
      textSecondary: 'text-gray-600',
      border: 'border-gray-200',
      borderHover: 'border-blue-100',
      shadow: 'shadow-sm',
    },
  },
};

export default themes;