import React from 'react';
import { OCTAVE_NOTES } from '../constants';

interface PianoProps {
  highlightedNotes: string[];
}

const Piano: React.FC<PianoProps> = ({ highlightedNotes }) => {
  // Create 2 octaves
  const keys = [...OCTAVE_NOTES, ...OCTAVE_NOTES, 'C']; // 2 full octaves + high C
  
  // Normalize highlighted notes to handle basic sharp/flat equivalence if needed, 
  // but for simplicity we rely on the API returning sharps as requested in prompt.
  const isHighlighted = (note: string) => highlightedNotes.includes(note);

  const renderKey = (note: string, index: number) => {
    const isBlack = note.includes('#');
    const isActive = isHighlighted(note);
    
    // We only render white keys in the main flow, black keys are absolutely positioned
    if (isBlack) return null;

    // Find if there is a black key after this white key (unless it's the last one)
    const nextNote = keys[index + 1];
    const hasBlackNeighbor = nextNote && nextNote.includes('#');
    const isNextActive = hasBlackNeighbor && isHighlighted(nextNote);
    
    return (
      <div key={`${note}-${index}`} className="relative group">
        {/* White Key */}
        <div 
          className={`
            w-10 h-32 sm:w-14 sm:h-48 border rounded-b-md 
            flex flex-col justify-end items-center pb-2 
            transition-all duration-200 ease-out origin-top
            ${isActive 
              ? 'bg-indigo-100 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)] translate-y-1' 
              : 'bg-white border-slate-300 shadow-sm hover:bg-slate-50'
            }
          `}
        >
          {isActive && (
            <div className="w-3 h-3 rounded-full bg-indigo-600 mb-2 animate-pulse shadow-sm"></div>
          )}
          <span className={`text-xs font-semibold select-none ${isActive ? 'text-indigo-700 font-bold' : 'text-slate-500'}`}>
            {note}
          </span>
        </div>

        {/* Black Key (Absolute) */}
        {hasBlackNeighbor && (
          <div 
            className="absolute z-10 top-0 -right-3 sm:-right-4 w-6 h-20 sm:w-8 sm:h-28"
          >
             <div className={`
                w-full h-full rounded-b-md border 
                transition-all duration-200 ease-out origin-top
                ${isNextActive 
                  ? 'bg-indigo-900 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.7)] translate-y-[2px]' 
                  : 'bg-slate-900 border-slate-800 shadow-md hover:bg-slate-800'
                }
             `}>
               {isNextActive && (
                 <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,1)]"></div>
               )}
             </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center p-4 overflow-x-auto">
      <div className="flex relative select-none bg-slate-200 p-2 rounded-lg shadow-inner ring-1 ring-slate-300">
        {keys.map((note, index) => renderKey(note, index))}
      </div>
    </div>
  );
};

export default Piano;