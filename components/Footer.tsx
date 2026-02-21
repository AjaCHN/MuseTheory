'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} {t.footer}</p>
      </div>
    </footer>
  );
}
