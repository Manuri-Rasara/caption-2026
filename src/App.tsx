import React, { useState, useEffect } from 'react';
import { MoodSelector } from '@/components/genz/MoodSelector';
import { VibeSelector, Vibe, WishType } from '@/components/genz/VibeSelector';
import { CaptionList } from '@/components/genz/CaptionList';
import { GenerateButton } from '@/components/genz/GenerateButton';
import { generateMockCaptions } from '@/services/mockApi';
import { Toaster } from '@/components/ui/sonner';
import HomePage from '@/components/ui/homePage'; // <-- import your preloader component

function App() {

  // Preloader state
  const [showPreloader, setShowPreloader] = useState(true);

  const [mood, setMood] = useState<string | null>(null);
  const [vibe, setVibe] = useState<Vibe | null>(null);
  const [wish, setWish] = useState<WishType | null>(null);

  const [captions, setCaptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Hide preloader after a short delay (or you could tie it to actual loading)
  useEffect(() => {
    const timer = setTimeout(() => setShowPreloader(false), 5500); // 5.5s preloader
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCaptions([]);
  }, [mood, vibe]);

  const handleGenerate = async () => {
    if (!mood || !vibe) return;
    
    setLoading(true);
    setCaptions([]); // Clear previous
    
    try {
      const results = await generateMockCaptions(mood, vibe, wish);
      setCaptions(results);
    } catch (error) {
      console.error("Error generating captions:", error);
    } finally {
      setLoading(false);
    }
  };

  const isGenerateDisabled = !mood || !vibe || (vibe === 'Wishes' && !wish);

  // Show preloader first
  if (showPreloader) {
    return <HomePage />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 pt-12">
      <div className="max-w-screen-md mx-auto min-h-screen flex flex-col relative bg-white sm:shadow-2xl sm:rounded-[32px] sm:min-h-[calc(100vh-4rem)] overflow-hidden ">
        
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 sm:pt-6">
          <h1 className="text-2xl font-bold text-center bg-blue-700 bg-clip-text text-transparent animate-fade-in">
           CAP IT UP
          </h1>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-5 space-y-4 pb-24 scrollbar-hide ">
          
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

          {/* Results Area */}
          <div ref={(el) => {
             if (captions.length > 0 && el) {
               el.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
          }}>
            <CaptionList 
              captions={captions} 
              loading={loading} 
              onRegenerate={handleGenerate}
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
