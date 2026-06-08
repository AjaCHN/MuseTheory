# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v0.0.7] - 2026-06-08

### Added
- 全新 Apple 风格设计系统：色彩系统（蓝色、绿色、橙色、紫色）
- 自定义 CSS 类：search-container、info-card、chat-container 等
- 新增组件版本号同步至 v0.0.7
- 优化原型设计，包含核心功能卡片展示
- 删除旧版原型文件（prototype_v0.0.5.html）
- 删除未使用的 Jest 配置文件
- 响应式布局优化（手机端、平板端）

### Changed
- 重构 VisualizerSearch 组件，使用 Apple 风格输入框和按钮
- 重构 VisualizerInfo 组件，使用 info-card 和 info-button 样式
- 重构 MusicVisualizer 组件，优化 Hero 区域和卡片动画
- 重构 ChatBot、ChatInput、ChatMessageList 组件
- 更新 style.css，添加完整的 Apple 风格样式
- 统一所有组件圆角为 16px-32px 系统
- 优化卡片悬停动画（translateY-2px + 阴影增强）
- 更新原型设计文档至 v0.0.7

### Fixed
- 修复 ChatMessageList 头像尺寸不一致问题
- 优化聊天输入框聚焦样式
- 统一所有按钮悬停效果为 scale(1.05)

## [v0.0.6] - 2026-06-08

### Added
- 引入 Apple 极简设计风格，优化整体视觉呈现
- 新增毛玻璃效果导航栏（backdrop-blur-xl）
- 新增圆润卡片设计（20px 圆角）
- 新增流畅动画过渡效果（hover、focus、状态切换）
- 更新原型设计文档，包含完整的设计系统规范

### Changed
- 优化 Navigation 组件：纯黑激活态、圆角按钮、Logo 渐变效果
- 优化 MusicVisualizer 组件：大标题 Hero 区域、卡片阴影系统
- 优化 ChatBot 组件：圆角容器、图标渐变背景
- 更新 SPEC.md 规范文档，添加 Apple 风格设计规范章节
- 更新原型设计文档（prototype.html）至 v0.0.6

### Fixed
- 修复组件版本号不一致问题
- 修复响应式布局断点定义

## [v0.0.5]

### Changed
- Refactored large components (MusicVisualizer, ImageGenerator, ChatBot) into smaller, more maintainable sub-components.
- Improved code organization and reduced token consumption.
- Enhanced dark mode support for all new sub-components.

## [v0.0.4]

### Fixed
- Resolved hydration mismatch errors by optimizing layout structure and Footer component.
- Added explicit Suspense boundaries for better loading states.

## [v0.0.3]

### Added
- Web MIDI API support for external keyboard integration.
- Sheet music visualization using ABC notation.
- Audio recording and export capabilities.
- Streaming AI responses for real-time chat experience.
- Dark/Light mode toggle with `next-themes`.
- Multi-touch support for the virtual piano.
- Global state management with Zustand.
- PWA support with manifest.json.

## [v0.0.2]

### Added
- Multi-language support (11 languages).
- Download button for generated images.
- Clear chat button.
- Markdown support for chat messages.
- SEO and GEO meta tags.

### Changed
- Refactored directory structure (moved components, services, contexts, types to `app/`).
- Updated app title with version number.

## [v0.0.1]

### Added
- Initial release.
- Music Visualizer feature.
- AI Tutor Chat feature.
- AI Art Generator feature.
