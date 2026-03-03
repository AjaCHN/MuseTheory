// app/store/useMusicStore.ts v0.0.3
import { create } from 'zustand';
import { InstrumentType } from '../services/audioService';

interface MusicState {
  instrument: InstrumentType;
  setInstrument: (instrument: InstrumentType) => void;
  activeNotes: string[];
  setActiveNotes: (notes: string[]) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  instrument: 'piano',
  setInstrument: (instrument) => set({ instrument }),
  activeNotes: [],
  setActiveNotes: (notes) => set({ activeNotes: notes }),
}));
