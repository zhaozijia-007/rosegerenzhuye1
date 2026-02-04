// 个人主页数据
export const AI_TOOLS = [
  {
    id: 1,
    name: "ChatGPT",
    description: "OpenAI 的对话式 AI 助手",
    url: "https://chat.openai.com",
    icon: "💬",
  },
  {
    id: 2,
    name: "Claude",
    description: "Anthropic 的 AI 助手",
    url: "https://claude.ai",
    icon: "🤖",
  },
  {
    id: 3,
    name: "Gemini",
    description: "Google 的多模态 AI",
    url: "https://gemini.google.com",
    icon: "🌐",
  },
  {
    id: 4,
    name: "Midjourney",
    description: "AI 图像生成工具",
    url: "https://www.midjourney.com",
    icon: "🎨",
  },
  {
    id: 5,
    name: "DALL-E",
    description: "OpenAI 的图像生成工具",
    url: "https://labs.openai.com",
    icon: "🖼️",
  },
  {
    id: 6,
    name: "Copilot",
    description: "GitHub 的代码助手",
    url: "https://github.com/features/copilot",
    icon: "💻",
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "游账 (TravelLedger)",
    description:
      "针对多人跨境旅行场景开发的即时记账与结算应用，实现了多币种实时汇率换算、复杂多人费用的自动分摊算法、实时账单同步及最优结算路径规划。",
    techStack: ["AI 辅助编程", "前后端开发", "数据同步", "离线记账"],
    url: "https://n3lohscdye.feishu.cn/wiki/EMMZwzCuQiLZDLkcfgucUFsRnUi?from=from_copylink",
  },
  {
    id: 2,
    title: "马年新春工具 (CNY AI Tool)",
    description:
      "结合春节场景的创意互动小程序，包含基于用户上传图片生成定制化红包封面、智能春联生成及趣味运势预测功能。",
    techStack: ["AI 图像处理", "风格迁移", "文本生成", "春联对仗"],
    url: "https://n3lohscdye.feishu.cn/wiki/DXN3wWBOtipxRKk4gDScQ8VdnOc?from=from_copylink",
  },
  {
    id: 3,
    title: "加班倒计时",
    description:
      "帮助用户精准计算下班时间，对抗万恶的资本家，让用户能够光速回家的神器应用。",
    techStack: ["React", "前端开发", "实时计算", "用户体验优化"],
    url: "https://n3lohscdye.feishu.cn/wiki/LBxdw1q7XiKOVCkWIowcwmDBn8c?from=from_copylink",
  },
  {
    id: 4,
    title: "HRX 核心系统",
    description:
      "主导集团级 HR 核心产品线（涵盖组织、人事、绩效、干部管理等）的规划与设计，实现从单体应用向平台化架构的转型。",
    techStack: ["平台化架构", "组织人事", "绩效管理", "干部管理"],
    url: "#",
  },
];

export const EXPERIENCES = [
  {
    id: 1,
    company: "平安科技",
    position: "高级产品经理",
    period: "2021.04 – 至今",
    description:
      "主导集团级 HR 核心产品线（涵盖组织、人事、绩效、干部管理等）的规划与设计。搭建包含干部档案、任免流程、人才盘点、董监高管理的数字化平台。主导绩效系统全模块的信创迁移及体验重构。独立负责青岛银行 HR 系统全模块交付。建立产品新人培养体系，指导应届生完成从需求挖掘到上线的全链路闭环。",
  },
  {
    id: 2,
    company: "创梦天地",
    position: "产品经理（效率工具组）",
    period: "2019.03 – 2021.04",
    description:
      "负责 OA 审批、HR、财务及社区模块的产品策划。深度整合飞书（Lark）生态，利用机器人与自动化流程打通信息孤岛。建立内部工具最佳实践库（飞书文档、OKR、多维表格）。成功将内部验证成熟的社区模块进行 SaaS 化输出，完成 2 家外部客户的试点签约。",
  },
  {
    id: 3,
    company: "创领科技",
    position: "产品经理",
    period: "2018.01 – 2019.03",
    description:
      "负责体育社区及电商类产品（APP/小程序）的从 0 到 1 孵化，构建了包含内容社区、彩票服务、社区团购等功能的综合性平台，通过精细化运营活动设计支持用户增长。",
  },
];

export const SKILLS = [
  "产品规划",
  "用户研究",
  "数据分析",
  "原型设计",
  "项目管理",
  "HR SaaS",
  "企业效率工具",
  "游戏化产品",
  "复杂系统重构",
  "用户体验优化",
  "AI 工具流搭建",
  "跨部门敏捷协同",
  "Figma",
  "Axure",
  "Sketch",
  "SQL",
  "Vibe Coding",
  "LLM 辅助编程",
  "AIGC 工具",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Node.js",
  "Python",
];

// 个人信息
export const PERSONAL_INFO = {
  name: "赵子嘉",
  title: "产品专家",
  bio: "8年产品专家经验，深耕人力资源（HR SaaS）、企业效率工具及游戏化产品领域。AI 落地实践者（Vibe Coding），具备全栈开发思维。",
  summary:
    "8年产品专家经验，深耕人力资源（HR SaaS）、企业效率工具及游戏化产品领域。擅长B端复杂系统的从0到1架构设计（涵盖档案、绩效、薪酬等全模块），具备极强的业务抽象与逻辑闭环能力。AI 落地实践者（Vibe Coding）：不局限于原型设计，具备全栈开发思维，能利用 AI 独立完成从需求分析、前端开发到部署上线的全流程，已独立上线“游账”、“新春生成器”等多款Web应用。核心优势：复杂系统重构、用户体验优化、AI 工具流搭建、跨部门敏捷协同。",
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com",
      icon: "🐱",
    },
    {
      name: "微信",
      url: "#",
      icon: "💬",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
      icon: "🔗",
    },
  ],
  education: [
    {
      school: "哈尔滨理工大学",
      major: "信息管理与信息系统",
      degree: "本科",
    },
    {
      school: "台湾科技大学",
      major: "科技管理",
      degree: "交换生",
    },
  ],
};
