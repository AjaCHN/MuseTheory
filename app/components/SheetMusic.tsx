// app/components/SheetMusic.tsx v0.0.8
'use client';

import React, { useEffect, useRef } from 'react';
import abcjs from 'abcjs';

interface SheetMusicProps {
  notes: string[];
  title?: string;
}

const SheetMusic: React.FC<SheetMusicProps> = ({ notes, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || notes.length === 0) return;

    // Convert standard notes (C, C#, D) to ABC notation
    const abcNotes = notes.map(n => {
      let note = n.replace('#', '^').replace('b', '_');
      // Basic mapping to middle octave for simplicity
      if (note.length === 1 || note.includes('^') || note.includes('_')) {
        return note;
      }
      return note;
    }).join(' ');

    const abcString = `
X:1
T:${title || 'Scale / Chord'}
M:4/4
L:1/4
K:C
${abcNotes} |]
`;

    abcjs.renderAbc(containerRef.current, abcString, {
      responsive: 'resize',
      add_classes: true,
    });
  }, [notes, title]);

  return <div ref={containerRef} className="w-full overflow-x-auto bg-white dark:bg-slate-800 rounded-xl p-4" />;
};

export default SheetMusic;
