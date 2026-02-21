import { GoogleGenAI, Type, Chat } from "@google/genai";
import { MODEL_THEORY_LOGIC, MODEL_CHAT_TUTOR, MODEL_IMAGE_GEN } from "../constants";
import { NoteData, ImageSize, Language } from "../types";

// Helper to get AI instance.
// Note: We create a new instance for 'pro-image-preview' calls specifically 
// inside the component to ensure the latest key is used if the user just selected one.
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchMusicTheoryData = async (query: string, language: Language = 'en'): Promise<NoteData> => {
  const ai = getAI();
  const langInstruction = language === 'zh' ? "Provide the description in Chinese (Simplified)." : "Provide the description in English.";
  
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

export const sendMessageToTutor = async (message: string, history: {role: string, parts: {text: string}[]}[] = []): Promise<string> => {
  const ai = getAI();
  
  // Re-initialize chat if it doesn't exist or we want to ensure fresh config
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: MODEL_CHAT_TUTOR,
      history: history, // Initialize with provided history if strictly needed, though single session is better
      config: {
        systemInstruction: "You are an expert music theory professor. You are helpful, encouraging, and precise. Keep answers concise but informative.",
      }
    });
  }

  const result = await chatSession.sendMessage({ message });
  return result.text || "I couldn't generate a response.";
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