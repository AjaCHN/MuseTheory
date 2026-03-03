// app/hooks/useWebMIDI.ts v0.0.3
import { useEffect, useState } from 'react';
import { audioService } from '../services/audioService';
import { useMusicStore } from '../store/useMusicStore';

export const useWebMIDI = () => {
  const { instrument } = useMusicStore();
  const [midiAccess, setMidiAccess] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess()
        .then(onMIDISuccess, onMIDIFailure);
    } else {
      setError("Web MIDI API not supported in this browser.");
    }

    function onMIDISuccess(access: any) {
      setMidiAccess(access);
      for (const input of access.inputs.values()) {
        input.onmidimessage = getMIDIMessage;
      }
      access.onstatechange = (e) => {
        // Handle connection/disconnection
      };
    }

    function onMIDIFailure() {
      setError("Could not access your MIDI devices.");
    }

    function getMIDIMessage(message: any) {
      const command = message.data[0];
      const note = message.data[1];
      const velocity = (message.data.length > 2) ? message.data[2] : 0;

      switch (command) {
        case 144: // noteOn
          if (velocity > 0) {
            playNoteFromMIDI(note, velocity);
          }
          break;
        case 128: // noteOff
          // Handle note off if needed
          break;
      }
    }

    function playNoteFromMIDI(midiNote: number, velocity: number) {
      // Simple conversion from MIDI note to frequency/note name
      // A4 = 69
      const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
      const octave = Math.floor(midiNote / 12) - 1;
      const noteName = notes[midiNote % 12];
      const fullNote = `${noteName}${octave}`;
      
      audioService.playNotes([fullNote], instrument, '8n');
    }

    return () => {
      if (midiAccess) {
        for (const input of midiAccess.inputs.values()) {
          input.onmidimessage = null;
        }
      }
    };
  }, [instrument, midiAccess]);

  return { midiAccess, error };
};
