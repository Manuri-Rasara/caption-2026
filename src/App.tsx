import React, { useState } from 'react';
import { MoodSelector } from '@/components/genz/MoodSelector';
import { VibeSelector, Vibe, WishType } from '@/components/genz/VibeSelector';
import { UploadMedia } from '@/components/genz/UploadMedia';
import { CaptionList } from '@/components/genz/CaptionList';
import { GenerateButton } from '@/components/genz/GenerateButton';
import { generateMockCaptions } from '@/services/mockApi';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [mood, setMood] = useState<string | null>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [wish, setWish] = useState<WishType | null>(null);
  const [file, setFile] = useState<File | null>(null);
  
  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!mood || !vibe || !file) return;
    
    setLoading(true);
    setCaptions([]); // Clear previous
    
    try {
      const results = await generateMockCaptions(
        mood, 
        vibe, 
        wish, 
        file.type.startsWith('video') ? 'video' : 'image'
      );
      setCaptions(results);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewUpload = () => {
    setFile(null);
    setCaptions([]);
    // Optionally clear mood/vibe if desired, but user might want to keep settings
    // setMood(null);
    // setVibe(null);
    // setWish(null);
  };

  const isGenerateDisabled = !mood || !vibe || !file || (vibe === 'Wishes' && !wish);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      <div className="max-w-md mx-auto min-h-screen flex flex-col relative bg-white sm:shadow-2xl sm:my-8 sm:rounded-[32px] sm:min-h-[calc(100vh-4rem)] overflow-hidden">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sm:pt-6">
          <h1 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-fade-in">
            Create Caption
          </h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-5 space-y-8 pb-24 scrollbar-hide">
          
          <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <MoodSelector selectedMood={mood} onSelectMood={setMood} />
          </section>

          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <VibeSelector 
              selectedVibe={vibe} 
              onSelectVibe={(v) => { setVibe(v); if (v !== 'Wishes') setWish(null); }}
              selectedWish={wish}
              onSelectWish={setWish}
            />
          </section>

          <section className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <UploadMedia file={file} setFile={setFile} />
          </section>

          {/* Results Area */}
          <div ref={(el) => {
             // Auto-scroll to results if they appear
             if (captions.length > 0 && el) {
               el.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
          }}>
            <CaptionList 
              captions={captions} 
              loading={loading} 
              onRegenerate={handleGenerate}
              onNewUpload={handleNewUpload}
            />
          </div>

        </main>

        {/* Sticky Footer Action */}
        {captions.length === 0 && (
          <div className="sticky bottom-0 p-5 bg-gradient-to-t from-white via-white to-transparent z-10">
            <GenerateButton 
              onClick={handleGenerate} 
              disabled={isGenerateDisabled} 
              loading={loading} 
            />
          </div>
        )}
      </div>
      
      <Toaster position="top-center" />
      
      {/* Background decoration for desktop */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-primary/5 via-background to-secondary/5 pointer-events-none hidden sm:block" />
    </div>
  );
}

export default App;
