// app/components/VisualizerInfo.tsx v0.0.8 - Apple Style
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
    <div className="info-card">
      <h3 className="info-card-title">{data.name}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6 text-lg">{data.description}</p>
      
      <div className="info-notes">
        {data.notes.map((note, i) => (
          <span key={i} className="info-note">{note}</span>
        ))}
      </div>
      
      <div className="text-slate-500 dark:text-slate-400 mb-6">
        <span className="font-semibold">{t.visualizer.intervals}:</span> {data.intervals.join(' - ')}
      </div>
      
      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
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
      </div>

      <div className="info-actions">
        <button
          onClick={onPlayNotes}
          className="info-btn primary"
          title="Play Notes"
        >
          <Play className="w-5 h-5" />
          Play
        </button>
        
        <button
          onClick={onRecordToggle}
          className={`info-btn ${isRecording ? 'warning' : 'success'}`}
          title={isRecording ? "Stop Recording" : "Start Recording"}
        >
          {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          {isRecording ? "Stop" : "Record"}
        </button>

        {recordingUrl && (
          <a
            href={recordingUrl}
            download="musetheory-recording.webm"
            className="info-btn warning"
            title="Download Recording"
          >
            <Download className="w-5 h-5" />
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default VisualizerInfo;
