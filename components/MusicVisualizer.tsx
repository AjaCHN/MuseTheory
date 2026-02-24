'use client';

import React, { useState } from 'react';
import { fetchMusicTheoryData } from '../services/geminiService';
import { audioService, InstrumentType } from '../services/audioService';
import { NoteData } from '../types';
import Piano from './Piano';
import { Loader2, Music, Search, Sparkles, Play, Settings2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const MusicVisualizer: React.FC = () => {
  const { t, language } = useLanguage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NoteData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [instrument, setInstrument] = useState<InstrumentType>('piano');

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
        <div className="p-4 bg-red-50 text-red-700 rounded-xl text-center border border-red-100">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-8 animate-fade-in">
          {/* Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">{data.name}</h3>
            <p className="text-slate-600 mb-4">{data.description}</p>
            
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-500 mr-2">{t.visualizer.notes}:</span>
                <span className="font-mono text-indigo-700">{data.notes.join(' - ')}</span>
              </div>
              <div className="bg-slate-50 px-3 py-1 rounded-lg border border-slate-200">
                <span className="font-semibold text-slate-500 mr-2">{t.visualizer.intervals}:</span>
                <span className="font-mono text-emerald-700">{data.intervals.join(' - ')}</span>
              </div>
              <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                  <Settings2 className="w-4 h-4 text-slate-500" />
                  <select 
                    value={instrument} 
                    onChange={(e) => setInstrument(e.target.value as InstrumentType)}
                    className="bg-transparent text-sm font-medium text-slate-700 outline-none cursor-pointer"
                  >
                    <option value="piano">Piano</option>
                    <option value="guitar">Guitar</option>
                    <option value="violin">Violin</option>
                  </select>
                </div>
                <button
                  onClick={handlePlayNotes}
                  className="flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-200 transition-colors"
                  title="Play Notes"
                >
                  <Play className="w-4 h-4" />
                  <span className="font-semibold">Play</span>
                </button>
              </div>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-lg border border-slate-100 flex flex-col items-center">
            <Piano highlightedNotes={data.notes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicVisualizer;