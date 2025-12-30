import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CaptionListProps {
  captions: string[];
  loading: boolean;
  onRegenerate: () => void;
  onNewUpload: () => void;
}

export const CaptionList: React.FC<CaptionListProps> = ({ captions, loading, onRegenerate, onNewUpload }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Caption copied! ✨", {
      description: "Ready to post, bestie!",
    });
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <p className="text-primary font-bold animate-pulse">Cooking up some vibes... 🍳</p>
      </div>
    );
  }

  if (captions.length === 0) return null;

  return (
    <div className="w-full space-y-6 animate-slide-up">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Your Captions ✨</h3>
        <div className="flex gap-2">
           <button 
             onClick={onNewUpload}
             className="text-xs font-semibold text-muted-foreground hover:text-primary transition-colors px-3 py-1 rounded-full hover:bg-gray-100"
           >
             New Upload
           </button>
        </div>
      </div>

      <div className="space-y-3">
        {captions.map((caption, idx) => (
          <div 
            key={idx}
            className="group relative p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary/20"
          >
            <p className="text-gray-800 font-medium leading-relaxed pr-8">{caption}</p>
            <button
              onClick={() => copyToClipboard(caption)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-full transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
              title="Copy"
            >
              <Copy size={18} />
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={onRegenerate}
        className="w-full py-4 rounded-2xl bg-secondary/50 text-secondary-foreground font-bold hover:bg-secondary transition-all flex items-center justify-center gap-2 group hover-scale"
      >
        <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
        Regenerate Vibes
      </button>
    </div>
  );
};
