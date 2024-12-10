export default {
  hero: {
    title: "Fugatto AI - AI音频创作工具",
    subtitle: "利用先进的AI技术将文字转换为音频并克隆声音",
    docs: "阅读文档",
    apiWaitlist: "加入API等待列表"
  },
  about: {
    title: "探索 Fugatto AI",
    description: "体验下一代AI驱动的音频生成技术"
  },
  features: {
    title: "功能特点",
    description: "Fugatto是NVIDIA最新的生成式AI模型，可从文本和音频中生成声音、音乐及语音，支持声音效果创新、音频分离及风格变换，赋予创作者无限创意可能。",
    cards: [
      {
        title: "AI驱动的音频生成",
        description: "通过文本和音频输入创造独特的声音、语音和音乐"
      },
      {
        title: "创意声音效果",
        description: "引导Fugatto创造意想不到的声音效果，为熟悉的声音赋予全新品质"
      },
      {
        title: "沉浸式音景",
        description: "为电影和音频制作提供丰富多变的声音体验"
      },
      {
        title: "音频元素提取",
        description: "轻松从音乐中分离人声等音频元素，实现精确的音频处理"
      },
      {
        title: "乐器实验",
        description: "让音乐家在现有音频中添加新乐器，进行创新的音乐创作"
      },
      {
        title: "无限创意可能",
        description: "作为强大的基础模型，为用户提供无限的音频创作能力"
      }
    ]
  },
  pricing: {
    title: "价格方案",
    description: "选择最适合您需求的方案，享受 Fugatto AI 带来的强大功能。我们提供灵活的定价选项，满足不同规模的需求。",
    starter: {
      title: "入门版",
      price: "￥59/月",
      features: ["基础音频生成", "5个声音克隆", "标准支持"],
      cta: "选择方案"
    },
    pro: {
      title: "专业版",
      price: "￥199/月",
      features: ["高级音频生成", "无限声音克隆", "优先支持"],
      cta: "选择方案"
    }
  },
  footer: {
    copyright: "© 2024 AI Fugatto. 保留所有权利。",
    owner: "由 Fugatto AI 创建",
    aiVoice: {
      title: "AI 语音生成器",
      textToSpeech: "文本转语音",
      speechToText: "语音转文本",
      speechToSpeech: "语音转语音",
      voiceCloning: "语音克隆"
    },
    audioCreation: {
      title: "AI 音频创作",
      soundEffects: "AI 音效生成",
      music: "AI 音乐生成"
    },
    resources: {
      title: "资源",
      community: "语音社区",
      blog: "博客"
    },
    pricing: {
      title: "价格方案",
      starter: "入门版",
      pro: "专业版"
    },
    legal: {
      privacy: "隐私政策",
      terms: "服务条款",
      report: "问题反馈"
    }
  },
  errors: {
    noText: "请输入要生成音频的文本",
    apiKeyMissing: "API密钥未配置，请联系支持",
    apiError: "服务暂时不可用，请稍后再试",
    networkError: "网络错误，请检查您的连接",
    unknownError: "发生意外错误，请重试"
  },
  status: {
    generating: "正在生成音频...",
    success: "音频生成成功！"
  },
  nav: {
    brand: "Fugatto AI",
    aiVoice: 'AI 语音生成器',
    aiVoiceMenu: {
      textToSpeech: '文本转语音',
      speechToText: '语音转文本',
      speechToSpeech: '语音转语音',
      voiceCloning: '语音克隆'
    },
    audioCreation: 'AI 音频创作',
    community: '语音社区',
    pricing: '价格方案'
  },
  faq: {
    title: "常见问题",
    description: "我们收集了用户最常见的问题和详细解答，帮助您更好地了解 Fugatto AI 的功能和使用方法。",
    q1: "什么是NVIDIA Fugatto AI？",
    a1: "Fugatto是NVIDIA的生成式AI音频模型，能够根据文本提示创建音乐、音效和语音，特别适合创意产业使用。",
    
    q2: "Fugatto是如何工作的？",
    a2: "它使用经过大量音频数据集训练的先进算法，根据用户输入动态生成或修改声音。",
    
    q3: "哪些行业可以受益于Fugatto？",
    a3: "音乐制作、游戏、广告和电影行业可以使用它来创建独特的音频内容并增强体验。",
    
    q4: "Fugatto能复制人声吗？",
    a4: "是的，它可以生成和调整具有不同口音、情感和语调的声音。",
    
    q5: "Fugatto支持实时声音编辑吗？",
    a5: "是的，它允许根据输入变化动态修改音频。",
    
    q6: "是什么让Fugatto与其他AI音频工具与众不同？",
    a6: "它在生成多样化、高质量声音输出的灵活性，以及处理复杂提示的能力使其独特。"
  },
  tabs: {
    textToSpeech: "文本转语音",
    speechToText: "语音转文本",
    speechToSpeech: "语音转语音"
  },
  input: {
    textToSpeech: {
      title: "文本输入",
      language: "语言选择",
      voice: "声音选择",
      placeholder: "在此输入要转换的文本...",
      generate: "生成音频",
      voices: {
        "energetic-male": "活力男声",
        "professional-female": "专业女声",
        "friendly-male": "亲和男声",
        "warm-female": "温暖女声",
        "news-anchor": "新闻播报",
        "storyteller": "故事讲述"
      }
    },
    speechToText: {
      title: "语音输入",
      record: "点击录音",
      recording: "正在录音...",
      stop: "停止录音"
    },
    speechToSpeech: {
      title: "上传音频",
      dropHint: "将音频文件拖放到此处或",
      browse: "选择文件",
      targetVoice: "目标声音",
      convert: "转换语音"
    }
  },
  output: {
    textToSpeech: {
      title: "音频输出",
      processing: "正在生成音频...",
      ready: "音频已就绪",
      download: "下载音频"
    },
    speechToText: {
      title: "文本输出",
      processing: "正在转换...",
      placeholder: "转换后的文本将显示在这里"
    },
    speechToSpeech: {
      title: "转换结果",
      processing: "正在转换...",
      ready: "转换完成",
      download: "下载转换后的音频"
    }
  },
  testimonials: {
    title: "用户评价",
    description: "来自全球各地的用户分享他们使用 Fugatto AI 的成功故事和体验",
    reviews: [
      {
        content: "Fugatto AI 帮助我们显著提升了产品开发周期和团队协作效率。",
        name: "陈明",
        role: "Infinituma 联合创始人"
      },
      {
        content: "Fugatto 的协作功能让我们的开发流程更加顺畅，集成也非常便捷。",
        name: "李婷",
        role: "DevTech 工程师"
      },
      {
        content: "我们团队选择 Fugatto 是今年最正确的决定，大大简化了我们的工作流程。",
        name: "王晓",
        role: "Tinker 开发者"
      },
      {
        content: "AI 功能彻底改变了我们创作内容的方式，简直太棒了！",
        name: "张伟",
        role: "MediaFlow 内容总监"
      },
      {
        content: "声音克隆功能非常革新，为我们的项目带来了无限可能。",
        name: "林小美",
        role: "音频制作人"
      },
      {
        content: "界面清晰简洁，操作直观，这真是设计师梦寐以求的平台！",
        name: "王小丽",
        role: "Creatify UI设计师"
      },
      {
        content: "我们的创作流程前所未有的流畅，功能一流且使用便捷！",
        name: "李梅",
        role: "VisualVibe 创意总监"
      },
      {
        content: "多语言支持让我们的全球业务拓展变得更加顺畅。",
        name: "张国际",
        role: "国际业务总监"
      },
      {
        content: "语音合成质量令人难以置信，我们的有声书听起来比以往更加自然。",
        name: "刘芳",
        role: "出版总监"
      },
      {
        content: "客户支持团队非常专业，帮助我们充分发挥了平台的潜力。",
        name: "赵技",
        role: "技术主管"
      }
    ]
  }
}