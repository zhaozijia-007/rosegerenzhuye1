export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  category?: string;
}

const knowledgeBase: KnowledgeItem[] = [
  {
    id: '1',
    title: '关于赵子嘉',
    content: '赵子嘉是一位产品专家，拥有8年产品经验，深耕人力资源（HR SaaS）、企业效率工具及游戏化产品领域。AI 落地实践者（Vibe Coding），具备全栈开发思维。',
    category: '个人信息',
  },
  {
    id: '2',
    title: '联系方式',
    content: '小红书：388092636，邮箱：zhaozijiaer@163.com',
    category: '个人信息',
  },
  {
    id: '3',
    title: '项目 - 游账 (TravelLedger)',
    content: '针对多人跨境旅行场景开发的即时记账与结算应用，实现了多币种实时汇率换算、复杂多人费用的自动分摊算法、实时账单同步及最优结算路径规划。技术栈：AI 辅助编程、前后端开发、数据同步、离线记账。详细信息请查看：https://n3lohscdye.feishu.cn/wiki/EMMZwzCuQiLZDLkcfgucUFsRnUi?from=from_parent_docx',
    category: '项目经历',
  },
  {
    id: '4',
    title: '项目 - 马年新春工具 (CNY AI Tool)',
    content: '结合春节场景的创意互动小程序，包含基于用户上传图片生成定制化红包封面、智能春联生成及趣味运势预测功能。技术栈：AI 图像处理、风格迁移、文本生成、春联对仗。详细信息请查看：https://n3lohscdye.feishu.cn/wiki/WQsrw6cfxiYRltkqHvIcGaFcnxs?from=from_parent_docx',
    category: '项目经历',
  },
  {
    id: '5',
    title: '项目 - 加班倒计时',
    content: '帮助用户精准计算下班时间，对抗万恶的资本家，让用户能够光速回家的神器应用。技术栈：React、前端开发、实时计算、用户体验优化。详细信息请查看：https://n3lohscdye.feishu.cn/wiki/LBxdw1q7XiKOVCkWIowcwmDBn8c?from=from_copylink',
    category: '项目经历',
  },
  {
    id: '6',
    title: '项目 - HRX 核心系统',
    content: '主导集团级 HR 核心产品线（涵盖组织、人事、绩效、干部管理等）的规划与设计，实现从单体应用向平台化架构的转型。技术栈：平台化架构、组织人事、绩效管理、干部管理。',
    category: '项目经历',
  },
  {
    id: '7',
    title: '工作经历 - 平安科技',
    content: '高级产品经理（2021.04 – 至今）：主导集团级 HR 核心产品线（涵盖组织、人事、绩效、干部管理等）的规划与设计。搭建包含干部档案、任免流程、人才盘点、董监高管理的数字化平台。主导绩效系统全模块的信创迁移及体验重构。独立负责青岛银行 HR 系统全模块交付。建立产品新人培养体系，指导应届生完成从需求挖掘到上线的全链路闭环。',
    category: '工作经历',
  },
  {
    id: '8',
    title: '工作经历 - 创梦天地',
    content: '产品经理（效率工具组）（2019.03 – 2021.04）：负责 OA 审批、HR、财务及社区模块的产品策划。深度整合飞书（Lark）生态，利用机器人与自动化流程打通信息孤岛。建立内部工具最佳实践库（飞书文档、OKR、多维表格）。成功将内部验证成熟的社区模块进行 SaaS 化输出，完成 2 家外部客户的试点签约。',
    category: '工作经历',
  },
  {
    id: '9',
    title: '工作经历 - 创领科技',
    content: '产品经理（2018.01 – 2019.03）：负责体育社区及电商类产品（APP/小程序）的从 0 到 1 孵化，构建了包含内容社区、彩票服务、社区团购等功能的综合性平台，通过精细化运营活动设计支持用户增长。',
    category: '工作经历',
  },
  {
    id: '10',
    title: '专业技能 - 产品能力',
    content: '产品规划、用户研究、数据分析、原型设计、项目管理、HR SaaS、企业效率工具、游戏化产品、复杂系统重构、用户体验优化、AI 工具流搭建、跨部门敏捷协同',
    category: '专业技能',
  },
  {
    id: '11',
    title: '专业技能 - 工具能力',
    content: 'Figma、Axure、Sketch、SQL、Vibe Coding、LLM 辅助编程、AIGC 工具',
    category: '专业技能',
  },
  {
    id: '12',
    title: '专业技能 - 技术能力',
    content: 'React、Next.js、Tailwind CSS、Node.js、Python',
    category: '专业技能',
  },
  {
    id: '13',
    title: '核心优势',
    content: '复杂系统重构、用户体验优化、AI 工具流搭建、跨部门敏捷协同',
    category: '个人优势',
  },
];


export const getKnowledgeBase = (): KnowledgeItem[] => {
  return knowledgeBase;
};

export const getKnowledgeByCategory = (category: string): KnowledgeItem[] => {
  return knowledgeBase.filter(item => item.category === category);
};

export const searchKnowledge = (query: string): KnowledgeItem[] => {
  const lowerQuery = query.toLowerCase();
  return knowledgeBase.filter(item => 
    item.title.toLowerCase().includes(lowerQuery) || 
    item.content.toLowerCase().includes(lowerQuery)
  );
};

export const addKnowledgeItem = (item: Omit<KnowledgeItem, 'id'>): KnowledgeItem => {
  const newItem: KnowledgeItem = {
    ...item,
    id: Date.now().toString(),
  };
  knowledgeBase.push(newItem);
  return newItem;
};

export const updateKnowledgeItem = (id: string, updates: Partial<KnowledgeItem>): KnowledgeItem | null => {
  const index = knowledgeBase.findIndex(item => item.id === id);
  if (index !== -1) {
    knowledgeBase[index] = { ...knowledgeBase[index], ...updates };
    return knowledgeBase[index];
  }
  return null;
};

export const deleteKnowledgeItem = (id: string): boolean => {
  const index = knowledgeBase.findIndex(item => item.id === id);
  if (index !== -1) {
    knowledgeBase.splice(index, 1);
    return true;
  }
  return false;
};