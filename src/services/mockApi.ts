// Mock API for Gen-Z Caption Crafter

const EMOJIS = {
    happy: ['😄', '✨', '⚡️', '🌈', '🦋'],
    sad: ['😢', '🥀', '☁️', '🌧️', '💔'],
    chill: ['😎', '☕️', '🍃', '🕊️', '🧘'],
    motivated: ['💪', '🔥', '🚀', '💯', '👑'],
    love: ['🥰', '💕', '🧸', '💘', '💫'],
    angry: ['😡', '🤬', '🧨', '💣', '😤'],
    tired: ['😴', '💤', '🌙', '🛏️', '🥱'],
    excited: ['🤩', '🎉', '💃', '🥂', '🔮'],
  };
  
  const PHRASES = {
    'My Life': [
      "Main character energy only.",
      "Living rent free in my own head.",
      "Touch grass? No thanks.",
      "It's giving peace.",
      "Entering my villain era (jk, I'm soft).",
      "Just vibes, no thoughts.",
      "POV: You're living your best life.",
      "Protecting my peace at all costs.",
    ],
    'Music': [
      "Headphones on, world off.",
      "This song is my entire personality rn.",
      "In my feels with this playlist.",
      "Soundtrack to my life.",
      "Bass boosted therapy.",
      "Vibing on a different frequency.",
    ],
    'Wishes': {
      'Birthday': [
        "Level up! 🎂",
        "Another year wiser (or not).",
        "It's my personal new year.",
        "Go shawty, it's my birthday.",
        "Cake for breakfast because why not.",
      ],
      'Christmas': [
        "Sleigh all day.",
        "All I want for Christmas is... food.",
        "Festive mode: ON.",
        "Dear Santa, I can explain...",
        "Merry everything & happy always.",
      ],
      'New Year': [
        "New year, same me but better.",
        "Page 1 of 365.",
        "Manifesting greatness only.",
        "Thank u, next year.",
        "Cheers to new beginnings.",
      ]
    }
  };
  
  const GEN_Z_SLANG = ["fr", "no cap", "bet", "slay", "periodt", "vibes", "ate that", "lowkey", "highkey", "iykyk"];
  
  export const generateMockCaptions = async (
    mood: string,
    vibe: string,
    wish: string | null,
    mediaType: string
  ): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    const moodEmojis = EMOJIS[mood as keyof typeof EMOJIS] || ['✨'];
    
    let basePhrases: string[] = [];
    
    if (vibe === 'Wishes' && wish) {
      // @ts-ignore
      basePhrases = PHRASES['Wishes'][wish] || PHRASES['My Life'];
    } else {
      // @ts-ignore
      basePhrases = PHRASES[vibe] || PHRASES['My Life'];
    }
  
    // Generate 5 unique captions
    const captions = Array.from({ length: 5 }).map(() => {
      const phrase = basePhrases[Math.floor(Math.random() * basePhrases.length)];
      const slang = GEN_Z_SLANG[Math.floor(Math.random() * GEN_Z_SLANG.length)];
      const emoji1 = moodEmojis[Math.floor(Math.random() * moodEmojis.length)];
      const emoji2 = moodEmojis[Math.floor(Math.random() * moodEmojis.length)];
      
      // Mix them up creatively
      const template = Math.random();
      
      if (template > 0.7) {
        return `${phrase} ${emoji1} ${slang} ${emoji2}`;
      } else if (template > 0.4) {
        return `${emoji1} ${phrase} ${emoji2}`;
      } else {
        return `${phrase} ${slang} ${emoji1}`;
      }
    });
  
    return [...new Set(captions)]; // Ensure uniqueness
  };
  