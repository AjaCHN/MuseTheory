'use client';

import React, { useState, useEffect } from 'react';
import { generateMusicImage } from '../services/geminiService';
import { ImageSize, GeneratedImage } from '../types';
import { Loader2, Image as ImageIcon, Key, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

// Define the interface locally for type safety when casting
interface AIStudioClient {
  hasSelectedApiKey: () => Promise<boolean>;
  openSelectKey: () => Promise<void>;
}

const ImageGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState<ImageSize>('1K');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState<boolean>(false);

  useEffect(() => {
    checkKeyStatus();
  }, []);

  const getAIStudio = (): AIStudioClient | undefined => {
    if (typeof window === 'undefined') return undefined;
    return (window as any).aistudio as AIStudioClient | undefined;
  };

  const checkKeyStatus = async () => {
    const aiStudio = getAIStudio();
    if (aiStudio?.hasSelectedApiKey) {
      const selected = await aiStudio.hasSelectedApiKey();
      setHasKey(selected);
    } else {
      // If we aren't in the specific environment with window.aistudio, 
      // we assume process.env.API_KEY is handled or we can't do anything about it.
      // But adhering to the prompt, we simulate the state based on the object presence.
      setHasKey(true); 
    }
  };

  const handleSelectKey = async () => {
    const aiStudio = getAIStudio();
    if (aiStudio?.openSelectKey) {
      await aiStudio.openSelectKey();
      // Assume success as per instructions to avoid race conditions
      setHasKey(true);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateMusicImage(prompt, size);
      setGeneratedImage({
        url: imageUrl,
        prompt: prompt
      });
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
        // Reset key selection if we get a 404-ish error implying bad key project
        setHasKey(false);
        setError("API Key issue. Please select a valid paid project key.");
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const aiStudio = getAIStudio();
  if (!hasKey && aiStudio) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-8 bg-white rounded-2xl shadow-xl border border-indigo-100 text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto">
          <Key className="w-8 h-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{t.art.apiKeyRequired}</h2>
          <p className="text-slate-600">
            {t.art.apiKeyDesc}
          </p>
        </div>
        
        <button
          onClick={handleSelectKey}
          className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
        >
          {t.art.selectKey}
        </button>

        <p className="text-xs text-slate-500 pt-4 border-t border-slate-100">
          {t.art.billingInfo}{" "}
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-indigo-600 hover:underline inline-flex items-center gap-1"
          >
            ai.google.dev/gemini-api/docs/billing
            <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800">{t.art.title}</h2>
        <p className="text-slate-600">{t.art.subtitle}</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-100">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{t.art.promptLabel}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.art.promptPlaceholder}
              className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none h-32 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">{t.art.sizeLabel}</label>
            <div className="flex gap-4">
              {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`
                    flex-1 py-2 px-4 rounded-lg border font-medium transition-all
                    ${size === s 
                      ? 'bg-purple-600 text-white border-purple-600' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}
                  `}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !prompt.trim()}
            className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" /> : <ImageIcon />}
            {t.art.generate}
          </button>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-center border border-red-100">
          {error}
        </div>
      )}

      {generatedImage && (
        <div className="bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-fade-in">
          <div className="aspect-square w-full relative rounded-xl overflow-hidden bg-slate-100">
            <img 
              src={generatedImage.url} 
              alt={generatedImage.prompt} 
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mt-4 text-center text-slate-500 text-sm italic">"{generatedImage.prompt}"</p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;