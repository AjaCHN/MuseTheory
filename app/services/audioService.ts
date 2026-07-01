// app/services/audioService.ts v0.0.8
import * as Tone from 'tone';

export type InstrumentType = 'piano' | 'guitar' | 'violin';

const VALID_INSTRUMENTS: readonly InstrumentType[] = ['piano', 'guitar', 'violin'] as const;
const NOTE_REGEX = /^(C|C#|Db|D|D#|Eb|E|F|F#|Gb|G|G#|Ab|A|A#|Bb|B)(\d)$/;
const MAX_NOTES = 16;

const validateNote = (note: string): string | null => {
  if (typeof note !== 'string') return null;
  const raw = note.trim();
  if (!raw) return null;
  if (raw.length > 8) return null;
  if (NOTE_REGEX.test(raw)) {
    const octave = parseInt(raw.slice(-1), 10);
    if (octave < 0 || octave > 9) return null;
    return raw;
  }
  // If no octave provided, append 4.
  const withoutOctave = /^(C|C#|Db|D|D#|Eb|E|F|F#|Gb|G|G#|Ab|A|A#|Bb|B)$/.test(raw);
  if (withoutOctave) return `${raw}4`;
  return null;
};

class AudioService {
  private synths: Record<InstrumentType, Tone.PolySynth | Tone.Sampler | null> = {
    piano: null,
    guitar: null,
    violin: null,
  };
  private isInitialized = false;
  private recorder: Tone.Recorder | null = null;

  async init() {
    if (this.isInitialized) return;
    try {
      await Tone.start();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[audioService] Failed to start the Tone.js context:', err);
      }
      return;
    }

    this.recorder = new Tone.Recorder();

    // Simple synths for demonstration. In a real app, you'd use Sampler with actual audio files.
    this.synths.piano = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 1 },
    }).toDestination();

    this.synths.guitar = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1.2 },
    }).toDestination();

    this.synths.violin = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.5, decay: 0.1, sustain: 1, release: 1 },
    }).toDestination();

    Tone.getDestination().connect(this.recorder);

    this.isInitialized = true;
  }

  async playNotes(
    notes: string[],
    instrument: InstrumentType = 'piano',
    duration: string = '4n'
  ) {
    await this.init();
    if (!VALID_INSTRUMENTS.includes(instrument)) return;
    const synth = this.synths[instrument];
    if (!synth) return;

    if (!Array.isArray(notes) || notes.length === 0) return;
    const clipped = notes.slice(0, MAX_NOTES);
    const mappedNotes = clipped
      .map((note) => validateNote(note))
      .filter((n): n is string => n !== null);
    if (mappedNotes.length === 0) return;

    const now = Tone.now();

    mappedNotes.forEach((note, i) => {
      try {
        synth.triggerAttackRelease(note, duration, now + i * 0.5);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('[audioService] Failed to play note:', note, err);
        }
      }
    });

    try {
      synth.triggerAttackRelease(mappedNotes, duration, now + mappedNotes.length * 0.5 + 0.5);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[audioService] Failed to play chord:', err);
      }
    }
  }

  async startRecording() {
    await this.init();
    if (!this.recorder) return;
    try {
      await this.recorder.start();
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[audioService] Failed to start recording:', err);
      }
    }
  }

  async stopRecording(): Promise<string | null> {
    if (!this.recorder) return null;
    try {
      const recording = await this.recorder.stop();
      return URL.createObjectURL(recording);
    } catch (err) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[audioService] Failed to stop recording:', err);
      }
      return null;
    }
  }
}

export const audioService = new AudioService();
