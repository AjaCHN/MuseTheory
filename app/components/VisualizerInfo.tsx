// app/components/VisualizerInfo.tsx v0.0.9 - Minimal Editorial
'use client';

import React from 'react';
import { Settings2, Mic, Square, Download, Play } from 'lucide-react';
import { NoteData } from '../types';
import { InstrumentType } from '../services/audioService';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

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
    <Card className="animate-fade-up stagger-2 border-border/60">
      <CardHeader className="pb-4">
        <CardTitle className="heading-serif text-2xl sm:text-3xl font-medium tracking-tight">
          {data.name}
        </CardTitle>
        <CardDescription className="text-base mt-2">
          {data.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-2">
          {data.notes.map((note, i) => (
            <Badge key={i} variant="secondary" className="text-sm px-3 py-1 font-mono">
              {note}
            </Badge>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{t.visualizer.intervals}</p>
          <p className="font-mono text-sm">{data.intervals.join(' - ')}</p>
        </div>

        <div className="flex items-center gap-3">
          <Settings2 className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
          <Select value={instrument} onValueChange={(v) => setInstrument(v as InstrumentType)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="piano">Piano</SelectItem>
              <SelectItem value="guitar">Guitar</SelectItem>
              <SelectItem value="violin">Violin</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-2">
        <Button onClick={onPlayNotes} className="rounded-lg">
          <Play data-icon="inline-start" />
          Play
        </Button>
        
        <Button
          variant={isRecording ? "destructive" : "outline"}
          onClick={onRecordToggle}
          className="rounded-lg"
        >
          {isRecording ? (
            <Square data-icon="inline-start" />
          ) : (
            <Mic data-icon="inline-start" />
          )}
          {isRecording ? "Stop" : "Record"}
        </Button>

        {recordingUrl && (
          <a
            href={recordingUrl}
            download="musetheory-recording.webm"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-2.5 h-8 text-sm font-medium hover:bg-muted hover:text-foreground transition-all"
          >
            <Download className="w-4 h-4" strokeWidth={1.5} />
            Download
          </a>
        )}
      </CardFooter>
    </Card>
  );
};

export default VisualizerInfo;
