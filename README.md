# MuseTheory AI

一款智能音乐理论学习助手，支持音阶和弦可视化、AI 导师问答和音乐概念艺术生成。

An intelligent music theory learning assistant with scale/chord visualization, AI tutor Q&A, and music concept art generation.

## ✨ 功能特性

- **🎵 乐理可视化**：输入音阶或和弦名称，在虚拟钢琴键盘上高亮显示对应音符，并展示五线谱
- **🤖 AI 导师**：用自然语言询问乐理问题，获得流式响应解答，支持多轮对话记忆
- **🎨 AI 艺术生成**：输入音乐相关的描述词，生成概念艺术图片，支持 1K/2K/4K 分辨率
- **🌐 多语言支持**：支持 11 种语言界面（英语、简体中文、繁体中文、西班牙语、阿拉伯语、法语、葡萄牙语、德语、日语、韩语、俄语）
- **🎹 MIDI 支持**：连接外部 MIDI 键盘设备进行演奏
- **🎤 音频录制**：录制并导出演奏的音频

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Gemini API Key（用于 AI 功能）

### 安装步骤
1. 克隆项目：`git clone <repository-url>`
2. 安装依赖：`npm install`
3. 配置环境变量：创建 `.env.local` 文件，添加 `GEMINI_API_KEY=your_api_key`
4. 启动开发服务器：`npm run dev`
5. 打开浏览器访问 http://localhost:3000

## 📱 主要页面

| 路径 | 功能 |
|------|------|
| `/` | 乐理可视化（首页） |
| `/chat` | AI 导师聊天 |
| `/art` | AI 艺术生成 |

## 🎮 快捷操作

- **🎲 手气不错**：在可视化页面点击骰子按钮，随机查看一个音阶或和弦
- **🎹 MIDI 键盘**：支持连接外部 MIDI 键盘设备
- **🎤 录音功能**：可录制并导出演奏的音频

## 🛠 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | ^16.1.6 |
| UI | React | ^19.2.3 |
| 样式 | Tailwind CSS | ^4.2.0 |
| AI | Google Gemini | ^1.35.0 |
| 状态管理 | Zustand | ^5.0.11 |
| 主题 | next-themes | ^0.4.6 |
| 音频 | Tone.js | ^15.1.22 |
| 五线谱 | abcjs | ^6.6.2 |

## 📁 项目结构

```
/workspace/
├── app/                    # Next.js App Router
│   ├── components/         # React 组件
│   ├── services/           # API 服务
│   ├── contexts/           # React Context
│   ├── hooks/              # 自定义 Hooks
│   ├── store/              # Zustand 状态管理
│   └── ...
├── prototype/              # 原型设计文档
├── openspec/               # 项目规范文档
└── ...
```

## 📝 设计规范

项目采用 **Apple 极简设计风格**：
- 大量留白，元素少而精
- 毛玻璃效果（backdrop-blur）
- 圆润的卡片设计（20px 圆角）
- 清晰的视觉层次
- 流畅的动画过渡

## 📜 许可证

MIT License

---

**版本**: v0.0.6
