// Models
export const MODEL_THEORY_LOGIC = 'gemini-3-flash-preview';
export const MODEL_CHAT_TUTOR = 'gemini-3-pro-preview';
export const MODEL_IMAGE_GEN = 'gemini-3-pro-image-preview';

// Defaults
export const DEFAULT_IMAGE_SIZE = '1K';
export const DEFAULT_ASPECT_RATIO = '1:1';

// Music Constants
export const OCTAVE_NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Translations
export const TRANSLATIONS = {
  en: {
    appTitle: "MuseTheory AI",
    nav: {
      visualizer: "Visualizer",
      chat: "Tutor Chat",
      art: "AI Art"
    },
    visualizer: {
      title: "Visual Music Theory",
      subtitle: "Enter a scale or chord to visualize it on the piano.",
      placeholder: "e.g. Eb Minor Scale, G7 Chord...",
      lucky: "Lucky",
      visualize: "Visualize",
      error: "Failed to analyze request. Please try again with a specific scale or chord.",
      notes: "Notes",
      intervals: "Intervals"
    },
    chat: {
      title: "Music Tutor AI",
      placeholder: "Ask about music theory...",
      thinking: "Thinking...",
      welcome: "Hello! I'm your AI music theory tutor. Ask me anything about harmony, counterpoint, or composition!"
    },
    art: {
      title: "AI Art Generator",
      subtitle: "Create stunning visuals of musical concepts using Gemini 3 Pro.",
      promptLabel: "Prompt",
      promptPlaceholder: "Describe the musical image you want to see... (e.g., 'A grand piano floating in a nebula')",
      sizeLabel: "Image Size",
      generate: "Generate Artwork",
      apiKeyRequired: "API Key Required",
      apiKeyDesc: "Generating high-quality 4K images requires a paid API key from a Google Cloud Project.",
      selectKey: "Select API Key",
      billingInfo: "Learn more about billing at"
    },
    footer: "MuseTheory AI. Powered by Google Gemini."
  },
  zh: {
    appTitle: "MuseTheory AI",
    nav: {
      visualizer: "乐理可视化",
      chat: "AI 导师",
      art: "AI 艺术"
    },
    visualizer: {
      title: "可视化乐理",
      subtitle: "输入音阶或和弦以在钢琴上可视化。",
      placeholder: "例如：C大调音阶, Cm7 和弦...",
      lucky: "手气不错",
      visualize: "生成",
      error: "分析失败，请尝试具体的音阶或和弦名称。",
      notes: "音符",
      intervals: "音程"
    },
    chat: {
      title: "音乐理论导师",
      placeholder: "询问关于乐理的问题...",
      thinking: "思考中...",
      welcome: "你好！我是你的 AI 乐理导师。你可以问我任何关于和声、对位或作曲的问题！"
    },
    art: {
      title: "AI 艺术生成器",
      subtitle: "使用 Gemini 3 Pro 创作令人惊叹的音乐概念视觉效果。",
      promptLabel: "提示词",
      promptPlaceholder: "描述你想看到的音乐图像... (例如：'星云中漂浮的三角钢琴')",
      sizeLabel: "图片尺寸",
      generate: "生成艺术品",
      apiKeyRequired: "需要 API 密钥",
      apiKeyDesc: "生成高质量 4K 图像需要来自 Google Cloud Project 的付费 API 密钥。",
      selectKey: "选择 API 密钥",
      billingInfo: "了解更多关于计费的信息："
    },
    footer: "MuseTheory AI. 由 Google Gemini 驱动。"
  }
};