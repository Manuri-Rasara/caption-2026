import React from 'react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export type Vibe = 'My Life' | 'Music' | 'Wishes';
export type WishType = 'Birthday' | 'Christmas' | 'New Year';

const VIBES: Vibe[] = ['My Life', 'Music', 'Wishes'];
const WISHES: { type: WishType; emoji: string }[] = [
  { type: 'Birthday', emoji: '🎂' },
  { type: 'Christmas', emoji: '🎄' },
  { type: 'New Year', emoji: '🎆' },
];

interface VibeSelectorProps {
  selectedVibe: Vibe | null;
  onSelectVibe: (vibe: Vibe) => void;
  selectedWish: WishType | null;
  onSelectWish: (wish: WishType) => void;
}

export const VibeSelector: React.FC<VibeSelectorProps> = ({ 
  selectedVibe, 
  onSelectVibe, 
  selectedWish, 
  onSelectWish 
}) => {
  return (
    <div className="w-full space-y-4">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Select Vibe</h3>
        <div className="flex flex-wrap gap-3">
          {VIBES.map((vibe) => (
            <button
              key={vibe}
              onClick={() => onSelectVibe(vibe)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 hover-scale",
                selectedVibe === vibe
                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
              )}
            >
              {vibe}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedVibe === 'Wishes' && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="space-y-3 overflow-hidden"
          >
             <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Occasion</h3>
             <div className="flex flex-wrap gap-3">
                {WISHES.map((wish) => (
                  <button
                    key={wish.type}
                    onClick={() => onSelectWish(wish.type)}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300",
                      selectedWish === wish.type
                        ? "bg-secondary text-secondary-foreground ring-2 ring-secondary ring-offset-2"
                        : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-100"
                    )}
                  >
                    <span>{wish.emoji}</span>
                    <span>{wish.type}</span>
                  </button>
                ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
