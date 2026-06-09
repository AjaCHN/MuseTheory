// app/constants.ts v0.0.2
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
    appTitle: "MuseTheory AI v0.0.7",
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
      welcome: "Hello! I'm your AI music theory tutor. Ask me anything about harmony, counterpoint, or composition!",
      clear: "Clear Chat"
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
      billingInfo: "Learn more about billing at",
      download: "Download"
    },
    footer: "MuseTheory AI. Powered by Google Gemini."
  },
  'zh-CN': {
    appTitle: "MuseTheory AI v0.0.7",
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
      welcome: "你好！我是你的 AI 乐理导师。你可以问我任何关于和声、对位或作曲的问题！",
      clear: "清空对话"
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
      billingInfo: "了解更多关于计费的信息：",
      download: "下载"
    },
    footer: "MuseTheory AI. 由 Google Gemini 驱动。"
  },
  'zh-TW': {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "樂理視覺化",
      chat: "AI 導師",
      art: "AI 藝術"
    },
    visualizer: {
      title: "視覺化樂理",
      subtitle: "輸入音階或和弦以在鋼琴上視覺化。",
      placeholder: "例如：C大調音階, Cm7 和弦...",
      lucky: "好手氣",
      visualize: "生成",
      error: "分析失敗，請嘗試具體的音階或和弦名稱。",
      notes: "音符",
      intervals: "音程"
    },
    chat: {
      title: "音樂理論導師",
      placeholder: "詢問關於樂理的問題...",
      thinking: "思考中...",
      welcome: "你好！我是你的 AI 樂理導師。你可以問我任何關於和聲、對位或作曲的問題！",
      clear: "清空對話"
    },
    art: {
      title: "AI 藝術生成器",
      subtitle: "使用 Gemini 3 Pro 創作令人驚嘆的音樂概念視覺效果。",
      promptLabel: "提示詞",
      promptPlaceholder: "描述你想看到的音樂圖像... (例如：'星雲中漂浮的三角鋼琴')",
      sizeLabel: "圖片尺寸",
      generate: "生成藝術品",
      apiKeyRequired: "需要 API 密鑰",
      apiKeyDesc: "生成高品質 4K 圖像需要來自 Google Cloud Project 的付費 API 密鑰。",
      selectKey: "選擇 API 密鑰",
      billingInfo: "了解更多關於計費的資訊：",
      download: "下載"
    },
    footer: "MuseTheory AI. 由 Google Gemini 驅動。"
  },
  es: {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "Visualizador",
      chat: "Tutor Chat",
      art: "Arte AI"
    },
    visualizer: {
      title: "Teoría Musical Visual",
      subtitle: "Introduce una escala o acorde para visualizarlo en el piano.",
      placeholder: "ej. Escala Menor Eb, Acorde G7...",
      lucky: "Voy a tener suerte",
      visualize: "Visualizar",
      error: "Error al analizar la solicitud. Inténtalo de nuevo con una escala o acorde específico.",
      notes: "Notas",
      intervals: "Intervalos"
    },
    chat: {
      title: "Tutor de Música AI",
      placeholder: "Pregunta sobre teoría musical...",
      thinking: "Pensando...",
      welcome: "¡Hola! Soy tu tutor de teoría musical AI. ¡Pregúntame cualquier cosa sobre armonía, contrapunto o composición!",
      clear: "Limpiar Chat"
    },
    art: {
      title: "Generador de Arte AI",
      subtitle: "Crea imágenes impresionantes de conceptos musicales usando Gemini 3 Pro.",
      promptLabel: "Indicación",
      promptPlaceholder: "Describe la imagen musical que quieres ver... (ej., 'Un piano de cola flotando en una nebulosa')",
      sizeLabel: "Tamaño de Imagen",
      generate: "Generar Obra de Arte",
      apiKeyRequired: "Se Requiere Clave API",
      apiKeyDesc: "Generar imágenes 4K de alta calidad requiere una clave API de pago de un Proyecto de Google Cloud.",
      selectKey: "Seleccionar Clave API",
      billingInfo: "Más información sobre la facturación en",
      download: "Descargar"
    },
    footer: "MuseTheory AI. Desarrollado por Google Gemini."
  },
  ar: {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "المتخيل",
      chat: "محادثة المعلم",
      art: "فن الذكاء الاصطناعي"
    },
    visualizer: {
      title: "نظرية الموسيقى المرئية",
      subtitle: "أدخل سلمًا موسيقيًا أو وترًا لتخيله على البيانو.",
      placeholder: "مثل: سلم مي بيمول الصغير، وتر صول 7...",
      lucky: "ضربة حظ",
      visualize: "تخيل",
      error: "فشل في تحليل الطلب. يرجى المحاولة مرة أخرى باستخدام سلم موسيقي أو وتر محدد.",
      notes: "ملاحظات",
      intervals: "فترات"
    },
    chat: {
      title: "معلم الموسيقى بالذكاء الاصطناعي",
      placeholder: "اسأل عن نظرية الموسيقى...",
      thinking: "يفكر...",
      welcome: "مرحبًا! أنا معلم نظرية الموسيقى بالذكاء الاصطناعي الخاص بك. اسألني أي شيء عن التناغم، أو الطباق، أو التأليف!",
      clear: "مسح المحادثة"
    },
    art: {
      title: "مولد الفن بالذكاء الاصطناعي",
      subtitle: "أنشئ صورًا مذهلة للمفاهيم الموسيقية باستخدام Gemini 3 Pro.",
      promptLabel: "موجه",
      promptPlaceholder: "صف الصورة الموسيقية التي تريد رؤيتها... (مثل، 'بيانو كبير يطفو في سديم')",
      sizeLabel: "حجم الصورة",
      generate: "توليد عمل فني",
      apiKeyRequired: "مفتاح API مطلوب",
      apiKeyDesc: "يتطلب إنشاء صور 4K عالية الجودة مفتاح API مدفوعًا من مشروع Google Cloud.",
      selectKey: "حدد مفتاح API",
      billingInfo: "تعرف على المزيد حول الفواتير في",
      download: "تحميل"
    },
    footer: "MuseTheory AI. مدعوم من Google Gemini."
  },
  fr: {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "Visualiseur",
      chat: "Tuteur Chat",
      art: "Art IA"
    },
    visualizer: {
      title: "Théorie Musicale Visuelle",
      subtitle: "Entrez une gamme ou un accord pour le visualiser sur le piano.",
      placeholder: "ex. Gamme Mineure Mib, Accord Sol7...",
      lucky: "J'ai de la chance",
      visualize: "Visualiser",
      error: "Échec de l'analyse de la demande. Veuillez réessayer avec une gamme ou un accord spécifique.",
      notes: "Notes",
      intervals: "Intervalles"
    },
    chat: {
      title: "Tuteur de Musique IA",
      placeholder: "Posez des questions sur la théorie musicale...",
      thinking: "En train de penser...",
      welcome: "Bonjour ! Je suis votre tuteur de théorie musicale IA. Demandez-moi n'importe quoi sur l'harmonie, le contrepoint ou la composition !",
      clear: "Effacer le chat"
    },
    art: {
      title: "Générateur d'Art IA",
      subtitle: "Créez des visuels époustouflants de concepts musicaux en utilisant Gemini 3 Pro.",
      promptLabel: "Invite",
      promptPlaceholder: "Décrivez l'image musicale que vous souhaitez voir... (ex., 'Un piano à queue flottant dans une nébuleuse')",
      sizeLabel: "Taille de l'Image",
      generate: "Générer une Œuvre d'Art",
      apiKeyRequired: "Clé API Requise",
      apiKeyDesc: "La génération d'images 4K de haute qualité nécessite une clé API payante d'un projet Google Cloud.",
      selectKey: "Sélectionner la Clé API",
      billingInfo: "En savoir plus sur la facturation sur",
      download: "Télécharger"
    },
    footer: "MuseTheory AI. Propulsé par Google Gemini."
  },
  'pt-BR': {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "Visualizador",
      chat: "Tutor Chat",
      art: "Arte IA"
    },
    visualizer: {
      title: "Teoria Musical Visual",
      subtitle: "Insira uma escala ou acorde para visualizá-lo no piano.",
      placeholder: "ex. Escala Menor Mib, Acorde Sol7...",
      lucky: "Estou com sorte",
      visualize: "Visualizar",
      error: "Falha ao analisar a solicitação. Tente novamente com uma escala ou acorde específico.",
      notes: "Notas",
      intervals: "Intervalos"
    },
    chat: {
      title: "Tutor de Música IA",
      placeholder: "Pergunte sobre teoria musical...",
      thinking: "Pensando...",
      welcome: "Olá! Sou seu tutor de teoria musical IA. Pergunte-me qualquer coisa sobre harmonia, contraponto ou composição!",
      clear: "Limpar Chat"
    },
    art: {
      title: "Gerador de Arte IA",
      subtitle: "Crie visuais impressionantes de conceitos musicais usando o Gemini 3 Pro.",
      promptLabel: "Prompt",
      promptPlaceholder: "Descreva a imagem musical que você deseja ver... (ex., 'Um piano de cauda flutuando em uma nebulosa')",
      sizeLabel: "Tamanho da Imagem",
      generate: "Gerar Arte",
      apiKeyRequired: "Chave API Necessária",
      apiKeyDesc: "A geração de imagens 4K de alta qualidade requer uma chave API paga de um Projeto do Google Cloud.",
      selectKey: "Selecionar Chave API",
      billingInfo: "Saiba mais sobre faturamento em",
      download: "Baixar"
    },
    footer: "MuseTheory AI. Desenvolvido por Google Gemini."
  },
  de: {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "Visualisierer",
      chat: "Tutor Chat",
      art: "KI-Kunst"
    },
    visualizer: {
      title: "Visuelle Musiktheorie",
      subtitle: "Geben Sie eine Tonleiter oder einen Akkord ein, um ihn auf dem Klavier zu visualisieren.",
      placeholder: "z.B. Es-Moll-Tonleiter, G7-Akkord...",
      lucky: "Auf gut Glück",
      visualize: "Visualisieren",
      error: "Fehler beim Analysieren der Anfrage. Bitte versuchen Sie es mit einer bestimmten Tonleiter oder einem bestimmten Akkord erneut.",
      notes: "Noten",
      intervals: "Intervalle"
    },
    chat: {
      title: "KI-Musiktutor",
      placeholder: "Fragen Sie nach Musiktheorie...",
      thinking: "Denke nach...",
      welcome: "Hallo! Ich bin Ihr KI-Musiktheorie-Tutor. Fragen Sie mich alles über Harmonie, Kontrapunkt oder Komposition!",
      clear: "Chat leeren"
    },
    art: {
      title: "KI-Kunstgenerator",
      subtitle: "Erstellen Sie atemberaubende Visualisierungen musikalischer Konzepte mit Gemini 3 Pro.",
      promptLabel: "Eingabeaufforderung",
      promptPlaceholder: "Beschreiben Sie das musikalische Bild, das Sie sehen möchten... (z. B. 'Ein Flügel, der in einem Nebel schwebt')",
      sizeLabel: "Bildgröße",
      generate: "Kunstwerk generieren",
      apiKeyRequired: "API-Schlüssel erforderlich",
      apiKeyDesc: "Die Generierung hochwertiger 4K-Bilder erfordert einen kostenpflichtigen API-Schlüssel aus einem Google Cloud-Projekt.",
      selectKey: "API-Schlüssel auswählen",
      billingInfo: "Weitere Informationen zur Abrechnung unter",
      download: "Herunterladen"
    },
    footer: "MuseTheory AI. Unterstützt von Google Gemini."
  },
  ja: {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "ビジュアライザー",
      chat: "AIチューター",
      art: "AIアート"
    },
    visualizer: {
      title: "視覚的な音楽理論",
      subtitle: "音階またはコードを入力して、ピアノで視覚化します。",
      placeholder: "例：Ebマイナースケール、G7コード...",
      lucky: "I'm Feeling Lucky",
      visualize: "視覚化",
      error: "リクエストの分析に失敗しました。特定の音階またはコードで再試行してください。",
      notes: "音符",
      intervals: "音程"
    },
    chat: {
      title: "音楽理論AIチューター",
      placeholder: "音楽理論について質問する...",
      thinking: "考え中...",
      welcome: "こんにちは！私はあなたのAI音楽理論チューターです。和声、対位法、作曲について何でも聞いてください！",
      clear: "チャットをクリア"
    },
    art: {
      title: "AIアートジェネレーター",
      subtitle: "Gemini 3 Proを使用して、音楽の概念の素晴らしいビジュアルを作成します。",
      promptLabel: "プロンプト",
      promptPlaceholder: "見たい音楽の画像について説明してください...（例：「星雲に浮かぶグランドピアノ」）",
      sizeLabel: "画像サイズ",
      generate: "アートワークを生成",
      apiKeyRequired: "APIキーが必要です",
      apiKeyDesc: "高品質の4K画像を生成するには、Google Cloudプロジェクトの有料APIキーが必要です。",
      selectKey: "APIキーを選択",
      billingInfo: "請求の詳細についてはこちら：",
      download: "ダウンロード"
    },
    footer: "MuseTheory AI. Powered by Google Gemini."
  },
  ko: {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "시각화 도구",
      chat: "튜터 채팅",
      art: "AI 아트"
    },
    visualizer: {
      title: "시각적 음악 이론",
      subtitle: "음계 또는 코드를 입력하여 피아노에서 시각화합니다.",
      placeholder: "예: Eb 마이너 스케일, G7 코드...",
      lucky: "I'm Feeling Lucky",
      visualize: "시각화",
      error: "요청을 분석하지 못했습니다. 특정 음계 또는 코드로 다시 시도하십시오.",
      notes: "음표",
      intervals: "음정"
    },
    chat: {
      title: "음악 튜터 AI",
      placeholder: "음악 이론에 대해 질문하기...",
      thinking: "생각 중...",
      welcome: "안녕하세요! 저는 당신의 AI 음악 이론 튜터입니다. 화성학, 대위법 또는 작곡에 대해 무엇이든 물어보세요!",
      clear: "채팅 지우기"
    },
    art: {
      title: "AI 아트 생성기",
      subtitle: "Gemini 3 Pro를 사용하여 음악적 개념의 놀라운 시각 자료를 만듭니다.",
      promptLabel: "프롬프트",
      promptPlaceholder: "보고 싶은 음악적 이미지를 설명하십시오... (예: '성운에 떠 있는 그랜드 피아노')",
      sizeLabel: "이미지 크기",
      generate: "아트워크 생성",
      apiKeyRequired: "API 키 필요",
      apiKeyDesc: "고품질 4K 이미지를 생성하려면 Google Cloud 프로젝트의 유료 API 키가 필요합니다.",
      selectKey: "API 키 선택",
      billingInfo: "결제에 대한 자세한 정보:",
      download: "다운로드"
    },
    footer: "MuseTheory AI. Powered by Google Gemini."
  },
  ru: {
    appTitle: "MuseTheory AI v0.0.7",
    nav: {
      visualizer: "Визуализатор",
      chat: "Чат с репетитором",
      art: "ИИ Арт"
    },
    visualizer: {
      title: "Визуальная теория музыки",
      subtitle: "Введите гамму или аккорд, чтобы визуализировать их на пианино.",
      placeholder: "напр., Ми-бемоль минорная гамма, аккорд Соль7...",
      lucky: "Мне повезет",
      visualize: "Визуализировать",
      error: "Не удалось проанализировать запрос. Пожалуйста, попробуйте еще раз с конкретной гаммой или аккордом.",
      notes: "Ноты",
      intervals: "Интервалы"
    },
    chat: {
      title: "ИИ репетитор по музыке",
      placeholder: "Спросите о теории музыки...",
      thinking: "Думаю...",
      welcome: "Привет! Я ваш ИИ-репетитор по теории музыки. Спрашивайте меня о чем угодно: гармонии, контрапункте или композиции!",
      clear: "Очистить чат"
    },
    art: {
      title: "Генератор ИИ-арта",
      subtitle: "Создавайте потрясающие визуализации музыкальных концепций с помощью Gemini 3 Pro.",
      promptLabel: "Промпт",
      promptPlaceholder: "Опишите музыкальный образ, который вы хотите увидеть... (напр., 'Рояль, парящий в туманности')",
      sizeLabel: "Размер изображения",
      generate: "Сгенерировать арт",
      apiKeyRequired: "Требуется API-ключ",
      apiKeyDesc: "Для создания высококачественных 4K-изображений требуется платный API-ключ из проекта Google Cloud.",
      selectKey: "Выбрать API-ключ",
      billingInfo: "Узнайте больше о выставлении счетов на",
      download: "Скачать"
    },
    footer: "MuseTheory AI. При поддержке Google Gemini."
  }
};