// app/components/VisualizerSearch.tsx v0.0.7 - Apple Style
'use client';

import React from 'react';
import { Sparkles, Search, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

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
    <form onSubmit={onVisualize} className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t.visualizer.placeholder}
        className="search-input"
      />
      
      <button
        type="submit"
        disabled={loading || !query.trim()}
        className="search-btn"
      >
        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
        {t.visualizer.visualize}
      </button>

      <button
        type="button"
        onClick={onLucky}
        disabled={loading}
        className="lucky-btn"
        title={t.visualizer.lucky}
      >
        <Sparkles className="w-6 h-6" />
      </button>
    </form>
  );
};

export default VisualizerSearch;
