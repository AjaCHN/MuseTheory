# MuseTheory AI

[English Documentation](./README_EN.md)

一款智能音乐理论学习助手，支持音阶和弦可视化、AI 导师问答和音乐概念艺术生成。

## 功能

- **乐理可视化**：输入音阶或和弦名称，在钢琴键盘上高亮显示对应音符，并展示五线谱
- **AI 导师**：用自然语言询问乐理问题，获得流式响应解答，支持多轮对话
- **AI 艺术生成**：输入音乐相关的描述词，生成概念艺术图片，支持 1K/2K/4K 分辨率
- **多语言**：支持 11 种语言界面

## 环境要求

- Node.js 18+
- Gemini API Key（用于 AI 功能）

## 快速开始

1. 克隆项目：`git clone <repository-url>`
2. 安装依赖：`npm install`
3. 配置环境变量：创建 `.env.local` 文件，添加 `GEMINI_API_KEY=your_api_key`
4. 启动开发服务器：`npm run dev`
5. 打开浏览器访问 http://localhost:3000

## 主要页面

| 路径 | 功能 |
|------|------|
| `/` | 乐理可视化（首页） |
| `/chat` | AI 导师聊天 |
| `/art` | AI 艺术生成 |

## 快捷操作

- **手气不错**：在可视化页面点击骰子按钮，随机查看一个音阶或和弦
- **MIDI 键盘**：支持连接外部 MIDI 键盘设备
- **音频录制**：可录制并导出演奏的音频

## 技术栈

Next.js · React · Tailwind CSS · Gemini AI

## 许可证

MIT
