// app/layout.tsx v0.0.9
import './style.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import Providers from './components/Providers';
import { ThemeProvider } from './components/ThemeProvider';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import { Suspense } from 'react';
import Loading from './loading';
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'MuseTheory AI',
  description:
    'An intelligent music theory companion that visualizes scales and chords, provides an AI tutor, and generates artistic musical imagery.',
  manifest: '/manifest.json',
  keywords: [
    'music theory',
    'AI',
    'piano',
    'scales',
    'chords',
    'visualizer',
    'education',
    'Gemini',
  ],
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
    ICBM: '0, 0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(geist.variable, playfair.variable, jetbrainsMono.variable)}>
      <body
        className="min-h-screen flex flex-col bg-background text-foreground font-sans antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>
            <Providers>
              <Navigation />
              <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <Suspense fallback={<Loading />}>
                  <ErrorBoundary>{children}</ErrorBoundary>
                </Suspense>
              </main>
              <Footer />
            </Providers>
          </TooltipProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
