import * as Tone from 'tone';

export type InstrumentType = 'piano' | 'guitar' | 'violin';

class AudioService {
  private synths: Record<InstrumentType, Tone.PolySynth | Tone.Sampler | null> = {
    piano: null,
    guitar: null,
    violin: null,
  };
  private isInitialized = false;

  async init() {
    if (this.isInitialized) return;
    await Tone.start();
    
    // Simple synths for demonstration. In a real app, you'd use Sampler with actual audio files.
    this.synths.piano = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'triangle' },
      envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 1 }
    }).toDestination();

    this.synths.guitar = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'square' },
      envelope: { attack: 0.01, decay: 0.5, sustain: 0.2, release: 1.2 }
    }).toDestination();

    this.synths.violin = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: 'sawtooth' },
      envelope: { attack: 0.5, decay: 0.1, sustain: 1, release: 1 }
    }).toDestination();

    this.isInitialized = true;
  }

  async playNotes(notes: string[], instrument: InstrumentType = 'piano', duration: string = '4n') {
    await this.init();
    const synth = this.synths[instrument];
    if (!synth) return;

    // Map notes to octave (e.g., 'C' -> 'C4')
    const mappedNotes = notes.map(note => {
      // If note already has an octave (e.g., C4), use it, otherwise append 4
      return /[0-9]/.test(note) ? note : `${note}4`;
    });

    const now = Tone.now();
    
    // Play notes sequentially for scales, or together for chords?
    // Let's play them sequentially with a small delay to hear them individually, then together.
    mappedNotes.forEach((note, i) => {
      synth.triggerAttackRelease(note, duration, now + i * 0.5);
    });
    
    // Play chord at the end
    synth.triggerAttackRelease(mappedNotes, duration, now + mappedNotes.length * 0.5 + 0.5);
  }
}

export const audioService = new AudioService();
