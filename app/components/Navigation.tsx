// app/components/Navigation.tsx v0.0.8
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, MessageCircle, Image as ImageIcon, Languages, ChevronDown, Sun, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function Navigation() {
  const pathname = usePathname();
  const { language, setLanguage, t, mounted } = useLanguage();
  const { theme, setTheme } = useTheme();

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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                title="Toggle Theme"
                className="rounded-full"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            )}

            {/* Language Selector - Apple Style */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 p-2 rounded-full text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200">
                <Languages className="w-5 h-5" />
                <ChevronDown className="w-3 h-3 hidden sm:inline" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={
                      language === lang.code
                        ? 'text-primary font-semibold'
                        : ''
                    }
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
