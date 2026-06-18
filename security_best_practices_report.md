# MuseTheory AI - 安全与 React 最佳实践审查报告

**项目版本**: v0.0.7
**审查日期**: 2026-06-09
**审查范围**: `/workspace/app` 目录下的所有代码

---

## 执行摘要

本报告对 MuseTheory AI 项目进行了全面的安全性和 React 最佳实践审查。发现了 **3 个高危问题**、**6 个中危问题** 和 **4 个低危问题**。建议优先修复高危问题，特别是 API 密钥处理和 SSR/Hydration 相关的问题。

---

## 严重程度分级

| 级别 | 说明 | 影响 |
|------|------|------|
| **CRITICAL** | 需立即修复 | 可能导致安全漏洞或应用崩溃 |
| **HIGH** | 尽快修复 | 可能影响安全性或用户体验 |
| **MEDIUM** | 建议修复 | 潜在问题或次优实践 |
| **LOW** | 可选修复 | 最佳实践建议 |

---

## 安全问题

### [SEC-001] CRITICAL - API 密钥前端暴露风险

**位置**: `app/services/geminiService.ts:9`

**问题描述**:
```typescript
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });
```
API 密钥直接通过 `process.env.API_KEY` 暴露在前端代码中。虽然 Next.js 会将环境变量前缀为 `NEXT_PUBLIC_` 的变量打包到客户端，但非 `NEXT_PUBLIC_` 前缀的变量理论上不应暴露。如果 `.env` 文件配置不当，可能导致密钥泄露。

**建议修复**:
- API 密钥应仅在服务器端使用，通过 Next.js API Routes 代理调用
- 或确保用户通过 AIStudio 浏览器扩展选择密钥，而不是在服务端存储

**影响**: 攻击者可能获取 API 密钥，导致未授权使用和费用损失。

---

### [SEC-002] HIGH - Markdown XSS 风险

**位置**: `app/components/ChatMessageList.tsx:42`

**问题描述**:
```typescript
<Markdown>{msg.text}</Markdown>
```
AI 生成的 Markdown 内容直接渲染，未配置 DOMPurify 等安全库进行消毒。虽然 `react-markdown` 本身对某些攻击有防护，但复杂的恶意 Markdown 仍可能导致 XSS。

**建议修复**:
```typescript
import remarkGfm from 'remark-gfm';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames || []), 'details', 'summary'],
};

<Markdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeSanitize]}
>
  {msg.text}
</Markdown>
```

**影响**: 恶意 AI 响应可能注入恶意脚本，窃取用户数据。

---

### [SEC-003] HIGH - localStorage 缺乏数据验证

**位置**: `app/components/ChatBot.tsx:20-26`

**问题描述**:
```typescript
const saved = localStorage.getItem('chatHistory');
if (saved) {
  try {
    setMessages(JSON.parse(saved));
  } catch (e) {
    console.error("Failed to parse chat history", e);
  }
}
```
从 localStorage 读取的聊天历史直接 JSON.parse，没有任何 schema 验证。如果存储数据被恶意篡改，可能导致状态异常。

**建议修复**:
```typescript
interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

const validateMessages = (data: unknown): ChatMessage[] => {
  if (!Array.isArray(data)) return [];
  return data.filter((msg): msg is ChatMessage =>
    typeof msg === 'object' &&
    msg !== null &&
    typeof msg.id === 'string' &&
    (msg.role === 'user' || msg.role === 'model') &&
    typeof msg.text === 'string' &&
    typeof msg.timestamp === 'number'
  );
};

const saved = localStorage.getItem('chatHistory');
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    setMessages(validateMessages(parsed));
  } catch (e) {
    console.error("Failed to parse chat history", e);
  }
}
```

**影响**: 恶意或损坏的数据可能导致应用状态异常。

---

## React/Next.js 最佳实践问题

### [REACT-001] HIGH - LanguageContext 缺少 SSR/Hydration 保护

**位置**: `app/contexts/LanguageContext.tsx`

**问题描述**:
当前 `LanguageContext` 没有 `mounted` 状态保护，在服务端渲染和客户端首次加载时可能产生 hydration mismatch。服务端返回默认语言 `'en'`，但客户端从 localStorage 读取可能是其他语言。

**建议修复**:
```typescript
'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof TRANSLATIONS.en;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('language');
    if (saved && saved in TRANSLATIONS) {
      setLanguageState(saved as Language);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const value = { language, setLanguage, t: TRANSLATIONS[language], mounted };

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: 'en', setLanguage: () => {}, t: TRANSLATIONS.en, mounted: false }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

**影响**: 可能导致 Hydration mismatch 警告，影响 SEO 和用户体验。

---

### [REACT-002] HIGH - useWebMIDI 依赖数组导致无限循环

**位置**: `app/hooks/useWebMIDI.ts:68`

**问题描述**:
```typescript
}, [instrument, midiAccess]);
```
`midiAccess` 在依赖数组中，但 `midiAccess` 本身在 effect 中通过 `setMidiAccess` 设置，这可能导致无限循环：midiAccess 变化 → effect 重新运行 → 再次设置 midiAccess。

**建议修复**:
```typescript
}, [instrument]); // 移除 midiAccess 依赖
```

**影响**: 可能导致 MIDI 功能异常或性能问题。

---

### [REACT-003] MEDIUM - 缺少 error boundary

**位置**: `app/components/` 多个组件

**问题描述**:
项目没有全局 Error Boundary 组件。当子组件发生 JavaScript 错误时，整个应用会崩溃，而不是显示优雅的错误提示。

**建议修复**:
创建 `app/components/ErrorBoundary.tsx`:
```typescript
'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center p-8 min-h-[200px]">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
          <p className="text-slate-500 mb-4">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

并在 `app/layout.tsx` 中使用：
```typescript
import { ErrorBoundary } from './components/ErrorBoundary';

<ErrorBoundary>
  {children}
</ErrorBoundary>
```

**影响**: 组件错误时应用崩溃，用户看到空白页面。

---

### [REACT-004] MEDIUM - 缺少 loading.tsx 的 Suspense 边界

**位置**: `app/layout.tsx:56`

**问题描述**:
```typescript
<Suspense fallback={<Loading />}>
  {children}
</Suspense>
```
虽然有 Suspense，但 `Loading` 组件使用了 `indigo-600` 配色，与 Apple 风格不一致。

**建议修复**: 更新 `app/loading.tsx` 使用 Apple Blue 配色。

---

### [REACT-005] MEDIUM - 缺少 API 错误处理边界

**位置**: `app/services/geminiService.ts`

**问题描述**:
API 服务缺少统一的错误处理和重试机制。当 API 调用失败时，直接抛出原始错误，没有区分不同类型的错误（网络错误、认证错误、限流等）。

**建议修复**:
```typescript
export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public isRetryable: boolean = false
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const fetchMusicTheoryData = async (
  query: string,
  language: Language = 'en',
  retries: number = 3
): Promise<NoteData> => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      // ... existing code
    } catch (error: any) {
      if (attempt === retries - 1) throw error;
      if (error.status === 429 || error.status === 503) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
        continue;
      }
      throw error;
    }
  }
  throw new Error("Max retries exceeded");
};
```

**影响**: 网络不稳定时用户体验差，缺乏优雅降级。

---

### [REACT-006] MEDIUM - 未使用 React.cache() 进行请求去重

**位置**: `app/services/geminiService.ts`

**问题描述**:
`fetchMusicTheoryData` 在组件重新渲染时可能产生重复请求。未使用 `React.cache()` 或 SWR/React Query 进行请求缓存和去重。

**建议修复**:
```typescript
import { cache } from 'react';

export const fetchMusicTheoryData = cache(
  async (query: string, language: Language = 'en'): Promise<NoteData> => {
    // ... existing code
  }
);
```

**影响**: 快速输入时可能产生多个重复 API 调用，增加成本和延迟。

---

### [REACT-007] LOW - 版本号不一致

**位置**: 多处

**问题描述**:
- `app/constants.ts` 中 `appTitle` 是 `v0.0.6`
- `app/layout.tsx` 中 `metadata.title` 是 `v0.0.5`
- `app/contexts/LanguageContext.tsx` 版本注释是 `v0.0.2`

**建议修复**: 统一更新到 `v0.0.7`。

---

### [REACT-008] LOW - midiAccess 类型使用 any

**位置**: `app/hooks/useWebMIDI.ts:8`

**问题描述**:
```typescript
const [midiAccess, setMidiAccess] = useState<any | null>(null);
```
应使用正确的 Web MIDI API 类型。

**建议修复**:
```typescript
const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);
```

---

### [REACT-009] LOW - 缺少 TypeScript strict 模式检查

**位置**: `tsconfig.json`

**问题描述**:
未确认 `tsconfig.json` 中 `strict` 模式是否启用。

**建议修复**: 确保 `tsconfig.json` 中包含 `"strict": true`。

---

### [REACT-010] LOW - console.error 应用于生产

**位置**: 多处

**问题描述**:
多处使用 `console.error` 在生产环境中可能泄露敏感信息。

**建议修复**:
```typescript
// 使用自定义日志服务
const logger = {
  error: (...args: unknown[]) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(...args);
    }
  }
};
```

---

## 性能问题

### [PERF-001] MEDIUM - 聊天消息未分页

**位置**: `app/components/ChatBot.tsx`

**问题描述**:
聊天消息存储在 localStorage 且无分页，当聊天历史很长时可能导致性能问题。

**建议修复**:
实现消息分页，只保留最近 N 条消息在内存中。

---

### [PERF-002] LOW - Markdown 渲染未优化

**位置**: `app/components/ChatMessageList.tsx`

**问题描述**:
每次消息更新都重新渲染整个 Markdown 内容。

**建议修复**:
```typescript
const MemoizedMarkdown = React.memo(({ text }: { text: string }) => (
  <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
));
```

---

## 总结

| 严重程度 | 数量 | 建议 |
|---------|------|------|
| CRITICAL | 1 | API 密钥暴露 - 需立即评估和修复 |
| HIGH | 4 | SSR/Hydration、MIDI 循环、XSS、localStorage 验证 |
| MEDIUM | 5 | Error Boundary、API 错误处理、请求去重、分页 |
| LOW | 5 | 版本号、类型优化、日志、性能 |

---

**报告生成时间**: 2026-06-09
**下次审查建议**: 在修复所有 HIGH 级别问题后进行
