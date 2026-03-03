// app/components/VisualizerSearch.tsx v0.0.5
'use client';

import React from 'react';
import { Music, Sparkles, Search, Loader2 } from 'lucide-react';
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
    <form onSubmit={onVisualize} className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
      <div className="relative flex-1">
        <Music className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.visualizer.placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
        />
      </div>
      
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onLucky}
          disabled={loading}
          className="px-4 py-3 bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium rounded-xl border border-amber-200 dark:border-amber-800 shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
          title={t.visualizer.lucky}
        >
          <Sparkles className="w-5 h-5" />
          <span className="hidden sm:inline">{t.visualizer.lucky}</span>
        </button>

        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
          {t.visualizer.visualize}
        </button>
      </div>
    </form>
  );
};

export default VisualizerSearch;
