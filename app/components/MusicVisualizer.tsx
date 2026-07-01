// app/components/MusicVisualizer.tsx v0.0.8 - Apple Style
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
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Apple-style Hero Section */}
      {!data && !loading && (
        <div className="text-center space-y-8 py-16">
          <h2 className="text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
            {t.visualizer.title}
          </h2>
          <p className="text-2xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            {t.visualizer.subtitle}
          </p>
        </div>
      )}

      {/* Search Section - Apple Style */}
      <VisualizerSearch 
        query={query} 
        setQuery={setQuery} 
        loading={loading} 
        onVisualize={handleVisualize} 
        onLucky={handleLucky} 
      />

      {/* Error Messages - Apple Style */}
      {error && (
        <div className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-3xl text-center border border-red-100 dark:border-red-800">
          {error}
        </div>
      )}

      {midiError && (
        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-2xl text-sm text-center border border-amber-100 dark:border-amber-800">
          {midiError}
        </div>
      )}

      {midiAccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-2xl text-sm text-center border border-emerald-100 dark:border-emerald-800">
          MIDI Keyboard Connected
        </div>
      )}

      {/* Results Section - Apple Style Cards */}
      {data && (
        <div className="space-y-8 animate-fade-in">
          <VisualizerInfo 
            data={data} 
            instrument={instrument} 
            setInstrument={setInstrument} 
            isRecording={isRecording} 
            onRecordToggle={handleRecordToggle} 
            recordingUrl={recordingUrl} 
            onPlayNotes={handlePlayNotes} 
          />

          {/* Sheet Music Card */}
          <div className="bg-white dark:bg-slate-800/80 backdrop-blur-sm p-8 rounded-3xl shadow-sm border border-slate-100/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
            <h3 className="text-sm font-semibold text-slate-400 dark:text-slate-500 mb-4 uppercase tracking-wider">Sheet Music</h3>
            <SheetMusic notes={data.notes} title={data.name} />
          </div>

          {/* Piano Card */}
          <div className="bg-gradient-to-b from-slate-900 to-black p-8 sm:p-12 rounded-3xl shadow-lg flex flex-col items-center">
            <h3 className="text-sm font-semibold text-slate-400 mb-6 uppercase tracking-wider">Piano</h3>
            <Piano highlightedNotes={data.notes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicVisualizer;
