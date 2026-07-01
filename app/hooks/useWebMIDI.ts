// app/hooks/useWebMIDI.ts v0.0.8
import { useEffect, useState, useCallback, useRef } from 'react';
import { audioService } from '../services/audioService';
import { useMusicStore } from '../store/useMusicStore';

interface UseWebMIDIResult {
  midiAccess: MIDIAccess | null;
  error: string | null;
}

const MIDI_NOTE_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const isMIDISupported = (): boolean => {
  if (typeof navigator === 'undefined') return false;
  return 'requestMIDIAccess' in navigator;
};

export const useWebMIDI = (): UseWebMIDIResult => {
  const { instrument } = useMusicStore();
  const [midiAccess, setMidiAccess] = useState<MIDIAccess | null>(null);
  const [error, setError] = useState<string | null>(() =>
    isMIDISupported() ? null : 'Web MIDI API not supported in this browser.'
  );
  const accessRef = useRef<MIDIAccess | null>(null);

  // Keep the latest instrument in a ref so note playback always uses the
  // current instrument without triggering effect re-runs.
  const instrumentRef = useRef(instrument);
  useEffect(() => {
    instrumentRef.current = instrument;
  }, [instrument]);

  const playNoteFromMIDI = useCallback((midiNote: number) => {
    const octave = Math.floor(midiNote / 12) - 1;
    const noteName = MIDI_NOTE_NAMES[midiNote % 12];
    const fullNote = `${noteName}${octave}`;
    audioService.playNotes([fullNote], instrumentRef.current, '8n').catch((err) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('[useWebMIDI] Failed to play MIDI note:', err);
      }
    });
  }, []);

  const handleMIDIMessage = useCallback((message: Event) => {
    const data = (message as MIDIMessageEvent).data;
    if (!data || data.length === 0) return;

    const command = data[0];
    const note = data[1];
    const velocity = data.length > 2 ? data[2] : 0;

    switch (command) {
      case 144: // note-on
        if (velocity > 0) {
          playNoteFromMIDI(note);
        }
        break;
      case 128: // note-off
        // currently handled by the short note duration.
        break;
      default:
        break;
    }
  }, [playNoteFromMIDI]);

  useEffect(() => {
    if (!isMIDISupported()) {
      return;
    }

    let disposed = false;

    navigator
      .requestMIDIAccess()
      .then((access: MIDIAccess) => {
        if (disposed) return;
        accessRef.current = access;
        setMidiAccess(access);
        try {
          for (const input of access.inputs.values()) {
            input.onmidimessage = handleMIDIMessage;
          }
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[useWebMIDI] Failed to enumerate MIDI inputs:', err);
          }
        }
      })
      .catch(() => {
        if (disposed) return;
        setError('Could not access your MIDI devices.');
      });

    return () => {
      disposed = true;
      const latestAccess = accessRef.current;
      if (latestAccess) {
        try {
          for (const input of latestAccess.inputs.values()) {
            input.onmidimessage = null;
          }
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[useWebMIDI] Failed to clean up MIDI listeners:', err);
          }
        }
      }
    };
    // effect re-runs when the message handler changes to pick up new
    // dependencies (e.g. instrument) without re-running the whole setup.
  }, [handleMIDIMessage]);

  return { midiAccess, error };
};
