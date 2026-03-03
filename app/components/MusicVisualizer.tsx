// app/components/MusicVisualizer.tsx v0.0.4
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
      console.error(err);
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{t.visualizer.title}</h2>
        <p className="text-slate-600 dark:text-slate-400">{t.visualizer.subtitle}</p>
      </div>

      <VisualizerSearch 
        query={query} 
        setQuery={setQuery} 
        loading={loading} 
        onVisualize={handleVisualize} 
        onLucky={handleLucky} 
      />

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl text-center border border-red-100 dark:border-red-800">
          {error}
        </div>
      )}

      {midiError && (
        <div className="p-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm text-center border border-amber-100 dark:border-amber-800">
          {midiError}
        </div>
      )}

      {midiAccess && (
        <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-lg text-sm text-center border border-emerald-100 dark:border-emerald-800">
          MIDI Keyboard Connected
        </div>
      )}

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

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Sheet Music</h4>
            <SheetMusic notes={data.notes} title={data.name} />
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center">
            <Piano highlightedNotes={data.notes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicVisualizer;