/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 忽略构建时的 ESLint 错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // 忽略构建时的 TS 类型错误
    ignoreBuildErrors: true,
  },
};
export default nextConfig;