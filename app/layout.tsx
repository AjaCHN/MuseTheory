// app/layout.tsx v0.0.2
import './style.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './components/Providers';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MuseTheory AI v0.0.2',
  description: 'An intelligent music theory companion that visualizes scales and chords, provides an AI tutor, and generates artistic musical imagery.',
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
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <Providers>
          <Navigation />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
