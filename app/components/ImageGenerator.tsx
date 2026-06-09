// app/components/ImageGenerator.tsx v0.0.8 - Apple Style
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
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Apple-style Hero Section */}
      {!generatedImage && !loading && (
        <div className="text-center space-y-8 py-16 animate-fade-in">
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.art.title}
          </h2>
          <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t.art.subtitle}
          </p>
        </div>
      )}

      {/* Form Card - Apple Style */}
      <div className="info-card animate-fade-in">
        <form onSubmit={handleGenerate} className="space-y-8">
          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.art.promptLabel}</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.art.promptPlaceholder}
              className="w-full p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-600/30 bg-slate-100 dark:bg-slate-700/50 text-slate-900 dark:text-slate-100 text-lg focus:border-[#0071e3] focus:shadow-[0_0_0_4px_rgba(0,113,227,0.15)] focus:bg-white dark:focus:bg-slate-800/80 outline-none h-32 resize-none transition-all duration-300"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{t.art.sizeLabel}</label>
            <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-700/50 rounded-2xl">
              {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`
                    flex-1 py-3.5 px-4 rounded-xl font-semibold text-base transition-all duration-300
                    ${size === s 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-[0_2px_16px_rgba(0,0,0,0.1)]' 
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'}
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
            className="info-btn primary w-full py-5 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
            {t.art.generate}
          </button>
        </form>
      </div>

      {/* Error Messages - Apple Style */}
      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-3xl text-center border border-red-100 dark:border-red-800 animate-fade-in">
          {error}
        </div>
      )}

      {/* Result Card - Apple Style */}
      {generatedImage && (
        <div className="info-card animate-fade-in relative group">
          <div className="aspect-square w-full relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900/50">
            <img src={generatedImage.url} alt={generatedImage.prompt} className="w-full h-full object-contain" />
            <button
              onClick={handleDownload}
              className="info-btn absolute top-6 right-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-800 dark:text-slate-100 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
              title={t.art.download}
            >
              <Download className="w-5 h-5" />
              <span className="font-semibold">{t.art.download}</span>
            </button>
          </div>
          <p className="mt-6 text-center text-slate-500 dark:text-slate-400 text-base italic">"{generatedImage.prompt}"</p>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
