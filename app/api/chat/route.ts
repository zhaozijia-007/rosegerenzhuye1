import { NextRequest, NextResponse } from 'next/server';
import { getKnowledgeBase } from '@/data/knowledgeBase';

export async function POST(request: NextRequest) {
  try {
    // 检查环境变量
    console.log('DEEPSEEK_API_KEY loaded:', !!process.env.DEEPSEEK_API_KEY);
    console.log('API Key length:', process.env.DEEPSEEK_API_KEY?.length);

    const { messages } = await request.json();

    // 获取知识库内容
    const knowledgeBase = getKnowledgeBase();
    const knowledgeContent = knowledgeBase
      .map(item => `${item.title}: ${item.content}`)
      .join('\n');

    // 构建系统提示，包含知识库内容
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

    console.log('Calling DeepSeek API with model:', 'deepseek-chat');
    console.log('Number of messages:', messages.length);

    console.log('Starting API call to DeepSeek...');
    console.log('API Key exists:', !!process.env.DEEPSEEK_API_KEY);
    console.log('API Key length:', process.env.DEEPSEEK_API_KEY?.length);
    console.log('Request URL:', 'https://api.deepseek.com/v1/chat/completions');

    // 直接使用 fetch 调用 DeepSeek API
    let response;
    try {
      response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      console.log('API Response status:', response.status);
      console.log('API Response status text:', response.statusText);
      console.log('API Response headers:', Object.fromEntries(response.headers));

      if (!response.ok) {
        try {
          const errorData = await response.json();
          console.error('API Error data:', errorData);
          throw new Error(`API returned status ${response.status}: ${JSON.stringify(errorData)}`);
        } catch (jsonError) {
          console.error('Failed to parse error response:', jsonError);
          const errorText = await response.text().catch(() => '');
          console.error('API Error text:', errorText);
          throw new Error(`API returned status ${response.status}: ${errorText || 'Unknown error'}`);
        }
      }
    } catch (networkError) {
      console.error('Network error when calling API:', networkError);
      throw new Error(`Network error: ${String(networkError)}`);
    }

    const data = await response.json();
    console.log('API Response received:', data.choices[0].message.content.substring(0, 50) + '...');

    return NextResponse.json({
      message: data.choices[0].message.content,
    });
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: 'Failed to get response from AI', details: String(error) },
      { status: 500 }
    );
  }
}