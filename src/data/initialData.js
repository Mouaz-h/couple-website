/*
  ============================================================================
  ❤️ COUPLE WEBSITE CONFIGURATION & CONTENT INSTRUCTIONS ❤️
  ============================================================================

  1. HOW TO CHANGE TEXT:
     - Change 'partner1' and 'partner2' below to your names.
     - Change 'anniversaryDate' to your special date and time (format: "YYYY-MM-DDTHH:mm:ss").
     - Change 'tagline' or update the 'loveLetter' string to write your own message.
     - Update the 'reasonsToLove' array or 'bucketList' items with your personal thoughts.

  2. HOW TO CHANGE PHOTOS:
     - The photos are in the 'public/photos/' directory and renamed to photo1.jpeg, photo2.jpeg, etc.
     - Find the 'milestones' and 'photos' arrays below.
     - Replace the existing 'image' or 'url' fields with './photos/photo1.jpeg', './photos/photo2.jpeg', etc.
     - IMPORTANT: Use './photos/...' (with the dot) to ensure they load correctly on all servers.

  3. HOW TO CHANGE MUSIC:
     - Find the 'musicTrack' and 'songPresets' objects below.
     - Replace the 'url' with a direct link to an MP3 file.
     - Replace 'cover' with an image link for the vinyl record cover art.
  ============================================================================
*/

export const DEFAULT_COUPLE_DATA = {
  partner1: "Mouaz",
  partner2: "Nahed",
  anniversaryDate: "2026-09-08T23:23:00",
  tagline: "Two souls, one heartbeat, an infinite journey of love.",
  loveStoryTitle: "Our Forever Story",
  heroSubtitle: "Every love story is beautiful, but ours is my absolute favorite.",

  // Romantic Audio tracks
  musicTrack: {
    title: "Lover's Nocturne (Piano & Strings)",
    artist: "Romantic Ensemble",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112187.mp3",
    cover: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop"
  },

  // Custom Song Presets
  songPresets: [
    {
      title: "Romantic Piano Melody",
      artist: "Sweet Eternity",
      url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112187.mp3",
      cover: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Midnight Starlight Acoustic",
      artist: "Moonlight Strings",
      url: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a8b898.mp3?filename=gentle-acoustic-guitar-10370.mp3",
      cover: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Deep Velvet Love",
      artist: "Amour Symphony",
      url: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=love-ambient-14282.mp3",
      cover: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
    }
  ],

  // Timeline Milestones
  milestones: [
    {
      id: 1,
      date: "September 8, 2026",
      title: "Our Special Beginning",
      location: "Where Our Hearts Met",
      description: "The moment everything changed and our paths became forever intertwined in the most beautiful way.",
      image: "./photos/photo1.jpeg",
      category: "First Met"
    },
    {
      id: 2,
      date: "December 31, 2026",
      title: "Midnight Promise",
      location: "Under the Stars",
      description: "As the year turned, we whispered our first dreams of a shared lifetime together.",
      image: "./photos/photo2.jpeg",
      category: "Milestone"
    },
    {
      id: 3,
      date: "Future Dream",
      title: "Our Seaside Escape",
      location: "Amalfi Coast, Italy",
      description: "Sun-kissed sunsets, endless ocean breezes, and walking hand in hand along warm stone alleys.",
      image: "./photos/photo3.jpeg",
      category: "Travel"
    },
    {
      id: 4,
      date: "Our Haven",
      title: "Building Our Home",
      location: "Our Cozy Sanctuary",
      description: "Creating a warm space filled with laughter, shared coffee mornings, and endless love.",
      image: "./photos/photo4.jpeg",
      category: "Home"
    },
    {
      id: 5,
      date: "Today & Forever",
      title: "Writing Our Next Chapter",
      location: "Everywhere With You",
      description: "Hand in hand, stepping into tomorrow with even deeper passion, patience, and joy.",
      image: "./photos/photo5.jpeg",
      category: "Future"
    }
  ],

  // Photos Gallery
  photos: [
    {
      id: 1,
      title: "Golden Hour Embrace",
      date: "September 2026",
      caption: "You are my golden hour in every sunset.",
      url: "./photos/photo6.jpeg",
      tag: "Romantic"
    },
    {
      id: 2,
      title: "Starry Night Stroll",
      date: "Moonlit Evening",
      caption: "Cold hands, warm hearts, infinite stars above.",
      url: "./photos/photo7.jpeg",
      tag: "Dates"
    },
    {
      id: 3,
      title: "Pure Joy",
      date: "Recent",
      caption: "Your smile is my favorite view in the entire world.",
      url: "./photos/photo8.jpeg",
      tag: "Joy"
    },
    {
      id: 4,
      title: "Sunset Serenade",
      date: "Summer",
      caption: "Lost in the rhythm of your laughter.",
      url: "./photos/photo9.jpeg",
      tag: "Travel"
    },
    {
      id: 5,
      title: "Cozy Sunday Morning",
      date: "Everyday",
      caption: "Lazy mornings, warm tea, and endless cuddles.",
      url: "./photos/photo10.jpeg",
      tag: "Everyday"
    },
    {
      id: 6,
      title: "Candlelight Night",
      date: "Special Date",
      caption: "To a million more candlelit memories with you.",
      url: "./photos/photo11.jpeg",
      tag: "Romantic"
    }
  ],

  // Reasons Why I Love You
  reasonsToLove: [
    {
      id: 1,
      title: "Your Heart of Gold",
      text: "The effortless kindness you show to everyone around you inspires me every single day."
    },
    {
      id: 2,
      title: "Your Infectious Smile",
      text: "No matter how dark the day is, one flash of your smile lights up my entire world."
    },
    {
      id: 3,
      title: "Our Special Connection",
      text: "That silent look we give each other across a crowded room where we both burst into joy."
    },
    {
      id: 4,
      title: "How Safe You Make Me Feel",
      text: "Wrapped in your arms, the chaotic world outside fades into absolute peace."
    },
    {
      id: 5,
      title: "Your Unwavering Support",
      text: "You believe in my wildest dreams even before I dare to believe in them myself."
    },
    {
      id: 6,
      title: "Simply Being You",
      text: "Authentic, gentle, passionate, and beautifully unique. I wouldn't change a single thing."
    }
  ],

  // Love Notes
  loveLetter: `My Dearest Nahed,

From the moment you entered my life, everything turned a little brighter, warmer, and infinitely more meaningful.

Thank you for being my anchor when storms arise, my favorite conversation at midnight, and my peaceful sanctuary at the end of every day. Every song reminds me of your smile, and every sunset pales in comparison to the light in your eyes.

I promise to love you fiercely through every season, to dance with you in the rain, to celebrate all your victories, and to hold your hand through whatever comes our way.

Forever & always yours,
Mouaz`,

  // Shared Bucket List
  bucketList: [
    { id: 1, title: "Watch the Northern Lights from a glass igloo", completed: true },
    { id: 2, title: "Take a romantic hot air balloon ride at sunrise", completed: false },
    { id: 3, title: "Road trip along the coastal highway with our favorite playlist", completed: true },
    { id: 4, title: "Learn to cook an authentic 3-course Italian meal together", completed: false },
    { id: 5, title: "Adopt a cute puppy and build a garden together", completed: false },
    { id: 6, title: "Renew our vows under a starry night sky in Paris", completed: false }
  ]
};
