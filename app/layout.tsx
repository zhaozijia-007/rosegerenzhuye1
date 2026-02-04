import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeContext";

export const metadata: Metadata = {
  title: "赵子嘉 | 产品专家",
  description: "个人主页 + AI 工具导航站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
