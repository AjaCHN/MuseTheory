// app/components/Navigation.tsx v0.0.7
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, MessageCircle, Image as ImageIcon, Languages, ChevronDown, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';
import { useTheme } from 'next-themes';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁體中文' },
    { code: 'es', label: 'Español' },
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'pt-BR', label: 'Português (BR)' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ja', label: '日本語' },
    { code: 'ko', label: '한국어' },
    { code: 'ru', label: 'Русский' }
  ];

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo - Apple Style */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 p-2 rounded-xl transition-transform duration-300 group-hover:scale-105">
              <Music className="w-5 h-5 text-white dark:text-slate-900" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t.appTitle}
            </span>
          </Link>
          
          {/* Navigation Links - Apple Style */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActive('/') 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.visualizer}</span>
            </Link>
            
            <Link
              href="/chat"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActive('/chat') 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.chat}</span>
            </Link>

            <Link
              href="/art"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isActive('/art') 
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">{t.nav.art}</span>
            </Link>

            <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 mx-2 hidden sm:block"></div>

            {/* Theme Toggle - Apple Style */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 hover:scale-105"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}

            {/* Language Selector - Apple Style */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1 p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                title="Switch Language"
              >
                <Languages className="w-5 h-5" />
                <ChevronDown className="w-3 h-3 hidden sm:inline" />
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/50 dark:border-slate-700/50 py-2 z-50 backdrop-blur-xl">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        language === lang.code 
                          ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/50 dark:bg-blue-900/20' 
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
