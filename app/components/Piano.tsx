// app/components/Piano.tsx v0.0.9 - Minimal Editorial
'use client';

import React, { useState } from 'react';
import { OCTAVE_NOTES } from '../constants';
import { audioService, InstrumentType } from '../services/audioService';
import { useMusicStore } from '../store/useMusicStore';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
            w-10 h-32 sm:w-14 sm:h-48 border border-b-2 rounded-b-lg
            flex flex-col justify-end items-center pb-3 cursor-pointer
            transition-all duration-150 ease-out origin-top select-none
            ${isActive
              ? 'bg-primary/10 border-primary/30 translate-y-0.5'
              : 'bg-background border-border hover:bg-muted/50'
            }
          `}
        >
          <span className={`text-xs font-medium select-none ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
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
                w-full h-full rounded-b-md border border-b-2 cursor-pointer select-none
                transition-all duration-150 ease-out origin-top
                ${isNextActive
                  ? 'bg-primary/90 border-primary/50 translate-y-0.5'
                  : 'bg-foreground border-foreground/80 hover:bg-foreground/90'
                }
             `}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className="animate-fade-up stagger-4 border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Piano
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center p-4 overflow-x-auto">
          <div className="flex relative select-none p-3 rounded-lg border border-border bg-muted/30">
            {keys.map((note, index) => renderKey(note, index))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Piano;
