// app/components/ImageGenerator.tsx v0.0.9 - Minimal Editorial
'use client';

import React, { useState, useEffect } from 'react';
import { generateMusicImage } from '../services/geminiService';
import { ImageSize, GeneratedImage } from '../types';
import { Loader2, Image as ImageIcon, Download, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import AIStudioKeySelector from './AIStudioKeySelector';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

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
    } catch (err: unknown) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[ImageGenerator] generateMusicImage failed:', err instanceof Error ? err.message : String(err));
      }
      if (err instanceof Error && err.message.includes("Requested entity was not found")) {
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
    <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
      {/* Hero Section - Editorial Style */}
      {!generatedImage && !loading && (
        <div className="text-center space-y-6 py-12 sm:py-20 animate-fade-up">
          <h1 className="display text-5xl sm:text-6xl md:text-7xl text-foreground">
            {t.art.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto body-serif">
            {t.art.subtitle}
          </p>
        </div>
      )}

      {/* Form Card */}
      <Card className="animate-fade-up stagger-1 border-border/60">
        <CardHeader>
          <CardTitle className="heading-serif text-2xl font-medium">{t.art.promptLabel}</CardTitle>
          <CardDescription>{t.art.promptPlaceholder}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerate} className="space-y-6">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.art.promptPlaceholder}
              className="min-h-32 resize-none rounded-lg text-base"
            />

            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground">{t.art.sizeLabel}</label>
              <Tabs value={size} onValueChange={(v) => setSize(v as ImageSize)} className="w-full">
                <TabsList className="w-full grid grid-cols-3">
                  {(['1K', '2K', '4K'] as ImageSize[]).map((s) => (
                    <TabsTrigger key={s} value={s} className="rounded-lg">
                      {s}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <Button
              type="submit"
              disabled={loading || !prompt.trim()}
              className="w-full h-12 rounded-lg font-medium"
            >
              {loading ? (
                <Loader2 className="animate-spin" data-icon="inline-start" />
              ) : (
                <Sparkles data-icon="inline-start" />
              )}
              {t.art.generate}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Card className="animate-fade-in border-border/60">
          <CardContent className="pt-6">
            <Skeleton className="aspect-square w-full rounded-lg" />
          </CardContent>
        </Card>
      )}

      {/* Error Messages */}
      {error && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Result Card */}
      {generatedImage && !loading && (
        <Card className="animate-fade-up stagger-2 border-border/60">
          <CardContent className="pt-6">
            <div className="aspect-square w-full relative rounded-lg overflow-hidden bg-muted group">
              <img 
                src={generatedImage.url} 
                alt={generatedImage.prompt} 
                className="w-full h-full object-contain"
              />
              <Button
                onClick={handleDownload}
                variant="secondary"
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                title={t.art.download}
              >
                <Download data-icon="inline-start" />
                {t.art.download}
              </Button>
            </div>
            <p className="mt-4 text-center text-muted-foreground text-sm italic body-serif">
              "{generatedImage.prompt}"
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageGenerator;
