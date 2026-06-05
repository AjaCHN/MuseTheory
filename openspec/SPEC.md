# MuseTheory AI - 项目规范文档 v0.0.5

## 1. 项目概述

**项目名称**: MuseTheory AI
**版本**: v0.0.5
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
│   │   ├── ChatBot.tsx           # AI导师组件 (v0.0.4)
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessageList.tsx
│   │   ├── Footer.tsx            # 页脚 (v0.0.2)
│   │   ├── ImageGenerator.tsx    # 图片生成器 (v0.0.4)
│   │   ├── MusicVisualizer.tsx   # 主可视化组件 (v0.0.4)
│   │   ├── Navigation.tsx        # 导航栏 (v0.0.3)
│   │   ├── Piano.tsx             # 钢琴键盘 (v0.0.3)
│   │   ├── Providers.tsx
│   │   ├── SheetMusic.tsx        # 五线谱 (v0.0.3)
│   │   ├── ThemeProvider.tsx
│   │   ├── VisualizerInfo.tsx
│   │   └── VisualizerSearch.tsx
│   ├── contexts/
│   │   └── LanguageContext.tsx    # 国际化上下文 (v0.0.2)
│   ├── hooks/
│   │   └── useWebMIDI.ts         # MIDI支持 (v0.0.3)
│   ├── services/
│   │   ├── audioService.ts       # 音频服务
│   │   └── geminiService.ts      # Gemini API服务
│   ├── store/
│   │   └── useMusicStore.ts      # Zustand状态 (v0.0.3)
│   ├── constants.ts              # 常量与翻译 (v0.0.2)
│   ├── error.tsx                 # 错误边界
│   ├── layout.tsx                # 根布局 (v0.0.5)
│   ├── loading.tsx               # 加载状态
│   ├── page.tsx                  # 首页 (v0.0.2)
│   ├── style.css                # 全局样式
│   └── types.ts                  # TypeScript类型 (v0.0.2)
├── openspec/                     # 项目规范文档
│   └── prototype.html           # 产品原型图
├── public/
│   └── manifest.json             # PWA清单
├── __tests__/                    # 测试文件
│   └── loading.test.tsx
├── package.json                  # 项目依赖 (版本: 0.0.2*)
├── metadata.json                 # 项目元数据 (v0.0.5)
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.js           # 已移除(Tailwind v4使用@tailwindcss/postcss)
├── jest.config.mjs
├── jest.setup.js
├── .eslintrc.json
└── CHANGELOG.md                  # 变更日志 (v0.0.5)

* 注意: package.json中版本为0.0.2，与其他文档不一致，待统一
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
| CHANGELOG.md | v0.0.5 | 最新 |
| metadata.json | v0.0.5 | 最新 |
| layout.tsx (title) | v0.0.5 | 最新 |
| appTitle (translations) | v0.0.1 | **过时** |
| package.json | 0.0.2 | **过时** |

### 7.1 版本修复清单
- [ ] `package.json` 版本从 `0.0.2` 更新为 `0.0.5`
- [ ] `constants.ts` 中所有 `appTitle` 从 `v0.0.1` 更新为 `v0.0.5`

## 8. API模型配置

| 用途 | 模型 | 版本要求 |
|------|------|----------|
| 乐理分析 | gemini-3-flash-preview | 最新 |
| 聊天导师 | gemini-3-pro-preview | 最新 |
| 图片生成 | gemini-3-pro-image-preview | 最新 |

## 9. 设计规范

### 9.1 主题色
- Primary: `#4f46e5` (Indigo-600)
- Secondary: `#7c3aed` (Purple-600)
- Accent: `#f59e0b` (Amber-500)
- Success: `#10b981` (Emerald-500)

### 9.2 暗色模式
使用 `next-themes` 实现，支持 system/light/dark 三种模式。

## 10. 待办事项

- [x] 创建openspec/prototype.html
- [x] 创建openspec/SPEC.md
- [ ] 统一版本号 (package.json, constants.ts)
- [ ] 考虑添加 .env.example 示例文件

## 11. 参考链接

- [Keep a Changelog](https://keepachangelog.com/)
- [Semantic Versioning](https://semver.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Gemini API](https://ai.google.dev/)
