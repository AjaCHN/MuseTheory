# MuseTheory AI - 项目规范文档 v0.0.7

## 1. 项目概述

**项目名称**: MuseTheory AI
**版本**: v0.0.7
**描述**: 智能音乐理论伴侣，可视化音阶与和弦，提供AI导师和AI艺术生成功能。

## 2. 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | ^16.1.6 |
| UI | React | ^19.2.3 |
| 样式 | Tailwind CSS | ^4.2.0 |
| AI | @google/genai | ^1.35.0 |
| 状态管理 | Zustand | ^5.0.11 |
| 主题 | next-themes | ^0.4.6 |
| 音频 | Tone.js | ^15.1.22 |
| 五线谱 | abcjs | ^6.6.2 |

## 3. 目录结构

```
/workspace/
├── app/                          # Next.js App Router
│   ├── art/page.tsx              # AI艺术生成页面 (v0.0.2)
│   ├── chat/page.tsx             # AI导师聊天页面 (v0.0.2)
│   ├── components/               # React组件
│   │   ├── AIStudioKeySelector.tsx
│   │   ├── ChatBot.tsx           # AI导师组件 (v0.0.7)
│   │   ├── ChatInput.tsx         # 聊天输入组件 (v0.0.7)
│   │   ├── ChatMessageList.tsx   # 聊天消息列表 (v0.0.7)
│   │   ├── Footer.tsx            # 页脚 (v0.0.3)
│   │   ├── ImageGenerator.tsx    # 图片生成器 (v0.0.4)
│   │   ├── MusicVisualizer.tsx   # 主可视化组件 (v0.0.7)
│   │   ├── Navigation.tsx         # 导航栏 (v0.0.4)
│   │   ├── Piano.tsx             # 钢琴键盘 (v0.0.3)
│   │   ├── Providers.tsx
│   │   ├── SheetMusic.tsx        # 五线谱 (v0.0.3)
│   │   ├── ThemeProvider.tsx
│   │   ├── VisualizerInfo.tsx    # 可视化信息卡片 (v0.0.7)
│   │   └── VisualizerSearch.tsx  # 可视化搜索组件 (v0.0.7)
│   ├── contexts/
│   │   └── LanguageContext.tsx   # 国际化上下文 (v0.0.2)
│   ├── hooks/
│   │   └── useWebMIDI.ts         # MIDI支持 (v0.0.3)
│   ├── services/
│   │   ├── audioService.ts       # 音频服务
│   │   └── geminiService.ts     # Gemini API服务
│   ├── store/
│   │   └── useMusicStore.ts      # Zustand状态 (v0.0.3)
│   ├── constants.ts              # 常量与翻译 (v0.0.6)
│   ├── error.tsx                # 错误边界
│   ├── layout.tsx               # 根布局 (v0.0.5)
│   ├── loading.tsx               # 加载状态
│   ├── page.tsx                 # 首页 (v0.0.2)
│   ├── style.css                # 全局样式 (v0.0.7)
│   └── types.ts                 # TypeScript类型 (v0.0.2)
├── prototype/                   # 原型设计文档
│   ├── README.md                 # 原型目录说明
│   └── prototype.html            # 完整交互原型 (v0.0.7)
├── openspec/                    # 项目规范文档
│   └── SPEC.md                  # 项目规范 (v0.0.7)
├── public/
│   └── manifest.json             # PWA清单
├── package.json                  # 项目依赖 (v0.0.7)
├── tsconfig.json
├── next.config.mjs
├── .eslintrc.json
├── .gitignore
└── CHANGELOG.md                  # 变更日志 (v0.0.7)
```

## 4. 页面路由

| 路径 | 页面 | 版本 |
|------|------|------|
| `/` | Music Visualizer (首页) | v0.0.2 |
| `/chat` | AI Tutor Chat | v0.0.2 |
| `/art` | AI Art Generator | v0.0.2 |

## 5. 核心功能

### 5.1 音乐可视化 (Music Visualizer)
- 搜索音阶或和弦名称
- 钢琴键盘高亮显示对应音符
- 五线谱展示 (ABC notation)
- MIDI外设键盘支持
- 音频录制与导出
- 随机"手气不错"功能

### 5.2 AI导师 (AI Tutor Chat)
- 流式AI响应
- 多轮对话记忆
- Markdown格式支持
- 音乐理论问答

### 5.3 AI艺术生成 (AI Art Generator)
- 文生图功能
- 分辨率选项: 1K, 2K, 4K
- 图片下载
- API密钥选择

## 6. 国际化

支持11种语言:
- English (en)
- 简体中文 (zh-CN)
- 繁體中文 (zh-TW)
- Español (es)
- العربية (ar)
- Français (fr)
- Português (pt-BR)
- Deutsch (de)
- 日本語 (ja)
- 한국어 (ko)
- Русский (ru)

## 7. 版本对应关系

| 文档 | 版本 | 状态 |
|------|------|------|
| CHANGELOG.md | v0.0.7 | ✅ 最新 |
| layout.tsx | v0.0.5 | ✅ 最新 |
| constants.ts (appTitle) | v0.0.6 | 🔄 待更新 |
| package.json | v0.0.7 | ✅ 最新 |
| prototype.html | v0.0.7 | ✅ 最新 |
| SPEC.md | v0.0.7 | ✅ 最新 |

## 8. API模型配置

| 用途 | 模型 | 版本要求 |
|------|------|----------|
| 乐理分析 | gemini-3-flash-preview | 最新 |
| 聊天导师 | gemini-3-pro-preview | 最新 |
| 图片生成 | gemini-3-pro-image-preview | 最新 |

## 9. 设计规范 (Apple 风格)

### 9.1 主题色
| 颜色名称 | 色值 | 用途 |
|----------|------|------|
| Black | #1d1d1f | 主要文字、背景 |
| Gray | #86868b | 次要文字 |
| Light Gray | #f5f5f7 | 背景色 |
| Blue | #0071e3 | 主按钮、链接 |
| Green | #34c759 | 成功状态 |
| Orange | #ff9500 | 强调色 |
| Red | #ff3b30 | 错误状态 |
| Purple | #bf5af2 | 艺术生成器 |
| Indigo | #5e5ce6 | 强调色 |

### 9.2 暗色模式
使用 `next-themes` 实现，支持 system/light/dark 三种模式。

### 9.3 圆角系统
| 元素 | 圆角值 |
|------|--------|
| 按钮、输入框 | 16px / 980px |
| 卡片、面板 | 24px / 32px |
| 模态框、浮动层 | 24px / 32px |
| 头像、图标 | 12px / 20px |

### 9.4 间距系统
| 名称 | 值 |
|------|------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |

### 9.5 响应式断点
| 断点 | 宽度 | 设备 |
|------|------|------|
| sm | < 640px | iPhone |
| md | 640px - 768px | iPad Mini |
| lg | 768px - 1024px | iPad |
| xl | 1024px - 1280px | MacBook |
| 2xl | > 1280px | iMac |

### 9.6 字体系统
- 主字体: SF Pro Display, -apple-system, BlinkMacSystemFont
- 字重: 400 (正文) / 500 (中等) / 600 (标题) / 700 (大标题) / 800 (超大标题)
- 标题: 48-72px
- 副标题: 21-28px
- 正文: 15-17px
- 行高: 1.5

## 10. Apple 风格设计特点

### 10.1 极简主义
- 大量留白，元素少而精
- 去除非必要视觉噪音
- 聚焦核心功能

### 10.2 毛玻璃效果
- 导航栏: `backdrop-blur-xl`
- 移动端底部导航: `backdrop-filter: saturate(180%) blur(20px)`
- 卡片容器: 半透明背景

### 10.3 动画过渡
- 卡片悬停: `transform: translateY(-2px)` + 阴影增强
- 按钮悬停: `transform: scale(1.05)`
- 主题切换: `transition-all duration-300`
- 焦点状态: `box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15)`

### 10.4 阴影系统
- 卡片阴影: `0 2px 16px rgba(0, 0, 0, 0.06)`
- 卡片悬停: `0 8px 30px rgba(0, 0, 0, 0.12)`
- 下拉菜单: `0 20px 40px rgba(0, 0, 0, 0.15)`

## 11. 自定义 CSS 类

### 11.1 搜索组件
- `search-container`: 白色容器，圆角 24px，阴影
- `search-input`: 输入框，淡灰色背景，圆角 16px
- `search-btn`: 蓝色按钮，圆角 16px
- `lucky-btn`: 橙黄色渐变按钮，圆角 16px

### 11.2 信息卡片
- `info-card`: 主容器，白色背景，圆角 24px
- `info-card-title`: 大标题，字重 800
- `info-notes`: 音符标签容器
- `info-note`: 单个音符标签
- `info-actions`: 按钮容器
- `info-btn`: 通用按钮类
  - `primary`: 蓝色按钮
  - `success`: 绿色按钮
  - `warning`: 橙色按钮

### 11.3 聊天组件
- `chat-container`: 聊天容器，最大高度 600px
- `chat-header`: 头部栏
- `chat-messages`: 消息区域
- `chat-bubble`: 气泡，有 user 和 ai 两种
- `chat-input-area`: 输入区域
- `chat-input`: 输入框
- `chat-send-btn`: 发送按钮，圆形

## 12. UI/UX 优化项

详见 [原型设计文档](../prototype/prototype.html)

### 12.1 已完成优化
- ✅ 全新 Apple 风格设计系统
- ✅ 组件重构与优化
- ✅ 自定义 CSS 样式类
- ✅ 响应式布局优化
- ✅ 删除无用文件

### 12.2 待优化项
- [ ] 钢琴键盘移动端横向滚动优化
- [ ] 聊天输入框键盘遮挡处理
- [ ] 五线谱缩放控制
- [ ] 深色模式平滑过渡动画
- [ ] 加载状态增强动画

### 12.3 建议功能
- [ ] 收藏常用音阶/和弦
- [ ] 搜索历史记录
- [ ] 分享功能
- [ ] 键盘快捷键支持

## 13. 参考链接

- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Gemini API](https://ai.google.dev/)
