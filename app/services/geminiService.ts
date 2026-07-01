// app/services/geminiService.ts v0.0.8
import { GoogleGenAI, Type, Chat, GenerateContentResponse } from '@google/genai';
import { MODEL_THEORY_LOGIC, MODEL_CHAT_TUTOR, MODEL_IMAGE_GEN } from '../constants';
import { NoteData, ImageSize, Language } from '../types';

const MAX_TEXT_LENGTH = 200_000;
const DEFAULT_RETRY_COUNT = 2;

// Best-effort input sanitization: cap length and strip control characters
// that are unlikely to be part of a legitimate music-theory prompt.
const sanitizePrompt = (value: string): string => {
  if (typeof value !== 'string') return '';
  let safe = value.replace(/[\u0000-\u001F\u007F]/g, ' ');
  if (safe.length > MAX_TEXT_LENGTH) {
    safe = safe.slice(0, MAX_TEXT_LENGTH);
  }
  return safe.trim();
};

const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

// getAI still relies on process.env.API_KEY.  It is provided at build
// time by the hosting platform.  Keys are NOT exposed to the browser from
// this module directly - this file is imported from client components that
// are compiled by Next.js, and process.env will be inlined at build.
const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[geminiService] API_KEY is not configured.  Set the NEXT_PUBLIC_API_KEY or API_KEY environment variable.');
    }
  }
  return new GoogleGenAI({ apiKey: apiKey ?? '' });
};

export const fetchMusicTheoryData = async (
  query: string,
  language: Language = 'en'
): Promise<NoteData> => {
  const safeQuery = sanitizePrompt(query);
  if (!safeQuery) {
    throw new Error('Please enter a scale or chord to visualize.');
  }

  const languageNames: Record<Language, string> = {
    en: 'English',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    es: 'Spanish',
    ar: 'Arabic',
    fr: 'French',
    'pt-BR': 'Portuguese (Brazil)',
    de: 'German',
    ja: 'Japanese',
    ko: 'Korean',
    ru: 'Russian',
  };

  const langInstruction = `Provide the description in ${languageNames[language]}.`;

  let lastError: unknown;
  for (let attempt = 0; attempt <= DEFAULT_RETRY_COUNT; attempt += 1) {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: MODEL_THEORY_LOGIC,
        contents: `Analyze the following music theory request: "${safeQuery}".
    Identify if it is a scale or a chord.
    Return the name, the constituent notes (using sharps for accidentals), intervals relative to root, and a brief description.
    ${langInstruction}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              name: {
                type: Type.STRING,
                description: 'Formal name of the scale or chord',
              },
              notes: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of notes in the scale/chord, e.g. ['C', 'E', 'G']",
              },
              intervals: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Array of intervals, e.g. ['1', '3', '5']",
              },
              description: {
                type: Type.STRING,
                description: 'A short educational description',
              },
            },
            required: ['name', 'notes', 'intervals', 'description'],
          },
        },
      });

      const text = response.text;
      if (!text) {
        throw new Error('No data returned from Gemini');
      }
      const parsed = JSON.parse(text);
      if (
        parsed &&
        typeof parsed.name === 'string' &&
        Array.isArray(parsed.notes) &&
        Array.isArray(parsed.intervals) &&
        typeof parsed.description === 'string'
      ) {
        return parsed as NoteData;
      }
      throw new Error('Unexpected response shape from Gemini');
    } catch (err) {
      lastError = err;
      if (attempt < DEFAULT_RETRY_COUNT) {
        await wait(500 * (attempt + 1));
      }
    }
  }
  if (lastError instanceof Error) {
    throw lastError;
  }
  throw new Error('Failed to fetch music theory data');
};

// Chat instance management
let chatSession: Chat | null = null;

export const sendMessageToTutorStream = async function* (
  message: string,
  history: { role: string; parts: { text: string }[] }[] = []
): AsyncGenerator<string, void, unknown> {
  const safeMessage = sanitizePrompt(message);
  if (!safeMessage) {
    throw new Error('Please enter a valid question.');
  }

  const ai = getAI();

  if (!chatSession) {
    chatSession = ai.chats.create({
      model: MODEL_CHAT_TUTOR,
      history: history,
      config: {
        systemInstruction:
          'You are an expert music theory professor. You are helpful, encouraging, and precise. Keep answers concise but informative.',
      },
    });
  }

  const resultStream = await chatSession.sendMessageStream({
    message: safeMessage,
  });
  for await (const chunk of resultStream) {
    const c = chunk as GenerateContentResponse;
    if (c && typeof c.text === 'string') {
      yield c.text;
    }
  }
};

export const generateMusicImage = async (
  prompt: string,
  size: ImageSize
): Promise<string> => {
  const safePrompt = sanitizePrompt(prompt);
  if (!safePrompt) {
    throw new Error('Please enter a valid image prompt.');
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY ?? '' });

  const response = await ai.models.generateContent({
    model: MODEL_IMAGE_GEN,
    contents: {
      parts: [{ text: safePrompt }],
    },
    config: {
      imageConfig: {
        aspectRatio: '1:1',
        imageSize: size,
      },
    },
  });

  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error('No content generated');

  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      return `data:${part.inlineData.mimeType || 'image/png'};base64,${
        part.inlineData.data
      }`;
    }
  }

  throw new Error('No image data found in response');
};
