// app/components/VisualizerSearch.tsx v0.0.9 - Minimal Editorial
'use client';

import React from 'react';
import { Sparkles, Search, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VisualizerSearchProps {
  query: string;
  setQuery: (query: string) => void;
  loading: boolean;
  onVisualize: (e: React.FormEvent) => void;
  onLucky: () => void;
}

const VisualizerSearch: React.FC<VisualizerSearchProps> = ({
  query,
  setQuery,
  loading,
  onVisualize,
  onLucky,
}) => {
  const { t } = useLanguage();

  return (
    <form onSubmit={onVisualize} className="w-full max-w-2xl mx-auto animate-fade-up stagger-1">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="visualizer-search" className="sr-only">
            {t.visualizer.placeholder}
          </label>
          <Input
            id="visualizer-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.visualizer.placeholder}
            className="h-12 pl-12 pr-4 text-base bg-card border-border rounded-lg"
            aria-describedby="search-hint"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <div className="flex gap-2">
          <Button
            type="submit"
            disabled={loading || !query.trim()}
            className="h-12 px-6 rounded-lg font-medium"
          >
            {loading ? (
              <Loader2 className="animate-spin" data-icon="inline-start" aria-hidden="true" />
            ) : (
              <Search data-icon="inline-start" aria-hidden="true" />
            )}
            {t.visualizer.visualize}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onLucky}
            disabled={loading}
            className="h-12 w-12 p-0 rounded-lg"
            aria-label={t.visualizer.lucky}
            title={t.visualizer.lucky}
          >
            <Sparkles className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VisualizerSearch;
