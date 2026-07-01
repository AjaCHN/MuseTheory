// app/components/AIStudioKeySelector.tsx v0.0.8
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
    <div className="max-w-xl mx-auto mt-10 text-center info-card">
      <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#5e5ce6] rounded-full flex items-center justify-center mx-auto shadow-md">
        <Key className="w-8 h-8 text-white" />
      </div>
      <div className="pt-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.art.apiKeyRequired}</h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t.art.apiKeyDesc}
        </p>
      </div>
      
      <button
        onClick={onSelectKey}
        className="info-btn primary w-full"
      >
        {t.art.selectKey}
      </button>

      <p className="text-xs text-slate-500 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-slate-700">
        {t.art.billingInfo}{" "}
        <a 
          href="https://ai.google.dev/gemini-api/docs/billing" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#0071e3] hover:underline inline-flex items-center gap-1"
        >
          ai.google.dev/gemini-api/docs/billing
          <ExternalLink className="w-3 h-3" />
        </a>
      </p>
    </div>
  );
};

export default AIStudioKeySelector;
