import React from 'react';
import { cn } from '@/lib/utils';

export type Mood = {
  emoji: string;
  label: string;
  id: string;
};

const MOODS: Mood[] = [
  { emoji: '😄', label: 'Happy', id: 'happy' },
  { emoji: '😢', label: 'Sad', id: 'sad' },
  { emoji: '😎', label: 'Chill', id: 'chill' },
  { emoji: '💪', label: 'Motivated', id: 'motivated' },
  { emoji: '🥰', label: 'In Love', id: 'love' },
  { emoji: '😡', label: 'Angry', id: 'angry' },
  { emoji: '😴', label: 'Tired', id: 'tired' },
  { emoji: '🤩', label: 'Excited', id: 'excited' },
];

interface MoodSelectorProps {
  selectedMood: string | null;
  onSelectMood: (moodId: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelectMood }) => {
  return (
    <div className="w-full space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Select Mood</h3>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onSelectMood(mood.id)}
            className={cn(
              "flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 hover-scale",
              selectedMood === mood.id 
                ? "bg-primary/20 ring-2 ring-primary scale-105 shadow-md" 
                : "bg-white hover:bg-gray-50 border border-transparent hover:border-gray-200"
            )}
          >
            <span className="text-3xl mb-1 filter drop-shadow-sm">{mood.emoji}</span>
            <span className="text-[10px] font-bold text-gray-500 uppercase">{mood.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
