// app/components/VisualizerInfo.tsx v0.0.5
'use client';

import React from 'react';
import { Settings2, Mic, Square, Download, Play } from 'lucide-react';
import { NoteData } from '../types';
import { InstrumentType } from '../services/audioService';
import { useLanguage } from '../contexts/LanguageContext';

interface VisualizerInfoProps {
  data: NoteData;
  instrument: InstrumentType;
  setInstrument: (instrument: InstrumentType) => void;
  isRecording: boolean;
  onRecordToggle: () => void;
  recordingUrl: string | null;
  onPlayNotes: () => void;
}

const VisualizerInfo: React.FC<VisualizerInfoProps> = ({
  data,
  instrument,
  setInstrument,
  isRecording,
  onRecordToggle,
  recordingUrl,
  onPlayNotes,
}) => {
  const { t } = useLanguage();

  return (
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
            onClick={onRecordToggle}
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
            onClick={onPlayNotes}
            className="flex items-center gap-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1 rounded-lg border border-indigo-200 transition-colors dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-800"
            title="Play Notes"
          >
            <Play className="w-4 h-4" />
            <span className="font-semibold">Play</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VisualizerInfo;
