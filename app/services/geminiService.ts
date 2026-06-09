// app/services/geminiService.ts v0.0.7
import { GoogleGenAI, Type, Chat, GenerateContentResponse } from "@google/genai";
import { MODEL_THEORY_LOGIC, MODEL_CHAT_TUTOR, MODEL_IMAGE_GEN } from "../constants";
import { NoteData, ImageSize, Language } from "../types";

// Helper to get AI instance.
// Note: We create a new instance for 'pro-image-preview' calls specifically 
// inside the component to ensure the latest key is used if the user just selected one.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchMusicTheoryData = async (query: string, language: Language = 'en'): Promise<NoteData> => {
  const ai = getAI();
  
  const languageNames: Record<Language, string> = {
    'en': 'English',
    'zh-CN': 'Chinese (Simplified)',
    'zh-TW': 'Chinese (Traditional)',
    'es': 'Spanish',
    'ar': 'Arabic',
    'fr': 'French',
    'pt-BR': 'Portuguese (Brazil)',
    'de': 'German',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ru': 'Russian'
  };
  
  const langInstruction = `Provide the description in ${languageNames[language]}.`;
  
  const response = await ai.models.generateContent({
    model: MODEL_THEORY_LOGIC,
    contents: `Analyze the following music theory request: "${query}". 
    Identify if it is a scale or a chord. 
    Return the name, the constituent notes (using sharps for accidentals), intervals relative to root, and a brief description.
    ${langInstruction}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Formal name of the scale or chord" },
          notes: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Array of notes in the scale/chord, e.g. ['C', 'E', 'G']"
          },
          intervals: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "Array of intervals, e.g. ['1', '3', '5']"
          },
          description: { type: Type.STRING, description: "A short educational description" }
        },
        required: ["name", "notes", "intervals", "description"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No data returned from Gemini");
  return JSON.parse(text) as NoteData;
};

// Chat instance management
let chatSession: Chat | null = null;

export const sendMessageToTutorStream = async function*(message: string, history: {role: string, parts: {text: string}[]}[] = []): AsyncGenerator<string, void, unknown> {
  const ai = getAI();
  
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: MODEL_CHAT_TUTOR,
      history: history,
      config: {
        systemInstruction: "You are an expert music theory professor. You are helpful, encouraging, and precise. Keep answers concise but informative.",
      }
    });
  }

  const resultStream = await chatSession.sendMessageStream({ message });
  for await (const chunk of resultStream) {
    const c = chunk as GenerateContentResponse;
    if (c.text) {
      yield c.text;
    }
  }
};

export const generateMusicImage = async (prompt: string, size: ImageSize): Promise<string> => {
  // IMPORTANT: For Veo/Pro-Image, we must ensure the key is selected and use a fresh instance.
  // The checking logic is in the component, but we create the instance here.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const response = await ai.models.generateContent({
    model: MODEL_IMAGE_GEN,
    contents: {
      parts: [{ text: prompt }]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size
      }
    }
  });

  // Extract image
  // Pro-image model returns parts. We need to find the inlineData part.
  const parts = response.candidates?.[0]?.content?.parts;
  if (!parts) throw new Error("No content generated");

  for (const part of parts) {
    if (part.inlineData && part.inlineData.data) {
      return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data found in response");
};