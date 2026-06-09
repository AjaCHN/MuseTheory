// app/layout.tsx v0.0.7
import './style.css';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Providers from './components/Providers';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#4f46e5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'MuseTheory AI v0.0.7',
  description: 'An intelligent music theory companion that visualizes scales and chords, provides an AI tutor, and generates artistic musical imagery.',
  manifest: '/manifest.json',
  keywords: ['music theory', 'AI', 'piano', 'scales', 'chords', 'visualizer', 'education', 'Gemini'],
  openGraph: {
    title: 'MuseTheory AI',
    description: 'Visualize music theory with AI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MuseTheory AI',
    description: 'Visualize music theory with AI.',
  },
  other: {
    'geo.region': 'US',
    'geo.placename': 'Global',
    'geo.position': '0;0',
    'ICBM': '0, 0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 min-h-screen flex flex-col transition-colors duration-300`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <Navigation />
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </main>
            <Footer />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
