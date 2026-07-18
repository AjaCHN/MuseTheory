// app/components/MusicVisualizer.tsx v0.0.9 - Minimal Editorial
'use client';

import React, { useState } from 'react';
import { fetchMusicTheoryData } from '../services/geminiService';
import { audioService } from '../services/audioService';
import { NoteData } from '../types';
import Piano from './Piano';
import SheetMusic from './SheetMusic';
import VisualizerSearch from './VisualizerSearch';
import VisualizerInfo from './VisualizerInfo';
import { useLanguage } from '../contexts/LanguageContext';
import { useMusicStore } from '../store/useMusicStore';
import { useWebMIDI } from '../hooks/useWebMIDI';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const MusicVisualizer: React.FC = () => {
  const { t, language } = useLanguage();
  const { instrument, setInstrument } = useMusicStore();
  const { midiAccess, error: midiError } = useWebMIDI();
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NoteData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchMusicTheoryData(searchQuery, language);
      setData(result);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[MusicVisualizer] fetchMusicTheoryData failed:', err instanceof Error ? err.message : String(err));
      }
      setError(t.visualizer.error);
    } finally {
      setLoading(false);
    }
  };

  const handleVisualize = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  const handleRecordToggle = async () => {
    if (isRecording) {
      const url = await audioService.stopRecording();
      setRecordingUrl(url);
      setIsRecording(false);
    } else {
      setRecordingUrl(null);
      await audioService.startRecording();
      setIsRecording(true);
    }
  };

  const handlePlayNotes = async () => {
    if (data && data.notes) {
      await audioService.playNotes(data.notes, instrument);
    }
  };

  const handleLucky = () => {
    const roots = ['C', 'C#', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
    const types = ['Major Scale', 'Natural Minor Scale', 'Harmonic Minor Scale', 'Melodic Minor Scale', 'Dorian Mode', 'Phrygian Mode', 'Lydian Mode', 'Mixolydian Mode', 'Locrian Mode', 'Major Pentatonic', 'Minor Pentatonic', 'Blues Scale', 'Major Chord', 'Minor Chord', 'Diminished Chord', 'Augmented Chord', 'Major 7 Chord', 'Minor 7 Chord', 'Dominant 7 Chord', 'Min7b5 Chord'];
    const luckyQuery = `${roots[Math.floor(Math.random() * roots.length)]} ${types[Math.floor(Math.random() * types.length)]}`;
    setQuery(luckyQuery);
    performSearch(luckyQuery);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
      {/* Hero Section - Editorial Style */}
      {!data && !loading && (
        <div className="text-center space-y-6 py-12 sm:py-20 animate-fade-up">
          <h1 className="display text-5xl sm:text-6xl md:text-7xl text-foreground">
            {t.visualizer.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto body-serif">
            {t.visualizer.subtitle}
          </p>
        </div>
      )}

      {/* Search Section */}
      <VisualizerSearch 
        query={query} 
        setQuery={setQuery} 
        loading={loading} 
        onVisualize={handleVisualize} 
        onLucky={handleLucky} 
      />

      {/* Loading State */}
      {loading && (
        <div className="space-y-6 animate-fade-in">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      )}

      {/* Error Messages */}
      {error && (
        <Alert variant="destructive" className="animate-fade-in">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {midiError && (
        <Alert className="animate-fade-in">
          <AlertCircle className="w-4 h-4" />
          <AlertDescription>{midiError}</AlertDescription>
        </Alert>
      )}

      {midiAccess && (
        <Alert className="animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <AlertDescription>MIDI Keyboard Connected</AlertDescription>
        </Alert>
      )}

      {/* Results Section */}
      {data && !loading && (
        <div className="space-y-6 sm:space-y-8">
          <VisualizerInfo 
            data={data} 
            instrument={instrument} 
            setInstrument={setInstrument} 
            isRecording={isRecording} 
            onRecordToggle={handleRecordToggle} 
            recordingUrl={recordingUrl} 
            onPlayNotes={handlePlayNotes} 
          />

          <SheetMusic notes={data.notes} title={data.name} />

          <Piano highlightedNotes={data.notes} />
        </div>
      )}
    </div>
  );
};

export default MusicVisualizer;
