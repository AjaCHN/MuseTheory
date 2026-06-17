# MuseTheory AI - 设计系统规范 v0.0.7

> 基于 Apple Human Interface Guidelines 与 shadcn/ui 组件规范
> 最后更新: 2026-06-09

---

## 目录

1. [设计系统基础](#1-设计系统基础)
   - 1.1 色彩系统
   - 1.2 字体系统
   - 1.3 间距与布局系统
   - 1.4 图标系统
   - 1.5 动效系统
2. [组件库规范](#2-组件库规范)
   - 2.1 基础组件
   - 2.2 复合组件
   - 2.3 业务组件
   - 2.4 组件使用规则
3. [交互标准](#3-交互标准)
   - 3.1 交互模式库
   - 3.2 交互反馈规范
   - 3.3 错误处理规范
   - 3.4 空状态设计规范

---

## 1. 设计系统基础

### 1.1 色彩系统

#### 1.1.1 主色板 (Apple System Colors)

```
Primary Blue:     #0071e3  (主操作、链接、主要按钮)
Primary Hover:    #0077ed  (主色悬停状态)
Primary Pressed:  #005bb5  (主色按下状态)
Primary Muted:   rgba(0, 113, 227, 0.12)  (浅色背景)
```

#### 1.1.2 语义色彩

| 用途 | 浅色模式 | 深色模式 | 使用场景 |
|------|---------|---------|---------|
| **Success** | `#34c759` | `#30d158` | 成功状态、播放按钮、录音 |
| **Warning** | `#ff9500` | `#ff9f0a` | 警告状态、下载按钮 |
| **Destructive** | `#ff3b30` | `#ff453a` | 删除、错误、危险操作 |
| **Info** | `#5e5ce6` | `#6e6cf7` | 信息提示、Indigo 强调 |

#### 1.1.3 中性色板

```
Light Gray BG:   #f5f5f7  (页面背景、输入框背景)
Border:           #d2d2d7  (边框线)
Placeholder:      #86868b  (占位符文字)
Body Text:       #1d1d1f  (主要文字)
Secondary Text:  #6e6e73  (次要文字)
```

#### 1.1.4 深色模式色板

```
Dark BG:         #000000  (深色页面背景)
Dark Secondary:  #1d1d1f  (深色卡片背景)
Dark Elevated:   #2d2d2f  (深色悬浮背景)
Dark Border:     #38383a  (深色边框)
```

#### 1.1.5 渐变色板

```css
/* 品牌渐变 */
.brand-gradient {
  background: linear-gradient(135deg, #0071e3 0%, #0077ed 100%);
}

/* 钢琴黑键渐变 */
.piano-black-key {
  background: linear-gradient(180deg, #303032 0%, #1a1a1c 100%);
}

/* 高亮音符渐变 (Orange) */
.piano-key-highlight-white {
  background: linear-gradient(180deg, #fff7e6 0%, #ffe0b3 50%, #ffcc80 100%);
  box-shadow: 0 0 40px rgba(255, 149, 0, 0.6);
}

.piano-key-highlight-black {
  background: linear-gradient(180deg, #ff9d00 0%, #ff6b00 100%);
  box-shadow: 0 6px 24px rgba(255, 149, 0, 0.7);
}

/* Feature Card 渐变 */
.feature-blue {
  background: linear-gradient(135deg, #0071e3, #0077ed);
}
.feature-purple {
  background: linear-gradient(135deg, #5e5ce6, #bf5af2);
}
.feature-orange {
  background: linear-gradient(135deg, #ff9500, #ffcc00);
}
```

#### 1.1.6 CSS 变量定义

```css
:root {
  /* Primary */
  --apple-blue: #0071e3;
  --apple-blue-hover: #0077ed;
  --apple-blue-pressed: #005bb5;
  --apple-blue-muted: rgba(0, 113, 227, 0.12);

  /* Semantic */
  --apple-green: #34c759;
  --apple-green-dark: #30d158;
  --apple-orange: #ff9500;
  --apple-orange-dark: #ff9f0a;
  --apple-red: #ff3b30;
  --apple-red-dark: #ff453a;
  --apple-indigo: #5e5ce6;
  --apple-indigo-dark: #6e6cf7;
  --apple-yellow: #ffcc00;

  /* Neutrals */
  --apple-black: #1d1d1f;
  --apple-gray: #86868b;
  --apple-light-gray: #f5f5f7;
  --apple-border: #d2d2d7;

  /* Semantic Tokens (shadcn pattern) */
  --background: #ffffff;
  --foreground: #1d1d1f;
  --card: #ffffff;
  --card-foreground: #1d1d1f;
  --popover: #ffffff;
  --popover-foreground: #1d1d1f;
  --primary: var(--apple-blue);
  --primary-foreground: #ffffff;
  --secondary: #f5f5f7;
  --secondary-foreground: #1d1d1f;
  --muted: #f5f5f7;
  --muted-foreground: #86868b;
  --accent: #f5f5f7;
  --accent-foreground: #1d1d1f;
  --destructive: var(--apple-red);
  --destructive-foreground: #ffffff;
  --border: #d2d2d7;
  --input: #d2d2d7;
  --ring: #0071e3;
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
  --card: #1d1d1f;
  --card-foreground: #ffffff;
  --popover: #1d1d1f;
  --popover-foreground: #ffffff;
  --primary: #0077ed;
  --primary-foreground: #ffffff;
  --secondary: #2d2d2f;
  --secondary-foreground: #ffffff;
  --muted: #2d2d2f;
  --muted-foreground: #a1a1a6;
  --accent: #2d2d2f;
  --accent-foreground: #ffffff;
  --destructive: #ff453a;
  --destructive-foreground: #ffffff;
  --border: #38383a;
  --input: #38383a;
  --ring: #0077ed;
}
```

---

### 1.2 字体系统

#### 1.2.1 字体族

```css
/* Apple System Font Stack */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
  'Helvetica Neue', 'Segoe UI', Roboto, sans-serif;

/* 中文优化 */
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text',
  'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;

/* 等宽字体 (代码/音标) */
font-family: 'SF Mono', 'Fira Code', 'Monaco', 'Menlo', monospace;
```

#### 1.2.2 字体尺度

| Token | 桌面端 | 移动端 | 字重 | 行高 | 字间距 | 用途 |
|-------|--------|--------|------|------|--------|------|
| `display` | 72px | 56px | 800 | 1.1 | -0.03em | Hero 标题 |
| `h1` | 48px | 36px | 700 | 1.15 | -0.02em | 页面标题 |
| `h2` | 36px | 28px | 600 | 1.2 | -0.01em | 区块标题 |
| `h3` | 28px | 22px | 600 | 1.25 | -0.01em | 卡片标题 |
| `h4` | 22px | 18px | 700 | 1.3 | 0 | 组件标题 |
| `body-lg` | 17px | 17px | 400 | 1.5 | 0 | 主要正文 |
| `body` | 15px | 15px | 400 | 1.5 | 0 | 正文内容 |
| `body-sm` | 14px | 14px | 400 | 1.5 | 0 | 次要内容 |
| `caption` | 13px | 13px | 500 | 1.4 | 0 | 标签文字 |
| `overline` | 11px | 11px | 600 | 1.5 | 0.05em | 顶部标签 |

#### 1.2.3 CSS 变量定义

```css
:root {
  /* Font Sizes */
  --text-display: 72px;
  --text-h1: 48px;
  --text-h2: 36px;
  --text-h3: 28px;
  --text-h4: 22px;
  --text-body-lg: 17px;
  --text-body: 15px;
  --text-body-sm: 14px;
  --text-caption: 13px;
  --text-overline: 11px;

  /* Font Weights */
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;

  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.2;
  --leading-normal: 1.5;
  --leading-relaxed: 1.6;

  /* Letter Spacing */
  --tracking-tight: -0.03em;
  --tracking-snug: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
}
```

---

### 1.3 间距与布局系统

#### 1.3.1 间距尺度 (8px Base)

| Token | 值 | 用途 |
|-------|-----|------|
| `space-0` | 0px | 无间距 |
| `space-1` | 4px | 微调间距 |
| `space-2` | 8px | 紧凑间距 |
| `space-3` | 12px | 小间距 |
| `space-4` | 16px | 标准间距 |
| `space-5` | 20px | 中间距 |
| `space-6` | 24px | 较大间距 |
| `space-8` | 32px | 大间距 |
| `space-10` | 40px | 区块间距 |
| `space-12` | 48px | 大区块间距 |
| `space-16` | 64px | 页面间距 |
| `space-20` | 80px | 巨量间距 |

#### 1.3.2 圆角系统

| Token | 值 | 用途 |
|-------|-----|------|
| `radius-sm` | 8px | 小元素、徽章 |
| `radius-md` | 12px | 输入框、按钮 |
| `radius-lg` | 16px | 较大按钮 |
| `radius-xl` | 20px | 卡片 |
| `radius-2xl` | 24px | 大卡片 |
| `radius-3xl` | 32px | 容器、设备框架 |
| `radius-full` | 9999px | 药丸按钮、头像 |

#### 1.3.3 阴影系统

```css
/* Subtle (卡片默认) */
--shadow-subtle: 0 2px 16px rgba(0, 0, 0, 0.06);

/* Card (悬停) */
--shadow-card: 0 12px 40px rgba(0, 0, 0, 0.12);

/* Elevated (下拉菜单) */
--shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.12);

/* Modal */
--shadow-modal: 0 24px 64px rgba(0, 0, 0, 0.24);

/* Piano Black Key */
--shadow-key: 0 6px 12px rgba(0, 0, 0, 0.5);

/* Highlight Glow (Orange) */
--shadow-highlight: 0 0 40px rgba(255, 149, 0, 0.6);
```

#### 1.3.4 布局网格

```css
/* 页面最大宽度 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 响应式断点 */
/* Mobile: < 768px */
/* Tablet: 768px - 1024px */
/* Desktop: > 1024px */

/* 网格系统 */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .grid-3, .grid-2 {
    grid-template-columns: 1fr;
  }
}
```

---

### 1.4 图标系统

#### 1.4.1 图标库

使用 **Lucide React** 作为图标库（符合 shadcn/ui 标准）

```bash
import { Play, Pause, SkipBack, SkipForward, Volume2, Mic, Download,
         Search, Sparkles, Music, MessageCircle, Image, ChevronDown,
         X, Check, AlertCircle, Info, Moon, Sun, Globe, Settings } from 'lucide-react';
```

#### 1.4.2 图标尺寸

| 用途 | 尺寸 | 示例 |
|------|------|------|
| `icon-sm` | 16px | 输入框前缀、徽章内 |
| `icon-md` | 20px | 按钮内、导航链接 |
| `icon-lg` | 24px | 主要图标、Feature Card |
| `icon-xl` | 32px | Feature Card 大图标 |
| `icon-2xl` | 48px | Empty State |
| `icon-hero` | 64px | Hero Section |

#### 1.4.3 图标使用规范

```tsx
// ✅ 正确：按钮内使用 data-icon 属性
<Button>
  <PlayIcon data-icon="inline-start" />
  播放
</Button>

// ✅ 正确：独立图标设置尺寸
<div className="text-muted-foreground">
  <MusicIcon className="size-8" />
</div>

// ❌ 错误：不要在组件内设置图标尺寸
<Button>
  <PlayIcon className="w-5 h-5" />  {/* 组件自行处理尺寸 */}
</Button>
```

---

### 1.5 动效系统

#### 1.5.1 缓动函数

```css
/* Apple 标准缓动 */
--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

#### 1.5.2 时长尺度

| Token | 值 | 用途 |
|-------|-----|------|
| `duration-fast` | 150ms | 微交互、悬停 |
| `duration-default` | 300ms | 标准过渡 |
| `duration-slow` | 500ms | 页面过渡 |
| `duration-slower` | 700ms | 复杂动画 |

#### 1.5.3 关键帧动画

```css
/* 淡入上移动画 */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

/* 缩放淡入 */
@keyframes scale-fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* 弹跳效果 */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* 旋转变换 */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 脉冲效果 */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(255, 149, 0, 0.4); }
  50% { box-shadow: 0 0 40px rgba(255, 149, 0, 0.8); }
}
```

#### 1.5.4 组件动画规范

```tsx
// 卡片悬停动画
.card {
  transition: all 0.4s var(--ease-bounce);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}

// 按钮悬停动画
.btn {
  transition: all 0.3s var(--ease-out);
}
.btn:hover {
  transform: scale(1.05);
}
.btn:active {
  transform: scale(0.98);
}

// 导航链接动画
.nav-link {
  transition: all 0.2s var(--ease-out);
}
.nav-link:hover:not(.active) {
  background: rgba(0, 0, 0, 0.05);
}

// 钢琴按键按下效果
.white-key:active {
  transform: translateY(4px);
}
.black-key:active {
  transform: translateY(3px);
}
```

---

## 2. 组件库规范

### 2.1 基础组件

#### 2.1.1 Button

```tsx
import { Button } from '@/components/ui/button';

// 变体 (Variants)
<Button variant="default">  // Primary Blue
<Button variant="secondary">  // Gray background
<Button variant="outline">  // Border only
<Button variant="ghost">  // No background
<Button variant="destructive">  // Red

// 尺寸 (Sizes)
<Button size="sm">  // 32px height
<Button size="default">  // 40px height
<Button size="lg">  // 50px height
<Button size="icon">  // Square, icon only

// 使用规范
// ✅ 最小触控区域 44x44px (iOS HIG)
// ✅ 主要操作只用一个 Primary Button
// ✅ 按钮文字简洁，1-2个词
// ✅ 图标按钮使用 size="icon"
```

**Apple 风格 Button 样式:**
```css
.btn-apple {
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn-apple-primary {
  background: var(--apple-blue);
  color: white;
}
.btn-apple-primary:hover {
  background: var(--apple-blue-hover);
  transform: scale(1.05);
}
.btn-apple-primary:active {
  transform: scale(0.98);
}
```

#### 2.1.2 Input

```tsx
import { Input } from '@/components/ui/input';

// 使用规范
// ✅ 使用 placeholder 提示输入内容
// ✅ 输入框高度 40-48px
// ✅ 圆角 12-16px
// ✅ focus 时显示蓝色边框 + 光晕

<input
  className="flex h-11 px-4 rounded-xl border-2 border-input
             bg-background text-foreground placeholder:text-muted-foreground
             focus-visible:outline-none focus-visible:border-primary
             focus-visible:ring-4 focus-visible:ring-primary/20"
  placeholder="输入音阶或和弦，如：C大调、G7和弦..."
/>
```

#### 2.1.3 Badge

```tsx
import { Badge } from '@/components/ui/badge';

// 变体
<Badge variant="default">  // Primary
<Badge variant="secondary">  // Gray
<Badge variant="outline">  // Border only
<Badge variant="success">  // Green
<Badge variant="warning">  // Orange
<Badge variant="destructive">  // Red

// 使用场景
// - 音符标签 (C, D, E, F, G, A, B)
// - 状态标签 (录音中、播放中)
// - 版本标签 (v0.0.7)
```

#### 2.1.4 Avatar

```tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// 使用规范
// ✅ 始终包含 AvatarFallback
// ✅ 尺寸使用 size-* 而非 w-* h-*

<Avatar className="size-10">
  <AvatarImage src="/avatar.jpg" />
  <AvatarFallback>MT</AvatarFallback>
</Avatar>
```

---

### 2.2 复合组件

#### 2.2.1 Card (shadcn/ui)

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

// 完整结构
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Content goes here</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>

// Apple 风格 Card
.card-apple {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: var(--shadow-subtle);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s var(--ease-bounce);
}
.card-apple:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card);
}
```

#### 2.2.2 Tabs

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// 使用规范
// ✅ TabsTrigger 必须放在 TabsList 内
// ✅ 使用语义化值

<Tabs defaultValue="visualizer">
  <TabsList>
    <TabsTrigger value="visualizer">♪ 可视化</TabsTrigger>
    <TabsTrigger value="chat">💬 导师</TabsTrigger>
    <TabsTrigger value="art">🎨 艺术</TabsTrigger>
  </TabsList>
  <TabsContent value="visualizer">可视化内容</TabsContent>
  <TabsContent value="chat">聊天内容</TabsContent>
  <TabsContent value="art">艺术内容</TabsContent>
</Tabs>
```

#### 2.2.3 Dialog / Sheet

```tsx
import { Dialog, DialogTitle, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Sheet, SheetTitle, SheetContent, SheetTrigger } from '@/components/ui/sheet';

// 使用规范
// ✅ Dialog/Sheet 必须有 Title (可 sr-only)
// ✅ 使用 asChild 或 render 模式

<Dialog>
  <DialogTrigger asChild>
    <Button>打开</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogTitle className="sr-only">对话框标题</DialogTitle>
    <p>对话框内容</p>
  </DialogContent>
</Dialog>
```

#### 2.2.4 Select

```tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// 使用规范
// ✅ SelectItem 必须放在 SelectGroup 内

<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="选择语言" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectItem value="en">English</SelectItem>
      <SelectItem value="zh">中文</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

#### 2.2.5 Form (shadcn/ui)

```tsx
import { FieldGroup, Field, FieldLabel, FieldDescription, FieldError } from '@/components/ui/form';

// 使用规范
// ✅ 使用 FieldGroup + Field 而非 div + space-y-*
// ✅ 验证使用 data-invalid + aria-invalid

<FieldGroup>
  <Field>
    <FieldLabel htmlFor="email">邮箱</FieldLabel>
    <Input id="email" aria-invalid />
    <FieldDescription>请输入邮箱地址</FieldDescription>
    <FieldError>邮箱格式不正确</FieldError>
  </Field>
</FieldGroup>
```

---

### 2.3 业务组件

#### 2.3.1 PianoKeyboard

```tsx
// 属性接口
interface PianoKeyboardProps {
  highlightedNotes?: string[];  // 高亮音符，如 ['C4', 'E4', 'G4']
  onNoteClick?: (note: string) => void;
  octaveRange?: [number, number]; // 如 [3, 5]
  showLabels?: boolean;
}

// 高亮样式规范
.white-key.highlighted {
  background: linear-gradient(180deg, #fff7e6 0%, #ffe0b3 50%, #ffcc80 100%);
  box-shadow: 0 0 40px rgba(255, 149, 0, 0.6),
              inset 0 -12px 24px rgba(255, 149, 0, 0.3);
}

.black-key.highlighted {
  background: linear-gradient(180deg, #ff9d00 0%, #ff6b00 100%);
  box-shadow: 0 6px 24px rgba(255, 149, 0, 0.7);
}

// 按下状态
.white-key:active { transform: translateY(4px); }
.black-key:active { transform: translateY(3px); }
```

#### 2.3.2 ChatInterface

```tsx
// 属性接口
interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

// 气泡样式
.chat-bubble {
  max-width: 75%;
  padding: 14px 18px;
  border-radius: 20px;
  line-height: 1.6;
  font-size: 15px;
}

.chat-bubble.ai {
  background: var(--apple-light-gray);
  color: var(--apple-black);
  border-bottom-left-radius: 4px;
}

.chat-bubble.user {
  background: var(--apple-blue);
  color: white;
  border-bottom-right-radius: 4px;
}

// 输入框样式
.chat-input {
  padding: 14px 20px;
  border: 2px solid #e5e5e7;
  border-radius: 24px;
  font-size: 15px;
  background: #f5f5f7;
  transition: all 0.3s ease;
}

.chat-input:focus {
  border-color: var(--apple-blue);
  box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.15);
  background: white;
}
```

#### 2.3.3 InfoCard

```tsx
// 属性接口
interface InfoCardProps {
  title: string;           // 如 "🎵 C Major Scale"
  notes?: string[];        // 音符数组
  intervals?: string;      // 音程信息
  actions?: Action[];      // 操作按钮配置
}

interface Action {
  label: string;
  variant: 'primary' | 'success' | 'warning';
  icon?: ReactNode;
  onClick: () => void;
}

// Apple 风格样式
.info-card {
  background: white;
  border-radius: 24px;
  padding: 40px;
  box-shadow: var(--shadow-subtle);
}

.info-note {
  padding: 10px 18px;
  background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%);
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
}
```

#### 2.3.4 VisualizerSearch

```tsx
// 属性接口
interface VisualizerSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onLucky?: () => void;  // 随机选择
  placeholder?: string;
}

// Apple 风格样式
.search-container {
  display: flex;
  gap: 12px;
  padding: 24px;
  background: white;
  border-radius: 24px;
  box-shadow: var(--shadow-subtle);
  max-width: 700px;
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 16px 20px;
  border: 2px solid #e5e5e7;
  border-radius: 16px;
  font-size: 17px;
  background: #f5f5f7;
}

.lucky-btn {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--apple-orange), #ffcc00);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.lucky-btn:hover {
  transform: scale(1.1) rotate(15deg);
}
```

#### 2.3.5 Navigation

```tsx
// 桌面端样式
.nav-desktop {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.nav-link {
  padding: 8px 16px;
  border-radius: 980px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-link.active {
  background: var(--apple-black);
  color: white;
}

// 移动端底部导航
.mobile-nav-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(180%) blur(20px);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 16px;
  z-index: 100;
}

.mobile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 20px;
  border-radius: 16px;
  color: var(--apple-gray);
  font-size: 11px;
  font-weight: 600;
}

.mobile-nav-item.active {
  color: var(--apple-blue);
  background: rgba(0, 113, 227, 0.08);
}
```

#### 2.3.6 MusicVisualizer

```tsx
// 属性接口
interface MusicVisualizerProps {
  type: 'waveform' | 'bars' | 'circular';
  isPlaying?: boolean;
  color?: string;
}

// 动画规范
.visualizer-bar {
  animation: visualize 0.5s ease-in-out infinite alternate;
}

@keyframes visualize {
  from { transform: scaleY(0.3); }
  to { transform: scaleY(1); }
}
```

---

### 2.4 组件使用规则

#### 2.4.1 shadcn/ui 关键规则

1. **使用 `className` 进行布局，不进行样式覆盖**
   ```tsx
   // ✅ 正确
   <div className="flex flex-col gap-4">
     <Button className="w-full">Action</Button>
   </div>

   // ❌ 错误
   <Button className="bg-blue-500 text-white w-full">
   ```

2. **使用 `gap-*` 而非 `space-y-*` 或 `space-x-*`**
   ```tsx
   // ✅ 正确
   <div className="flex flex-col gap-4">

   // ❌ 错误
   <div className="space-y-4">
   ```

3. **等宽尺寸使用 `size-*` 而非 `w-* h-*`**
   ```tsx
   // ✅ 正确
   <Avatar className="size-10">

   // ❌ 错误
   <Avatar className="w-10 h-10">
   ```

4. **使用 `cn()` 处理条件类名**
   ```tsx
   import { cn } from '@/lib/utils';

   <div className={cn(
     "base-class",
     condition && "conditional-class",
     className
   )}>
   ```

5. **表单使用 FieldGroup + Field**
   ```tsx
   <FieldGroup>
     <Field>
       <FieldLabel>Email</FieldLabel>
       <Input aria-invalid />
     </Field>
   </FieldGroup>
   ```

6. **Overlay 组件不手动设置 z-index**
   ```tsx
   // Dialog, Sheet, Popover 自行处理层级
   <Dialog>
     <DialogContent className="...">  {/* 无需加 z-50 */}
   ```

7. **按钮内图标使用 `data-icon`**
   ```tsx
   <Button>
     <SearchIcon data-icon="inline-start" />
     Search
   </Button>
   ```

#### 2.4.2 Apple 风格补充规则

1. **圆角规范**
   - 按钮/输入框: `radius-lg` (16px)
   - 卡片: `radius-xl` (24px)
   - 容器: `radius-2xl` (32px)
   - 移动端设备框架: `radius-3xl` (48px)

2. **毛玻璃效果**
   ```css
   .glass {
     background: rgba(255, 255, 255, 0.8);
     backdrop-filter: saturate(180%) blur(20px);
     -webkit-backdrop-filter: saturate(180%) blur(20px);
   }
   ```

3. **触控区域**
   - 最小触控区域: 44x44px (iOS HIG)
   - 按钮高度: 40-50px
   - 图标按钮: 44x44px

---

## 3. 交互标准

### 3.1 交互模式库

#### 3.1.1 页面过渡

```tsx
// 路由切换动画
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
};

// 使用
<motion.div key={path} {...pageTransition}>
  {children}
</motion.div>
```

#### 3.1.2 卡片交互

```tsx
// 悬停效果
const cardHover = {
  scale: 1.02,
  y: -4,
  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.12)",
  transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] }
};

// 触控设备禁用悬停
const isTouchDevice = 'ontouchstart' in window;
```

#### 3.1.3 按钮交互状态

```tsx
// 状态机
const buttonStates = {
  default: {
    transform: 'scale(1)',
    opacity: 1
  },
  hover: {
    transform: 'scale(1.05)',
    transition: { duration: 0.2 }
  },
  active: {
    transform: 'scale(0.98)',
    transition: { duration: 0.1 }
  },
  disabled: {
    opacity: 0.5,
    cursor: 'not-allowed'
  },
  loading: {
    opacity: 0.8,
    cursor: 'wait'
  }
};
```

#### 3.1.4 输入框交互

```tsx
// 焦点状态
const inputFocus = {
  borderColor: 'var(--apple-blue)',
  boxShadow: '0 0 0 4px rgba(0, 113, 227, 0.15)',
  backgroundColor: 'white'
};

// 错误状态
const inputError = {
  borderColor: 'var(--apple-red)',
  boxShadow: '0 0 0 4px rgba(255, 59, 48, 0.15)'
};
```

---

### 3.2 交互反馈规范

#### 3.2.1 成功反馈

```tsx
// ✅ 使用 Sonner Toast
import { toast } from 'sonner';

toast.success('播放成功', {
  description: '正在播放 C 大调音阶',
  icon: '🎵'
});

// ✅ 按钮加载状态
<Button disabled={isLoading}>
  {isLoading ? (
    <Spinner data-icon />
  ) : (
    <PlayIcon data-icon="inline-start" />
  )}
  播放
</Button>
```

#### 3.2.2 错误反馈

```tsx
// ✅ 错误 Toast
toast.error('播放失败', {
  description: '请检查音频设备连接',
  icon: '⚠️'
});

// ✅ 表单错误
<Field data-invalid>
  <FieldLabel>邮箱</FieldLabel>
  <Input aria-invalid />
  <FieldError>请输入有效的邮箱地址</FieldError>
</Field>
```

#### 3.2.3 加载反馈

```tsx
// ✅ Skeleton 加载占位
import { Skeleton } from '@/components/ui/skeleton';

<Card>
  <CardHeader>
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-4 w-1/2" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-32 w-full" />
  </CardContent>
</Card>

// ✅ Spinner
<Spinner className="text-primary" />
```

#### 3.2.4 触控反馈

```tsx
// ✅ iOS 风格触控波纹 (可用 CSS)
@media (hover: none) {
  .btn:active {
    opacity: 0.7;
    transform: scale(0.98);
  }
}

// ✅ 钢琴按键音效反馈
const playKeySound = (note: string) => {
  audioService.playNote(note);
  // 配合视觉高亮
};
```

---

### 3.3 错误处理规范

#### 3.3.1 错误层级

| 层级 | 处理方式 | 示例 |
|------|---------|------|
| **Toast** | 轻量提示，不打断操作 | 网络不稳定 |
| **Inline Error** | 表单字段内联错误 | 输入验证失败 |
| **Alert Dialog** | 需用户确认的危险操作 | 删除确认 |
| **Error Page** | 页面级别错误 | 404 / 500 |
| **Error Boundary** | 捕获子组件错误 | React ErrorBoundary |

#### 3.3.2 Error Boundary 实现

```tsx
import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-8">
          <AlertCircleIcon className="size-12 text-destructive mb-4" />
          <h2 className="text-h3 font-bold mb-2">出错了</h2>
          <p className="text-muted-foreground">{this.state.error?.message}</p>
          <Button onClick={() => window.location.reload()}>
            重新加载
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

#### 3.3.3 API 错误处理模式

```tsx
// 统一错误处理
const handleAPIError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        toast.error('请求参数错误');
        break;
      case 401:
        toast.error('请重新登录');
        break;
      case 403:
        toast.error('没有权限');
        break;
      case 404:
        toast.error('资源不存在');
        break;
      case 500:
        toast.error('服务器错误');
        break;
      default:
        toast.error('网络错误');
    }
  } else {
    toast.error('未知错误');
  }
};

// 使用
try {
  await fetchData();
} catch (error) {
  handleAPIError(error);
}
```

#### 3.3.4 音阶/和弦查找错误

```tsx
// 输入验证
const parseScaleInput = (input: string): Scale | null => {
  const pattern = /^[A-Ga-g][#b]?\s*(major|minor|dorian|phrygian|lydian|mixolydian|locrian)?$/i;
  if (!pattern.test(input)) {
    toast.error('输入格式不正确', {
      description: '请输入如 "C Major" 或 "Am" 格式'
    });
    return null;
  }
  // ... 解析逻辑
};
```

---

### 3.4 空状态设计规范

#### 3.4.1 空状态组件

```tsx
import { Empty } from '@/components/ui/empty';

// 变体
<Empty
  icon={MusicIcon}           // 图标 (size-12)
  title="暂无音乐"            // 标题
  description="上传音乐文件开始分析"  // 描述
>
  <Button size="sm">上传音乐</Button>
</Empty>
```

#### 3.4.2 空状态场景

| 场景 | 图标 | 标题 | 描述 | 操作 |
|------|------|------|------|------|
| 无搜索结果 | SearchX | 未找到匹配 | 尝试其他关键词 | 清除搜索 |
| 无聊天记录 | MessageCircle | 开始对话 | 向 AI 导师提问音乐问题 | 查看示例问题 |
| 无收藏 | Heart | 暂无收藏 | 收藏喜欢的音阶或和弦 | 浏览推荐 |
| 无历史记录 | Clock | 无历史 | 你的浏览记录会显示在这里 | 随便看看 |

#### 3.4.3 Apple 风格空状态设计

```tsx
// Apple 风格空状态组件
const EmptyState = ({ icon, title, description, action }) => (
  <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
    <div className="size-16 rounded-3xl bg-muted flex items-center justify-center mb-6">
      {icon && <icon className="size-8 text-muted-foreground" />}
    </div>
    <h3 className="text-h4 font-bold text-foreground mb-2">{title}</h3>
    <p className="text-body text-muted-foreground max-w-sm mb-6">{description}</p>
    {action}
  </div>
);

// 使用示例
<EmptyState
  icon={SearchXIcon}
  title="未找到音阶"
  description="请尝试输入如 'C Major' 或 'D Minor' 格式"
  action={<Button>清除搜索</Button>}
/>
```

#### 3.4.4 骨架屏 (Skeleton)

```tsx
import { Skeleton } from '@/components/ui/skeleton';

// 卡片骨架
<Card>
  <CardHeader>
    <Skeleton className="h-6 w-1/3 mb-2" />
    <Skeleton className="h-4 w-1/2" />
  </CardHeader>
  <CardContent>
    <Skeleton className="h-40 w-full rounded-xl" />
  </CardContent>
  <CardFooter>
    <Skeleton className="h-10 w-24" />
  </CardFooter>
</Card>

// 列表骨架
<div className="flex flex-col gap-3">
  {[1, 2, 3].map(i => (
    <div key={i} className="flex items-center gap-3 p-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ))}
</div>
```

---

## 附录

### A. 完整 CSS 变量参考

```css
:root {
  /* Colors */
  --apple-blue: #0071e3;
  --apple-blue-hover: #0077ed;
  --apple-blue-pressed: #005bb5;
  --apple-green: #34c759;
  --apple-orange: #ff9500;
  --apple-red: #ff3b30;
  --apple-indigo: #5e5ce6;
  --apple-black: #1d1d1f;
  --apple-gray: #86868b;
  --apple-light-gray: #f5f5f7;
  --apple-border: #d2d2d7;

  /* Semantic Tokens */
  --background: #ffffff;
  --foreground: #1d1d1f;
  --card: #ffffff;
  --card-foreground: #1d1d1f;
  --primary: var(--apple-blue);
  --primary-foreground: #ffffff;
  --secondary: #f5f5f7;
  --secondary-foreground: #1d1d1f;
  --muted: #f5f5f7;
  --muted-foreground: #86868b;
  --destructive: var(--apple-red);
  --destructive-foreground: #ffffff;
  --border: #d2d2d7;
  --input: #d2d2d7;
  --ring: #0071e3;

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-subtle: 0 2px 16px rgba(0, 0, 0, 0.06);
  --shadow-card: 0 12px 40px rgba(0, 0, 0, 0.12);
  --shadow-elevated: 0 8px 32px rgba(0, 0, 0, 0.12);
  --shadow-modal: 0 24px 64px rgba(0, 0, 0, 0.24);

  /* Timing */
  --duration-fast: 150ms;
  --duration-default: 300ms;
  --duration-slow: 500ms;
  --ease-default: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-bounce: cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
  --card: #1d1d1f;
  --primary: #0077ed;
  --secondary: #2d2d2f;
  --muted: #2d2d2f;
  --border: #38383a;
  --input: #38383a;
}
```

### B. 响应式断点

```css
/* Mobile First */
/* sm: 640px */
/* md: 768px */
/* lg: 1024px */
/* xl: 1280px */
/* 2xl: 1536px */

@media (max-width: 768px) {
  /* Mobile styles */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Tablet styles */
}
```

### C. 无障碍规范

```tsx
// 颜色对比度
// ✅ 正文: 文本与背景对比度 ≥ 4.5:1
// ✅ 大文本: 文本与背景对比度 ≥ 3:1
// ✅ 组件边界: 对比度 ≥ 3:1

// 焦点管理
// ✅ 所有可交互元素可键盘访问
// ✅ focus-visible 显示焦点环

// ARIA 标签
<Button aria-label="播放当前音阶">
  <PlayIcon />
</Button>

// 屏幕阅读器
<span className="sr-only">当前为选中状态</span>
```

---

**文档版本**: v0.0.7
**更新日期**: 2026-06-09
**维护者**: MuseTheory Design Team
