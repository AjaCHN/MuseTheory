export interface NoteData {
  name: string;
  notes: string[];
  intervals: string[];
  description: string;
}



export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export type ImageSize = '1K' | '2K' | '4K';

export interface ImageConfig {
  aspectRatio: string;
  imageSize: ImageSize;
}

export interface GeneratedImage {
  url: string;
  prompt: string;
}

export type Language = 'en' | 'zh';