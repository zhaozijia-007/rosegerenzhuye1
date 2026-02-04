# 接入 AI 功能到 ChatBot 组件

## 步骤 1：安装依赖
- 运行命令 `npm install openai` 来安装 OpenAI 库，用于兼容 DeepSeek API

## 步骤 2：配置环境变量
- 创建 `.env.local` 文件
- 在文件中添加 `DEEPSEEK_API_KEY=` 配置项（留空，用户会自己填写 API Key）

## 步骤 3：创建后端接口
- 在 `app/api/chat/` 目录下创建 `route.ts` 文件
- 实现 POST 接口，使用 OpenAI 客户端调用 DeepSeek API
- 配置 baseURL 为 `https://api.deepseek.com`
- 读取环境变量中的 API Key
- 使用 `deepseek-chat` 模型
- 设置系统人设 (System Prompt)："你是 Rose 的数字分身，一位极简主义风格的产品经理。你的回答要简练、专业。"

## 步骤 4：创建知识库管理
- 在 `data/` 目录下创建 `knowledgeBase.ts` 文件
- 实现知识库数据结构和管理函数
- 提供添加、查询和更新知识的功能

## 步骤 5：更新 ChatBot 组件
- 修改 `ChatBot.tsx` 组件，调用后端 API 替代模拟回复
- 实现消息发送和接收的完整流程
- 确保 UI 交互流畅，添加加载状态

## 步骤 6：测试功能
- 启动开发服务器
- 测试 AI 聊天功能是否正常工作
- 验证知识库是否能正确影响 AI 回复