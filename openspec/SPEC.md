# MuseTheory AI - 项目规范文档 v0.0.8

## 1. 项目概述

**项目名称**: MuseTheory AI
**版本**: v0.0.8
**描述**: 智能音乐理论伴侣，可视化音阶与和弦，提供AI导师和AI艺术生成功能。

## 2. 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 框架 | Next.js (App Router) | ^16.1.6 |
| UI | React | ^19.2.3 |
| 样式 | Tailwind CSS | ^4.2.0 |
| 组件库 | shadcn/ui (base-nova) | - |
| 图标 | lucide-react | ^0.586.0 |
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
| CHANGELOG.md | v0.0.8 | ✅ 最新 |
| layout.tsx | v0.0.8 | ✅ 最新 |
| constants.ts (appTitle) | v0.0.8 | ✅ 最新 |
| package.json | v0.0.8 | ✅ 最新 |
| SPEC.md | v0.0.8 | ✅ 最新 |

## 8. API模型配置

| 用途 | 模型 | 版本要求 |
|------|------|----------|
| 乐理分析 | gemini-3-flash-preview | 最新 |
| 聊天导师 | gemini-3-pro-preview | 最新 |
| 图片生成 | gemini-3-pro-image-preview | 最新 |

## 9. 设计系统规范（极简编辑风格）

### 9.1 设计理念
- **极简主义**：大胆排版、精致留白、微妙动效
- **编辑风格**：衬线与无衬线字体搭配，营造杂志般的阅读体验
- **玻璃态设计**：半透明背景、毛玻璃效果、层次感
- **精细动效**：优雅的过渡动画，增强交互体验

### 9.2 色彩系统（oklch 颜色模型）

#### 亮色模式
| 变量名 | 色值 | 用途 |
|--------|------|------|
| --background | oklch(0.99 0.002 100) | 页面背景 |
| --foreground | oklch(0.12 0.01 280) | 主要文字 |
| --card | oklch(1 0 0) | 卡片背景 |
| --card-foreground | oklch(0.12 0.01 280) | 卡片文字 |
| --primary | oklch(0.55 0.22 270) | 主色调（紫） |
| --primary-foreground | oklch(0.98 0.002 250) | 主色文字 |
| --secondary | oklch(0.96 0.006 100) | 次要背景 |
| --secondary-foreground | oklch(0.12 0.01 280) | 次要文字 |
| --muted | oklch(0.96 0.006 100) | 静音背景 |
| --muted-foreground | oklch(0.5 0.012 250) | 静音文字 |
| --accent | oklch(0.96 0.006 100) | 强调背景 |
| --accent-foreground | oklch(0.12 0.01 280) | 强调文字 |
| --border | oklch(0.9 0.008 100) | 边框 |
| --input | oklch(0.9 0.008 100) | 输入框边框 |
| --ring | oklch(0.55 0.22 270) | 焦点环 |

#### 暗色模式
| 变量名 | 色值 | 用途 |
|--------|------|------|
| --background | oklch(0.12 0.01 280) | 页面背景 |
| --foreground | oklch(0.98 0.002 250) | 主要文字 |
| --card | oklch(0.16 0.012 280) | 卡片背景 |
| --primary | oklch(0.65 0.24 270) | 主色调 |
| --border | oklch(0.28 0.016 280) | 边框 |

### 9.3 字体系统

#### 字体族
| 类别 | 字体 | 用途 | CSS 变量 |
|------|------|------|----------|
| 无衬线 | Geist | 正文、UI 元素 | --font-sans |
| 衬线 | Playfair Display | 标题、展示文字 | --font-serif |
| 等宽 | JetBrains Mono | 代码、数字 | --font-mono |

#### 字体层级
| 类别 | 字号 | 字重 | 行高 | 用途 |
|------|------|------|------|------|
| Display | 56-72px | 500-600 | 1.1 | 页面主标题 |
| H1 | 36-48px | 500-600 | 1.2 | 大标题 |
| H2 | 28-32px | 500 | 1.3 | 中标题 |
| H3 | 22-24px | 500 | 1.4 | 小标题 |
| Body Large | 18px | 400 | 1.6 | 大正文 |
| Body | 16px | 400 | 1.6 | 正文 |
| Body Small | 14px | 400 | 1.5 | 小正文 |
| Caption | 12px | 400 | 1.4 | 辅助文字 |

### 9.4 间距系统
基于 4px 基准：
| 名称 | 值 | Tailwind 类 |
|------|-----|-------------|
| 0 | 0 | space-0 |
| 1 | 4px | space-1 |
| 2 | 8px | space-2 |
| 3 | 12px | space-3 |
| 4 | 16px | space-4 |
| 6 | 24px | space-6 |
| 8 | 32px | space-8 |
| 12 | 48px | space-12 |
| 16 | 64px | space-16 |
| 20 | 80px | space-20 |

### 9.5 圆角系统
| 名称 | 值 | 用途 |
|------|-----|------|
| sm | 6px | 小元素 |
| default | 8px | 按钮、输入框 |
| lg | 12px | 卡片 |
| xl | 16px | 大卡片 |
| 2xl | 20px | 容器 |

### 9.6 阴影系统
| 层级 | 值 | 用途 |
|------|-----|------|
| sm | 0 1px 2px rgba(0,0,0,0.05) | 轻微阴影 |
| default | 0 1px 3px rgba(0,0,0,0.1) | 普通阴影 |
| md | 0 4px 12px rgba(0,0,0,0.08) | 中等阴影 |
| lg | 0 12px 24px rgba(0,0,0,0.1) | 大阴影 |

### 9.7 动画系统

#### 动画名称
| 名称 | 效果 | 时长 | 缓动函数 |
|------|------|------|----------|
| fade-in | 淡入 | 400ms | ease-out |
| fade-up | 上移淡入 | 600ms | cubic-bezier(0.22, 1, 0.36, 1) |
| slide-in | 滑入 | 400ms | ease-out |
| pulse-glow | 脉冲发光 | 2s | ease-in-out |

#### 过渡
| 属性 | 时长 | 缓动函数 |
|------|------|----------|
| 颜色/背景 | 200ms | ease |
| 变换/阴影 | 400ms | cubic-bezier(0.22, 1, 0.36, 1) |

#### 无障碍
- 支持 `prefers-reduced-motion` 媒体查询，自动减少动画

### 9.8 响应式断点
| 断点 | 宽度 | 设备 |
|------|------|------|
| sm | >= 640px | 手机横屏 |
| md | >= 768px | 平板 |
| lg | >= 1024px | 笔记本 |
| xl | >= 1280px | 桌面 |
| 2xl | >= 1536px | 大屏 |

## 10. shadcn/ui 组件库

### 10.1 基础组件
- **Button**: 按钮组件，支持 variant/size
- **Input**: 文本输入框
- **Textarea**: 多行文本输入
- **Card**: 卡片容器（CardHeader/CardTitle/CardDescription/CardContent/CardFooter）
- **Badge**: 徽章组件
- **Skeleton**: 骨架屏加载
- **ScrollArea**: 滚动区域

### 10.2 复合组件
- **Tabs**: 标签页（TabsList/TabsTrigger/TabsContent）
- **DropdownMenu**: 下拉菜单（DropdownMenuTrigger/DropdownMenuContent/DropdownMenuItem）

### 10.3 图标库
- 使用 lucide-react，strokeWidth 统一为 1.5
- 装饰性图标添加 aria-hidden="true"

## 11. 交互标准

### 11.1 交互模式
- **悬停反馈**：所有可交互元素都有明确的 hover 状态
- **焦点状态**：使用 focus-visible:ring-2 提供键盘导航可见焦点
- **加载状态**：异步操作显示 Skeleton 或 Spinner
- **空状态**：无数据时提供友好的空状态提示

### 11.2 反馈模式
- **即时反馈**：用户操作立即给出视觉响应
- **渐进加载**：内容逐步呈现，骨架屏过渡
- **状态指示器**：清晰展示当前操作状态

### 11.3 错误处理
- **内联错误**：表单错误直接显示在对应字段旁
- **全局错误**：严重错误使用 Alert 组件展示
- **错误恢复**：提供重试或返回操作

### 11.4 可访问性
- 语义化 HTML 优先
- 图标按钮必须有 aria-label
- 表单控件必须有 label
- 支持键盘导航
- 支持深色模式
- 支持减少动画偏好

## 12. 自定义 CSS 类

### 12.1 排版类
- `.display`: 大展示标题（衬线字体）
- `.heading-serif`: 衬线字体标题
- `.body-serif`: 衬线字体正文

### 12.2 效果类
- `.glass`: 玻璃态效果（半透明背景 + 毛玻璃）
- `.card-hover`: 卡片悬停效果（上移 + 阴影增强）

### 12.3 动画类
- `.animate-fade-up`: 上移淡入动画
- `.animate-fade-in`: 淡入动画
- `.animate-slide-in`: 滑入动画
- `.stagger-1` ~ `.stagger-6`: 动画延迟阶梯

## 13. UI/UX 优化项

### 13.1 已完成优化
- ✅ 全新极简编辑风格设计系统
- ✅ shadcn/ui 组件库集成
- ✅ oklch 颜色模型主题系统
- ✅ 衬线 + 无衬线字体搭配
- ✅ 玻璃态导航栏
- ✅ 优雅的动画过渡系统
- ✅ 可访问性优化（aria-label、键盘导航）
- ✅ prefers-reduced-motion 支持
- ✅ 响应式布局优化
- ✅ 安全漏洞修复
- ✅ 删除冗余原型文件

### 13.2 待优化项
- [ ] 钢琴键盘移动端横向滚动优化
- [ ] 聊天输入框键盘遮挡处理
- [ ] 五线谱缩放控制
- [ ] 依赖库安全漏洞升级
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
