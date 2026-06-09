// app/components/Piano.tsx v0.0.7
'use client';

import React, { useState } from 'react';
import { OCTAVE_NOTES } from '../constants';
import { audioService, InstrumentType } from '../services/audioService';
import { useMusicStore } from '../store/useMusicStore';

interface PianoProps {
  highlightedNotes: string[];
}

const Piano: React.FC<PianoProps> = ({ highlightedNotes }) => {
  const { instrument } = useMusicStore();
  const [playingNotes, setPlayingNotes] = useState<Set<string>>(new Set());

  const keys = [...OCTAVE_NOTES, ...OCTAVE_NOTES, 'C'];

  const isHighlighted = (note: string) => highlightedNotes.includes(note) || playingNotes.has(note);

  const playNote = async (note: string) => {
    setPlayingNotes(prev => new Set(prev).add(note));
    await audioService.playNotes([note], instrument, '8n');
  };

  const stopNote = (note: string) => {
    setPlayingNotes(prev => {
      const next = new Set(prev);
      next.delete(note);
      return next;
    });
  };

  const renderKey = (note: string, index: number) => {
    const isBlack = note.includes('#');
    const isActive = isHighlighted(note);

    if (isBlack) return null;

    const nextNote = keys[index + 1];
    const hasBlackNeighbor = nextNote && nextNote.includes('#');
    const isNextActive = hasBlackNeighbor && isHighlighted(nextNote);

    return (
      <div key={`${note}-${index}`} className="relative group">
        <div
          onMouseDown={() => playNote(note)}
          onMouseUp={() => stopNote(note)}
          onMouseLeave={() => stopNote(note)}
          onTouchStart={(e) => { e.preventDefault(); playNote(note); }}
          onTouchEnd={(e) => { e.preventDefault(); stopNote(note); }}
          className={`
            w-10 h-32 sm:w-14 sm:h-48 border rounded-b-2xl
            flex flex-col justify-end items-center pb-3 cursor-pointer
            transition-all duration-200 ease-out origin-top
            ${isActive
              ? 'bg-orange-50 border-orange-400 shadow-[0_8px_30px_rgba(255,149,0,0.45),0_2px_6px_rgba(255,149,0,0.2)] translate-y-1'
              : 'bg-white border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)] hover:bg-slate-50'
            }
          `}
        >
          {isActive && (
            <div className="w-3 h-3 rounded-full mb-2 animate-pulse shadow-[0_0_10px_rgba(255,149,0,0.8)]" style={{ backgroundColor: '#ff9500' }}></div>
          )}
          <span className={`text-xs font-semibold select-none ${isActive ? 'font-bold' : ''}`} style={{ color: isActive ? '#ff9500' : '#94a3b8' }}>
            {note}
          </span>
        </div>

        {hasBlackNeighbor && (
          <div
            className="absolute z-10 top-0 -right-3 sm:-right-4 w-6 h-20 sm:w-8 sm:h-28"
          >
            <div
              onMouseDown={() => playNote(nextNote)}
              onMouseUp={() => stopNote(nextNote)}
              onMouseLeave={() => stopNote(nextNote)}
              onTouchStart={(e) => { e.preventDefault(); playNote(nextNote); }}
              onTouchEnd={(e) => { e.preventDefault(); stopNote(nextNote); }}
              className={`
                w-full h-full rounded-b-xl border cursor-pointer
                transition-all duration-200 ease-out origin-top
                ${isNextActive
                  ? 'border-orange-300 shadow-[0_6px_20px_rgba(94,92,230,0.5),0_2px_6px_rgba(94,92,230,0.25)] translate-y-[2px]'
                  : 'bg-neutral-800 border-neutral-900 shadow-[0_4px_10px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.3)] hover:bg-neutral-700'
                }
             `}
             style={isNextActive ? { backgroundColor: '#5e5ce6' } : {}}
            >
               {isNextActive && (
                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px_rgba(255,149,0,0.9)]" style={{ backgroundColor: '#ff9500' }}></div>
               )}
             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center p-4 overflow-x-auto">
      <div className="flex relative select-none p-4 sm:p-5 rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.4),0_8px_20px_rgba(0,0,0,0.25)] ring-1" style={{ backgroundColor: '#0a0a0a', boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.25)' }}>
        {keys.map((note, index) => renderKey(note, index))}
      </div>
    </div>
  );
};

export default Piano;
