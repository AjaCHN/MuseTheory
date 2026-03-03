// app/components/AIStudioKeySelector.tsx v0.0.5
'use client';

import React from 'react';
import { Key, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AIStudioKeySelectorProps {
  onSelectKey: () => Promise<void>;
}

const AIStudioKeySelector: React.FC<AIStudioKeySelectorProps> = ({ onSelectKey }) => {
  const { t } = useLanguage();

  return (
    <div className="max-w-xl mx-auto mt-10 p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-indigo-100 dark:border-slate-700 text-center space-y-6">
      <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto">
        <Key className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.art.apiKeyRequired}</h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t.art.apiKeyDesc}
        </p>
      </div>
      
      <button
        onClick={onSelectKey}
        className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
      >
        {t.art.selectKey}
      </button>

      <p className="text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-700">
        {t.art.billingInfo}{" "}
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1"
        >
          ai.google.dev/gemini-api/docs/billing
          <ExternalLink className="w-3 h-3" />
        </a>
      </p>
    </div>
  );
};

export default AIStudioKeySelector;
