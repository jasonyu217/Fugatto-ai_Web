export default {
  hero: {
    title: "AI Fugatto - AI音频创作工具",
    subtitle: "利用先进的AI技术将文字转换为音频并克隆声音",
    input: {
      title: "输入文本",
      placeholder: "在此输入要转换的文本...",
      generate: "生成音频"
    },
    output: {
      title: "生成的音频"
    }
  },
  features: {
    title: "功能特点",
    textToAudio: {
      title: "文字转独特音频",
      description: "通过简单的文字描述创造前所未有的声音"
    },
    voiceCloning: {
      title: "声音克隆",
      description: "克隆您的声音，让它朗读或演唱任何文字"
    }
  },
  pricing: {
    title: "价格方案",
    starter: {
      title: "入门版",
      price: "￥59/月",
      features: ["基础音频生成", "5个声音克隆", "标准支持"]
    },
    pro: {
      title: "专业版",
      price: "￥199/月",
      features: ["高级音频生成", "无限声音克隆", "优先支持"]
    }
  },
  footer: {
    copyright: "© 2024 AI Fugatto. 保留所有权利。",
    contact: "联系方式：jasonkui217@gmail.com",
    owner: "由Jason Yu创建"
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
  }
}