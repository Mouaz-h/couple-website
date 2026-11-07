import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Disc, Music, Volume2, VolumeX, SkipForward } from 'lucide-react';

export default function MusicPlayer({ currentTrack, songPresets, onTrackChange }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.6;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio autoplay blocked or failed:", err);
      });
    }
  };

  const handleNextTrack = () => {
    const currentIndex = songPresets.findIndex(s => s.url === currentTrack.url);
    const nextIndex = (currentIndex + 1) % songPresets.length;
    onTrackChange(songPresets[nextIndex]);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(err => console.log("Play error:", err));
    }
  }, [currentTrack]);

  return (
    <>
      <audio
        ref={audioRef}
        src={currentTrack.url}
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Music Player Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Expanded Track Picker */}
        {isExpanded && (
          <div className="glass-card bg-dark-800/95 p-4 rounded-2xl shadow-2xl border border-romantic-pink/30 w-72 backdrop-blur-xl animate-fade-in">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest text-roseGold font-semibold flex items-center gap-1">
                <Music className="w-3.5 h-3.5 text-romantic-pink" /> Our Soundtrack
              </span>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs text-roseGold-light/60 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 mb-3">
              {songPresets.map((song, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onTrackChange(song);
                    setIsPlaying(true);
                  }}
                  className={`w-full text-left p-2 rounded-xl text-xs flex items-center gap-2.5 transition-all ${
                    currentTrack.url === song.url
                      ? 'bg-romantic-pink/20 border border-romantic-pink/40 text-white'
                      : 'hover:bg-white/5 text-roseGold-light'
                  }`}
                >
                  <img src={song.cover} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <div className="overflow-hidden">
                    <p className="font-medium truncate">{song.title}</p>
                    <p className="text-[10px] text-roseGold-light/60 truncate">{song.artist}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main Player Pill */}
        <div className="glass bg-dark-800/90 hover:bg-dark-800/95 border border-romantic-pink/40 rounded-full px-4 py-2.5 shadow-2xl shadow-romantic-pink/10 flex items-center gap-3 backdrop-blur-md transition-all duration-300">
          {/* Spinning Vinyl Cover */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative cursor-pointer group"
            title="Choose soundtrack"
          >
            <div className={`w-10 h-10 rounded-full overflow-hidden border border-romantic-pink/60 ${isPlaying ? 'animate-spin-slow' : ''}`}>
              <img src={currentTrack.cover} alt="Vinyl" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-dark-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Disc className="w-4 h-4 text-romantic-pink animate-pulse" />
            </div>
          </div>

          {/* Track Info */}
          <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer max-w-[140px] sm:max-w-[180px]">
            <p className="text-xs font-medium text-white truncate">{currentTrack.title}</p>
            <div className="flex items-center gap-1.5">
              {isPlaying ? (
                <div className="flex items-end h-2.5 gap-0.5">
                  <span className="music-bar"></span>
                  <span className="music-bar"></span>
                  <span className="music-bar"></span>
                  <span className="music-bar"></span>
                </div>
              ) : (
                <span className="text-[10px] text-roseGold-light/60">Paused</span>
              )}
              <span className="text-[10px] text-roseGold-light/60 truncate">• {currentTrack.artist}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 pl-2 border-l border-white/10">
            <button
              onClick={togglePlay}
              className="w-9 h-9 rounded-full bg-romantic-pink text-white flex items-center justify-center hover:bg-romantic-softPink transition-all shadow-md shadow-romantic-pink/30 hover:scale-105 active:scale-95"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={handleNextTrack}
              className="p-2 text-roseGold hover:text-white transition-colors"
              title="Next Song"
              aria-label="Next song"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
