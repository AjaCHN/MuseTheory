// app/components/Navigation.tsx v0.0.9 - Minimal Editorial
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Music, MessageCircle, Image as ImageIcon, Languages, Sun, Moon } from 'lucide-react';
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
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass border-b border-border/60' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo - Editorial Style */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Music className="w-5 h-5 text-foreground" strokeWidth={1.5} />
            </div>
            <span className="heading-serif text-xl sm:text-2xl font-medium tracking-tight text-foreground">
              {t.appTitle}
            </span>
          </Link>
          
          {/* Navigation Links - Minimal Editorial */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href="/"
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 rounded-md relative ${
                isActive('/') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Music className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline text-[13px] tracking-wide">{t.nav.visualizer}</span>
              {isActive('/') && (
                <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-5 h-px bg-foreground" />
              )}
            </Link>
            
            <Link
              href="/chat"
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 rounded-md relative ${
                isActive('/chat') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline text-[13px] tracking-wide">{t.nav.chat}</span>
              {isActive('/chat') && (
                <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-5 h-px bg-foreground" />
              )}
            </Link>

            <Link
              href="/art"
              className={`px-3 sm:px-4 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-2 rounded-md relative ${
                isActive('/art') 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <ImageIcon className="w-4 h-4" strokeWidth={1.5} />
              <span className="hidden sm:inline text-[13px] tracking-wide">{t.nav.art}</span>
              {isActive('/art') && (
                <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-5 h-px bg-foreground" />
              )}
            </Link>

            <div className="h-5 w-px bg-border mx-1 sm:mx-2 hidden sm:block"></div>

            {/* Theme Toggle - Minimal */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                className="rounded-md hover:bg-muted w-9 h-9"
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" strokeWidth={1.5} aria-hidden="true" /> : <Moon className="w-[18px] h-[18px]" strokeWidth={1.5} aria-hidden="true" />}
              </Button>
            )}

            {/* Language Selector - Minimal */}
            <DropdownMenu>
              <DropdownMenuTrigger
                aria-label="Select language"
                className="inline-flex items-center justify-center rounded-md w-9 h-9 text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
              >
                <Languages className="w-[18px] h-[18px]" strokeWidth={1.5} aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={
                      language === lang.code
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground'
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
