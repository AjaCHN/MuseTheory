// app/components/ImageGenerator.tsx v0.0.3
'use client';

import React, { useState, useEffect } from 'react';
import { generateMusicImage } from '../services/geminiService';
import { ImageSize, GeneratedImage } from '../types';
import { Loader2, Image as ImageIcon, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AIStudioKeySelector from './AIStudioKeySelector';

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
      setHasKey(true); 
    }
  };

  const handleSelectKey = async () => {
    const aiStudio = getAIStudio();
    if (aiStudio?.openSelectKey) {
      await aiStudio.openSelectKey();
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
      setGeneratedImage({ url: imageUrl, prompt: prompt });
    } catch (err: any) {
      console.error(err);
      if (err.message && err.message.includes("Requested entity was not found")) {
        setHasKey(false);
        setError("API Key issue. Please select a valid paid project key.");
      } else {
        setError("Failed to generate image. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const a = document.createElement('a');
    a.href = generatedImage.url;
    a.download = `musetheory-art-${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const aiStudio = getAIStudio();
  if (!hasKey && aiStudio) {
    return <AIStudioKeySelector onSelectKey={handleSelectKey} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t.art.title}</h2>
        <p className="text-slate-600 dark:text-slate-400">{t.art.subtitle}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md border border-slate-100 dark:border-slate-700">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.art.promptLabel}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.art.promptPlaceholder}
              className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none h-32 resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.art.sizeLabel}</label>
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
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'}
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
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-center border border-red-100 dark:border-red-800">
          {error}
        </div>
      )}

      {generatedImage && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 animate-fade-in relative group">
          <div className="aspect-square w-full relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
            <img src={generatedImage.url} alt={generatedImage.prompt} className="w-full h-full object-contain" />
            <button
              onClick={handleDownload}
              className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-slate-800/90 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2"
              title={t.art.download}
            >
              <Download className="w-5 h-5" />
              <span className="font-medium pr-1">{t.art.download}</span>
            </button>
          </div>
          <p className="mt-4 text-center text-slate-500 dark:text-slate-400 text-sm italic">"{generatedImage.prompt}"</p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;