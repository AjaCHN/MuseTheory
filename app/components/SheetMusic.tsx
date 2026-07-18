// app/components/SheetMusic.tsx v0.0.9 - Minimal Editorial
'use client';

import React, { useEffect, useRef } from 'react';
import abcjs from 'abcjs';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SheetMusicProps {
  notes: string[];
  title?: string;
}

const SheetMusic: React.FC<SheetMusicProps> = ({ notes, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || notes.length === 0) return;

    const abcNotes = notes.map(n => {
      let note = n.replace('#', '^').replace('b', '_');
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

  return (
    <Card className="animate-fade-up stagger-3 border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Sheet Music
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={containerRef} className="w-full overflow-x-auto bg-card" />
      </CardContent>
    </Card>
  );
};

export default SheetMusic;
