// app/components/Footer.tsx v0.0.3
'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-slate-400 dark:text-slate-500 text-sm">
        <p>© {mounted ? new Date().getFullYear() : '2026'} {t.footer}</p>
      </div>
    </footer>
  );
}
