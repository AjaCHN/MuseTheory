// app/components/MusicVisualizer.tsx v0.0.3
'use client';

import React, { useState } from 'react';
import { fetchMusicTheoryData } from '../services/geminiService';
import { audioService, InstrumentType } from '../services/audioService';
import { NoteData } from '../types';
import Piano from './Piano';
import SheetMusic from './SheetMusic';
import { Loader2, Music, Search, Sparkles, Play, Settings2, Mic, Square, Download } from 'lucide-react';
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
    const types = [
      'Major Scale', 'Natural Minor Scale', 'Harmonic Minor Scale', 'Melodic Minor Scale',
      'Dorian Mode', 'Phrygian Mode', 'Lydian Mode', 'Mixolydian Mode', 'Locrian Mode',
      'Major Pentatonic', 'Minor Pentatonic', 'Blues Scale',
      'Major Chord', 'Minor Chord', 'Diminished Chord', 'Augmented Chord',
      'Major 7 Chord', 'Minor 7 Chord', 'Dominant 7 Chord', 'Min7b5 Chord'
    ];

    const randomRoot = roots[Math.floor(Math.random() * roots.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];
    const luckyQuery = `${randomRoot} ${randomType}`;

    setQuery(luckyQuery);
    performSearch(luckyQuery);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-slate-800">{t.visualizer.title}</h2>
        <p className="text-slate-600">{t.visualizer.subtitle}</p>
      </div>

      <form onSubmit={handleVisualize} className="flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto">
        <div className="relative flex-1">
          <Music className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.visualizer.placeholder}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleLucky}
            disabled={loading}
            className="px-4 py-3 bg-amber-50 hover:bg-amber-100 text-amber-700 font-medium rounded-xl border border-amber-200 shadow-sm transition-colors flex items-center gap-2 whitespace-nowrap"
            title={t.visualizer.lucky}
          >
            <Sparkles className="w-5 h-5" />
            <span className="hidden sm:inline">{t.visualizer.lucky}</span>
          </button>

          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
            {t.visualizer.visualize}
          </button>
        </div>
      </form>

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
          {/* Info Card */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-400 mb-2">{data.name}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">{data.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-500 dark:text-slate-400 mr-2">{t.visualizer.notes}:</span>
                <span className="font-mono text-indigo-700 dark:text-indigo-400">{data.notes.join(' - ')}</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-900/50 px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                <span className="font-semibold text-slate-500 dark:text-slate-400 mr-2">{t.visualizer.intervals}:</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400">{data.intervals.join(' - ')}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900/50 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700">
                  <Settings2 className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <select 
                    value={instrument} 
                    onChange={(e) => setInstrument(e.target.value as InstrumentType)}
                    className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
                  >
                    <option value="piano">Piano</option>
                    <option value="guitar">Guitar</option>
                    <option value="violin">Violin</option>
                  </select>
                </div>
                
                <button
                  onClick={handleRecordToggle}
                  className={`flex items-center gap-1 px-3 py-1 rounded-lg border transition-colors ${
                    isRecording 
                      ? 'bg-red-100 text-red-700 border-red-200 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' 
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600'
                  }`}
                  title={isRecording ? "Stop Recording" : "Start Recording"}
                >
                  {isRecording ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span className="font-semibold hidden sm:inline">{isRecording ? "Stop" : "Record"}</span>
                </button>

                {recordingUrl && (
                  <a
                    href={recordingUrl}
                    download="musetheory-recording.webm"
                    className="flex items-center gap-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200 transition-colors dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                    title="Download Recording"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}

                <button
                  onClick={handlePlayNotes}
                  className="flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-200 transition-colors dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800"
                  title="Play Notes"
                >
                  <Play className="w-4 h-4" />
                  <span className="font-semibold">Play</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sheet Music */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
            <h4 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Sheet Music</h4>
            <SheetMusic notes={data.notes} title={data.name} />
          </div>

          {/* Visualization */}
          <div className="bg-white dark:bg-slate-800 p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-700 flex flex-col items-center">
            <Piano highlightedNotes={data.notes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicVisualizer;