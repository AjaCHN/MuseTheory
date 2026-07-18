// app/components/Footer.tsx v0.0.9 - Minimal Editorial
'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Music } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="heading-serif text-base text-foreground">MuseTheory AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {mounted ? new Date().getFullYear() : '2026'} {t.footer}
          </p>
        </div>
      </div>
    </footer>
  );
}
