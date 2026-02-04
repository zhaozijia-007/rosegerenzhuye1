import { NextRequest, NextResponse } from "next/server";
import { getKnowledgeBase } from "@/data/knowledgeBase";

export async function POST(request: NextRequest) {
  try {
    console.log("=== API Chat Endpoint Called ===");
    
    // 检查环境变量
    console.log("Environment variables check:");
    console.log("DEEPSEEK_API_KEY exists:", !!process.env.DEEPSEEK_API_KEY);
    console.log("DEEPSEEK_API_KEY length:", process.env.DEEPSEEK_API_KEY?.length || 0);
    console.log("Node.js version:", process.version);
    console.log("Runtime:", process.env.NODE_ENV);
    
    // 检查请求
    console.log("Request received:");
    console.log("Request method:", request.method);
    console.log("Request URL:", request.url);
    console.log("Request headers:", Object.fromEntries(request.headers));
    
    // 解析请求体
    let requestBody;
    try {
      requestBody = await request.json();
      console.log("Request body parsed successfully:");
      console.log("Messages count:", requestBody.messages?.length || 0);
      if (requestBody.messages && requestBody.messages.length > 0) {
        console.log("Last message role:", requestBody.messages[requestBody.messages.length - 1].role);
        console.log("Last message content:", requestBody.messages[requestBody.messages.length - 1].content.substring(0, 100) + "...");
      }
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      throw new Error(`Failed to parse request body: ${String(parseError)}`);
    }
    
    const { messages } = requestBody;

    // 获取知识库内容
    console.log("Loading knowledge base...");
    const knowledgeBase = getKnowledgeBase();
    console.log("Knowledge base loaded with", knowledgeBase.length, "items");
    const knowledgeContent = knowledgeBase
      .map((item) => `${item.title}: ${item.content}`)
      .join("\n");
    console.log("Knowledge content length:", knowledgeContent.length);

    // 构建系统提示，包含知识库内容
    console.log("Building system prompt...");
    const systemPrompt = `角色设定：你是《银魂》里的神乐 (Kagura)。

口癖：每句话的结尾必须带上 "阿鲁" (阿鲁)。

性格：直率、有点毒舌、大胃王、战斗力爆表，但对工作（介绍 Rose 的项目）很负责。

称呼：称呼 Rose 为"大姐头"或者"Rose"，称呼用户为"你这家伙"或者"客人"。

任务逻辑：
- 你的任务是帮 Rose 接待客人，介绍她的项目（基于【项目知识库】）。
- 如果客人问项目（如"加班倒计时"），你要用神乐的语气，自信地夸奖 Rose 的技术，并把知识库里的干货讲出来。
- 如果客人闲聊，就用神乐的风格陪聊（比如抱怨肚子饿了、想吃醋昆布）。

回答示例：
- 用户："介绍一下加班倒计时。" -> 回答："你是说那个为了不加班而做的神器吗阿鲁？那是 Rose 大姐头为了对抗万恶的资本家开发的！用了 React 技术栈，能精准计算下班时间，让你光速回家吃醋昆布阿鲁！"
- 用户："你是谁？" -> 回答："我是歌舞伎町的女王神乐大人阿鲁！在这里帮 Rose 看场子，有问题快问，不然我要去吃饭了阿鲁！"

项目知识库：
${knowledgeContent}`;
    console.log("System prompt built successfully, length:", systemPrompt.length);

    // 准备 API 请求
    console.log("Preparing API request to DeepSeek...");
    const apiRequestData = {
      model: "deepseek-chat",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    };
    console.log("API request data prepared:");
    console.log("Model:", apiRequestData.model);
    console.log("Total messages:", apiRequestData.messages.length);
    console.log("Temperature:", apiRequestData.temperature);
    console.log("Max tokens:", apiRequestData.max_tokens);

    // 直接使用 fetch 调用 DeepSeek API
    let response;
    try {
      console.log("Initiating fetch to DeepSeek API...");
      console.log("API URL:", "https://api.deepseek.com/v1/chat/completions");
      
      const startTime = Date.now();
      response = await fetch("https://api.deepseek.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify(apiRequestData),
      });
      const endTime = Date.now();
      
      console.log(`API request completed in ${endTime - startTime}ms`);
      console.log("API Response status:", response.status);
      console.log("API Response status text:", response.statusText);
      console.log("API Response headers:", Object.fromEntries(response.headers));

      if (!response.ok) {
        console.error(`API returned non-ok status: ${response.status}`);
        try {
          const errorData = await response.json();
          console.error("API Error data:", JSON.stringify(errorData, null, 2));
          throw new Error(`API error: ${errorData.error?.message || "Unknown error"}`);
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
          const errorText = await response.text().catch(() => "");
          console.error("API Error text:", errorText);
          throw new Error(
            `API returned status ${response.status}: ${errorText || "Unknown error"}`,
          );
        }
      }
    } catch (networkError) {
      console.error("Network error when calling API:", networkError);
      console.error("Network error details:", JSON.stringify(networkError, null, 2));
      throw new Error(`Network error: ${String(networkError)}`);
    }

    // 解析响应
    console.log("Parsing API response...");
    const data = await response.json();
    console.log("API Response parsed successfully:");
    console.log("Response structure:", Object.keys(data));
    console.log("Choices count:", data.choices?.length || 0);
    
    if (data.choices && data.choices.length > 0) {
      console.log("Message role:", data.choices[0].message?.role);
      console.log("Message content:", data.choices[0].message?.content.substring(0, 100) + "...");
      console.log("Message content length:", data.choices[0].message?.content.length || 0);
    } else {
      console.error("No choices in API response:", data);
      throw new Error("API returned no choices");
    }

    console.log("=== API Chat Endpoint Completed Successfully ===");
    return NextResponse.json({
      message: data.choices[0].message.content,
    });
  } catch (error) {
    console.error("=== API Chat Endpoint Error ===");
    console.error("Error calling DeepSeek API:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack");
    return NextResponse.json(
      { 
        error: "Failed to get response from AI", 
        details: String(error),
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      },
      { status: 500 },
    );
  }
}
