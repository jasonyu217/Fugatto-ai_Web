# Fugatto AI Web Platform

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://semver.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Fugatto AI 是一个先进的 AI 音频生成平台,为创作者和企业提供专业的语音服务解决方案。

## 🌟 功能特点

### 核心功能
- 🎯 文本转语音 (Text-to-Speech)
  - 支持多种语言和音色
  - 自然的语音合成
  - 情感语调调整
- 🎤 语音转文本 (Speech-to-Text)
  - 实时语音识别
  - 多语言支持
  - 标点符号智能添加
- 🔄 语音转语音 (Speech-to-Speech)
  - 声音风格转换
  - 口音调整
  - 情感迁移
- 👥 语音克隆 (Voice Cloning)
  - 个性化声音模型
  - 低资源声音克隆
  - 声音特征保持

### 技术特性
- 🌍 多语言支持 (中文、英语、日语、西班牙语、俄语、阿拉伯语)
- 📱 响应式设计,支持移动端和桌面端
- 💼 完整的用户工作台
- 💰 灵活的订阅计划

## 🛠 技术栈

### 前端
- Vite v5.4.2 - 构建工具
- TailwindCSS v3.4.16 - UI框架
- i18next v23.8.2 - 国际化
- Auth0 - 用户认证
- Axios - HTTP 客户端

### 部署
- Vercel - 应用托管
- Edge Functions - 服务端功能

## 📦 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装
\```bash
# 克隆项目
git clone https://github.com/your-username/fugatto-ai.git

# 安装依赖
npm install
\```

### 开发
\```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
\```

## 📝 API 文档

详细的 API 文档请访问 [API 文档](docs/api.md)

## 🗺 项目路线图

### 2024 Q2
- [ ] 用户认证系统完善
- [ ] 支付系统集成
- [ ] 性能优化

### 2024 Q3
- [ ] 新增情感分析功能
- [ ] 支持更多语言
- [ ] API 限流优化

## 🤝 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

# Workspace页面Tab导航功能

## 功能说明
该功能允许用户从首页直接跳转到Workspace页面的特定功能Tab。

### 使用方法
1. 在首页点击任意功能卡片，将自动跳转到对应的Workspace Tab
2. URL参数格式：`/workspace?tab=功能名称`
   - 例如：`/workspace?tab=text-to-speech`

### 支持的Tab参数
- text-to-speech：文字转语音功能
- speech-to-text：语音转文字功能
- image-generation：图像生成功能
- code-generation：代码生成功能

### 技术实现
- 使用URL参数传递目标Tab信息
- JavaScript自动处理Tab切换和视觉反馈
- CSS提供平滑的过渡动画效果

## 注意事项
- 确保URL参数与Tab的data-tab属性值匹配
- 支持浏览器的前进/后退操作