# MuseTheory AI 安全审查报告

## 执行摘要

MuseTheory AI 是一个基于 Next.js 16.1.6 + React 19.2.3 + TypeScript 的音乐理论 AI 应用。**本次审查后已修复多个关键安全问题**，包括 API 密钥暴露、用户消息 XSS 漏洞、错误信息泄露等。当前仍需关注的主要问题是依赖库中的漏洞（protobufjs 远程代码执行、Next.js 多个高危漏洞）。建议优先升级存在漏洞的依赖包。

### 已修复的问题

1. ✅ API 密钥暴露到客户端（Critical）- 已从 next.config.mjs 中移除 env 配置
2. ✅ 聊天机器人用户消息 XSS 防护（High）- 用户消息现在通过 React `<p>` 标签渲染，自动转义
3. ✅ 错误信息通过 console.error 泄露（High）- 已添加 `process.env.NODE_ENV === 'development'` 检查
4. ✅ 冗余原型文件已删除 - prototype 目录已移除

---

## 严重程度：Critical（严重）

### 1. API 密钥暴露到客户端

**文件：** `/workspace/next.config.mjs`  
**行号：** 4-6

**漏洞描述：**
```javascript
const nextConfig = {
  env: {
    API_KEY: process.env.GEMINI_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};
```
通过 Next.js 的 `env` 配置将 `GEMINI_API_KEY` 暴露到客户端代码中。任何能够访问浏览器开发者工具或网络请求的用户都可以轻松获取此 API 密钥。

**影响：** 攻击者可以使用您的 API 密钥，导致未授权的 API 调用和潜在的经济损失。

**修复建议：**
- 从 `next.config.mjs` 中移除 `env` 配置
- 使用 Next.js API Routes 代理所有 Gemini API 调用
- 如果必须在前端使用 API 密钥，只使用 `NEXT_PUBLIC_` 前缀的变量，但仅限不敏感的配置

---

### 2. 依赖库关键级别漏洞 - protobufjs

**文件：** `/workspace/package.json`  
**依赖：** `@google/genai` -> `protobufjs`

**漏洞描述：**
`protobufjs` 存在多个 critical 级别的安全漏洞，包括：
- Arbitrary code execution (GHSA-xq3m-2v4x-88gg)
- Code injection through bytes field defaults (GHSA-66ff-xgx4-vchm)
- Prototype injection (GHSA-fx83-v9x8-x52w)

**影响：** 攻击者可能在受影响系统上执行任意代码。

**修复建议：**
```bash
npm update protobufjs
# 或
npm audit fix
```
如果 `@google/genai` 包没有及时更新，考虑联系 Google 确认修复进度或寻找替代方案。

---

## 严重程度：High（高）

### 3. Next.js 多个高危漏洞

**文件：** `/workspace/package.json`  
**依赖：** `next` (当前版本: 16.1.6)

**漏洞描述：**
Next.js 存在多个高危漏洞：
- HTTP request smuggling in rewrites (GHSA-ggv3-7p47-pfv8)
- XSS in beforeInteractive scripts (GHSA-gx5p-jg67-6x7h)
- Cross-site scripting in App Router with CSP nonces (GHSA-ffhc-5mcf-pf4q)
- Server-side request forgery in WebSocket upgrades (GHSA-c4j6-fc7j-m34r)
- Denial of Service via connection exhaustion (GHSA-mg66-mrh9-m8jx)
- Middleware/Proxy bypass vulnerabilities (多个)

**影响：** 可能导致 XSS 攻击、CSRF 绕过、DoS 攻击和敏感数据泄露。

**修复建议：**
```bash
npm update next
# 确保更新到最新版本
```

---

### 4. minimatch ReDoS 漏洞

**文件：** `/workspace/package.json`  
**传递依赖：** 通过 jest 链

**漏洞描述：**
`minimatch` 存在多个 ReDoS（正则表达式拒绝服务）漏洞：
- GHSA-3ppc-4f35-3m26
- GHSA-7r86-cg39-jmmj
- GHSA-23c5-xmqv-rm74

**影响：** 攻击者可通过特制的glob模式导致服务无响应。

**修复建议：**
```bash
npm update minimatch
# 或
npm audit fix
```

---

### 5. ws 内存泄露漏洞

**文件：** `/workspace/package.json`  
**传递依赖：** 通过 Next.js 或其他依赖

**漏洞描述：**
`ws` 包版本 8.0.0-8.20.1 存在：
- Uninitialized memory disclosure (GHSA-58qx-3vcg-4xpx)
- Memory exhaustion DoS (GHSA-96hv-2xvq-fx4p)

**影响：** 可能泄露敏感内存数据或导致服务崩溃。

**修复建议：**
```bash
npm update ws
```

---

### 6. 错误信息通过 console.error 泄露

**文件：** `/workspace/app/components/MusicVisualizer.tsx`  
**行号：** 38

**漏洞描述：**
```typescript
} catch (err) {
  console.error(err);  // 泄露完整错误对象
  setError(t.visualizer.error);
}
```
将完整的错误对象输出到控制台，可能包含敏感信息如堆栈跟踪、文件路径、第三方服务返回的详细错误信息。

**文件：** `/workspace/app/components/ImageGenerator.tsx`  
**行号：** 66

**漏洞描述：**
```typescript
} catch (err: any) {
  console.error(err);  // 泄露完整错误对象
  // ...
}
```

**影响：** 在生产环境中，用户可通过浏览器控制台获取敏感错误信息，可能帮助攻击者了解系统内部结构。

**修复建议：**
```typescript
} catch (err) {
  if (process.env.NODE_ENV === 'development') {
    console.error('[MusicVisualizer] Error:', err);
  }
  setError(t.visualizer.error);
}
```

---

### 7. 聊天机器人用户消息未进行 XSS 防护

**文件：** `/workspace/app/components/ChatMessageList.tsx`  
**行号：** 101-102

**漏洞描述：**
```typescript
{msg.role === 'user' ? (
  msg.text  // 直接渲染用户输入，未做任何转义
) : (
```

用户发送的消息直接渲染到 DOM 中，如果用户输入包含 HTML/JS 代码，浏览器会执行它们。

**影响：** 存储型 XSS 攻击，用户提交的恶意脚本可能在其他用户浏览器中执行。

**修复建议：**
```typescript
{msg.role === 'user' ? (
  <span>{msg.text}</span>  // React 会自动转义
) : (
```

---

## 严重程度：Medium（中）

### 8. AI 响应虽然有 sanitization 但仍有潜在风险

**文件：** `/workspace/app/components/ChatMessageList.tsx`  
**行号：** 22-43, 69-76

**漏洞描述：**
` sanitizeText` 函数使用正则表达式清理 AI 响应：
```typescript
safe = safe.replace(/\bon[a-z]+\s*=\s*"[^"]*"/gi, '');
safe = safe.replace(/<script[\s>][\s\S]*?<\/script>/gi, '');
```

这种基于正则的清理方式可能存在绕过：
1. 大小写混合：`onclick` vs `onCLICK`
2. URL 编码：`on&#101;rror=`
3. 嵌套标签：`<<script>script>alert(1)</script>`

虽然 `react-markdown` 默认转义 HTML，但 defense-in-depth 原则要求更严格的验证。

**影响：** 潜在的 XSS 攻击，如果 AI 模型返回恶意内容或被 prompt 注入。

**修复建议：**
考虑使用更严格的 sanitization 库如 `DOMPurify`，或限制 Markdown 渲染的标签白名单。

---

### 9. 未验证的语言参数

**文件：** `/workspace/app/services/geminiService.ts`  
**行号：** 42, 48-60

**漏洞描述：**
```typescript
export const fetchMusicTheoryData = async (
  query: string,
  language: Language = 'en'
): Promise<NoteData> => {
```

`language` 参数直接用于构造请求，虽然是 `Language` 类型，但如果类型定义被绕过或 `languageNames` 查找失败，可能导致问题。

**影响：** 相对较低，因为语言值来自类型安全的枚举。

**修复建议：**
添加额外的运行时验证：
```typescript
if (!languageNames[language]) {
  language = 'en';
}
```

---

### 10. picomatch ReDoS 漏洞

**文件：** `/workspace/package.json`  
**传递依赖：** 通过 jest-util

**漏洞描述：**
`picomatch` 存在多个 ReDoS 漏洞：
- GHSA-3v7f-55p6-f55p
- GHSA-c2c7-rcm5-vvqj

**影响：** 使用 glob 模式匹配的功能可能受到 ReDoS 影响。

**修复建议：**
```bash
npm update picomatch
```

---

### 11. postcss XSS 漏洞

**文件：** `/workspace/package.json`  
**传递依赖：** 通过 next

**漏洞描述：**
- GHSA-qx2v-qp2m-jg93: PostCSS has XSS via Unescaped `</style>` in its CSS Stringify Output

**影响：** 如果应用动态生成 CSS，可能导致 XSS。

**修复建议：**
```bash
npm update postcss
```

---

### 12. brace-expansion DoS 漏洞

**文件：** `/workspace/package.json`  
**传递依赖：** 通过 test-exclude -> glob

**漏洞描述：**
- GHSA-f886-m6hf-6m8v: Zero-step sequence causes process hang and memory exhaustion

**影响：** 特定输入可能导致服务挂起和内存耗尽。

**修复建议：**
```bash
npm update brace-expansion
```

---

### 13. 未加密的 localStorage 数据

**文件：** `/workspace/app/components/ChatBot.tsx`  
**行号：** 126

**漏洞描述：**
聊天历史直接存储在 localStorage 中，未使用任何加密：
```typescript
safeWriteStorage(CHAT_STORAGE_KEY, JSON.stringify(toStore));
```

**影响：** 如果用户设备被恶意软件感染，攻击者可以读取聊天记录。

**修复建议：**
- 对敏感数据进行加密存储
- 使用 `sessionStorage` 代替 `localStorage` 以减少数据暴露时间
- 添加数据过期机制

---

## 严重程度：Low（低）

### 14. AI Studio Key Selector 缺少外部链接安全属性

**文件：** `/workspace/app/components/AIStudioKeySelector.tsx`  
**行号：** 36-44

**漏洞描述：**
```tsx
<a 
  href="https://ai.google.dev/gemini-api/docs/billing" 
  target="_blank" 
  rel="noopener noreferrer"
  className="text-[#0071e3] hover:underline inline-flex items-center gap-1"
>
```

正确使用了 `rel="noopener noreferrer"`，这是好的实践。

**结论：** 此项无安全问题，但建议验证链接的 HTTPS 使用（已确认使用 HTTPS）。

---

### 15. 缺少 Content Security Policy (CSP)

**文件：** `/workspace/app/layout.tsx`  
**行号：** 1-88

**漏洞描述：**
未配置 CSP 头。

**影响：** 缺少 CSP 会使 XSS 攻击更容易成功。

**修复建议：**
在 `next.config.mjs` 中添加 CSP 配置或使用 Next.js 中间件设置 CSP 头。

---

### 16. MIDI API 错误信息未本地化

**文件：** `/workspace/app/hooks/useWebMIDI.ts`  
**行号：** 60, 84

**漏洞描述：**
```typescript
setError('Web MIDI API not supported in this browser.');
setError('Could not access your MIDI devices.');
```

错误信息硬编码为英文，且可能向用户暴露系统配置信息。

**影响：** 低 - 仅泄露浏览器功能信息。

**修复建议：**
将错误信息移到 i18n 系统中。

---

## 依赖漏洞总览

```
26 个漏洞 (1 low, 20 moderate, 4 high, 1 critical)

关键漏洞:
- protobufjs: 11 个漏洞 (包含 1 个 critical)
- next: 20+ 个漏洞 (包含多个 high)
- minimatch: 3 个 high
- picomatch: 3 个 high
- ws: 2 个 high
```

---

## 修复优先级建议

| 优先级 | 问题 | 估计工时 |
|--------|------|----------|
| P0 | 移除 next.config.mjs 中的 API_KEY 暴露 | 1 小时 |
| P0 | 更新 protobufjs 到安全版本 | 0.5 小时 |
| P1 | 更新 Next.js 到最新版本 | 0.5 小时 |
| P1 | 修复 console.error 错误泄露 | 1 小时 |
| P1 | 为用户消息添加 XSS 防护 | 0.5 小时 |
| P2 | 更新其他高危依赖 (minimatch, ws, picomatch) | 1 小时 |
| P2 | 考虑添加 CSP | 2 小时 |
| P3 | 加密 localStorage 数据 | 4 小时 |
| P3 | 国际化 MIDI 错误信息 | 1 小时 |

---

## 总结

本项目整体代码质量较好，有以下优点：
- 使用了 TypeScript 提供了类型安全
- 有基本的输入验证和 sanitization
- 使用了 react-markdown 等安全的库

但存在需要立即修复的严重问题，主要是 **API 密钥暴露** 和 **依赖库关键漏洞**。建议优先修复这些问题后再进行生产部署。
