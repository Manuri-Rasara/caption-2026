import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GenerateButtonProps {
  onClick: () => void;
  disabled: boolean;
  loading: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick, disabled, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "w-full py-4 px-6 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg",
        disabled
          ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
          : "bg-primary text-white hover:brightness-110 hover:shadow-primary/40 hover:-translate-y-1 hover-scale active:scale-95"
      )}
    >
      {loading ? (
        <span>Generating...</span>
      ) : (
        <>
          <Sparkles size={24} className={disabled ? "text-gray-400" : "text-yellow-300 animate-pulse"} />
          <span>Generate Caption</span>
        </>
      )}
    </button>
  );
};
