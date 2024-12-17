export default {
  hero: {
    title: "AI - 世界上最灵活的声音",
    subtitle: "使用文本和音频作为输入，Fugatto AI 的模型可以创建音乐、声音和声效的任意组合",
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
    hero: {
      title: "选择最适合您的方案",
      description: "无论您是个人创作者还是企业用户，我们都为您提供灵活的定价方案"
    },
    billing: {
      monthly: "月付",
      yearly: "年付",
      discount: "省20%"
    },
    basic: {
      title: "基础版",
      price: "$9.99",
      description: "适合个人创作者起步使用",
      features: [
        "每月100分钟音频生成",
        "基础音色选择",
        "标准API访问",
        "邮件支持"
      ],
      cta: "开始使用"
    },
    pro: {
      badge: "最受欢迎",
      title: "专业版",
      price: "$29.99",
      description: "适合专业创作者和小型团队",
      features: [
        "每月500分钟音频生成",
        "高级音色库",
        "优先API访问",
        "高级技术支持"
      ],
      cta: "立即升级"
    },
    enterprise: {
      title: "企业版",
      description: "为大型企业提供定制化解决方案",
      features: [
        "无限制的API调用",
        "专属客户成功经理",
        "定制化培训与支持",
        "服务级别协议(SLA)保障",
        "优先技术支持"
      ],
      cta: "联系我们"
    },
    comparison: {
      title: "功能对比",
      headers: {
        features: "功能",
        basic: "基础版",
        pro: "专业版",
        enterprise: "企业版"
      },
      features: {
        textToSpeech: "文本转语音",
        speechToSpeech: "语音转语音",
        voiceCount: "音色数量",
        apiAccess: "API访问",
        support: "技术支持",
        values: {
          check: "✓",
          voiceCount: {
            basic: "10+",
            pro: "50+",
            enterprise: "不限"
          },
          apiAccess: {
            basic: "基础",
            pro: "高级",
            enterprise: "企业级"
          },
          support: {
            basic: "邮件",
            pro: "优先响应",
            enterprise: "24/7专属"
          }
        }
      }
    },
    faq: {
      title: "定价常见问题",
      items: [
        {
          q: "如何选择合适的方案?",
          a: "根据您的使用需求选择 - 个人用户建议选择基础版,企业用户可以选择专业版或企业版获得更多功能支持。"
        },
        {
          q: "可以随时更改订阅计划吗?",
          a: "是的,您可以随时升级或降级您的订阅计划。费用会按比例计算。"
        },
        {
          q: "是否提供免费试用?",
          a: "我们为所有新用户提供14天的免费试用期,让您充分体验产品功能。"
        },
        {
          q: "如何计费?",
          a: "我们采用月度订阅制,支持支付宝和微信支付。企业版采用年付模式。"
        },
        {
          q: "是否提供退款？",
          a: "我们的退款政策如下：\n• 首次订购后7天内可申请全额退款\n• 如遇重大技术问题可申请部分退款\n• 未使用的额度可以结转到下个月\n• 具体退款事宜请联系客服处理"
        }
      ]
    },
    title: "定价方案",
    description: "选择最适合您需求的方案"
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
      uploadTitle: "上传本地音视频文件",
      fileInfo: {
        title: "支持的文件格式",
        video: {
          title: "视频支持",
          formats: "mp4, wmv, m4v, flv, rmvb, dat, mov, mkv, webm, avi, mpeg, 3gp, ogg",
          limit: "单个文件最大6G"
        },
        audio: {
          title: "音频支持",
          formats: "mp3, wav, m4a, wma, aac, ogg, amr, flac, aiff",
          limit: "单个文件最大500M"
        }
      },
      language: "音视频语言",
      speakers: "区分发言人",
      speakerOptions: {
        none: "暂不体验",
        single: "单人演讲",
        two: "2人对话",
        multi: "多人讨论"
      },
      settings: "音视频设置",
      translation: "翻译",
      translationOptions: {
        fromZh: {
          none: "不翻译",
          toEn: "翻译成英语",
          toJa: "翻译成日语"
        },
        fromEn: {
          none: "不翻译",
          toZh: "翻译成中文"
        },
        fromJa: {
          none: "不翻译",
          toZh: "翻译成中文"
        },
        fromYue: {
          unsupported: "不支持该翻译"
        },
        fromZhEn: {
          none: "不翻译",
          toZh: "翻译成中文",
          toEn: "翻译成英语"
        }
      },
      fileCount: "文件数量",
      addMore: "继续添加",
      startTranscribe: "开始转写",
      cancel: "取消",
      downloadInfo: "MP3 格式 • 高品质音频"
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
        content: "实时音频处理功能让我们的直播效果提升了一个档次。",
        name: "赵阳",
        role: "LiveTech 技术主管"
      },
      {
        content: "AI 音效生成为我们的游戏开发节省了大量时间和成本。",
        name: "孙杰",
        role: "GameStudio 音效总监"
      },
      {
        content: "多语言配音功能帮助我们快速完成了全球本地化工作。",
        name: "刘芳",
        role: "全球化项目经理"
      },
      {
        content: "音频修复功能非常强大，完美解决了我们的老旧音频修复需求。",
        name: "郑华",
        role: "音频修复专家"
      },
      {
        content: "批量处理功能极大提高了我们的工作效率，节省了大量人力。",
        name: "黄磊",
        role: "音频工程总监"
      },
      {
        content: "自定义模型训练让我们能够创建完全符合品牌调性的音频内容。",
        name: "张雯",
        role: "品牌营销总监"
      },
      {
        content: "云端协作功能让远程工作变得如此简单，团队配合更加默契。",
        name: "吴强",
        role: "远程团队负责人"
      }
    ]
  },
  waitlist: {
    title: "加入 API 等待列表",
    form: {
      name: "姓名",
      email: "邮箱",
      company: "公司/组织",
      useCase: "使用场景",
      submit: "提交",
      cancel: "取消"
    },
    success: {
      title: "感谢您的加入！",
      message: "我们已收到您的请求，将尽快与您联系。",
      close: "确定"
    },
    error: {
      title: "提交失败",
      message: "请稍后重试或联系支持。",
      retry: "重试"
    },
    validation: {
      email: "请输入有效的邮箱地址",
      required: "此字段为必填项"
    }
  },
  languages: {
    zh: "中文",
    en: "英语",
    ja: "日语",
    yue: "粤语",
    zhEn: "中英文自由说"
  }
}