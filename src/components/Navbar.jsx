import React, { useState, useEffect } from 'react';
import { Heart, Menu, X } from 'lucide-react';

export default function Navbar({ partner1, partner2 }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
      scrolled
        ? 'bg-dark-900/90 backdrop-blur-lg border-b border-white/10 shadow-2xl py-3.5'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Couple Monogram / Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-romantic-pink to-romantic-deepRed flex items-center justify-center text-white font-serif text-lg font-bold shadow-lg shadow-romantic-pink/30 group-hover:scale-105 transition-transform">
            {partner1[0]}&{partner2[0]}
          </div>
          <span className="font-serif text-lg tracking-wide text-white group-hover:text-romantic-softPink transition-colors">
            {partner1} <span className="text-romantic-pink font-script text-2xl mx-1">&</span> {partner2}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wider uppercase text-roseGold-light/80">
          <a href="#story" className="hover:text-romantic-softPink transition-colors">Our Story</a>
          <a href="#memories" className="hover:text-romantic-softPink transition-colors">Memories</a>
          <a href="#letters" className="hover:text-romantic-softPink transition-colors">Love Notes</a>
          <a href="#bucketlist" className="hover:text-romantic-softPink transition-colors">Bucket List</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white hover:text-romantic-pink transition-colors"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-dark-800/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-4 text-center animate-fade-in shadow-2xl">
          <a
            href="#story"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-romantic-pink py-2 text-sm uppercase tracking-wider font-medium"
          >
            Our Story
          </a>
          <a
            href="#memories"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-romantic-pink py-2 text-sm uppercase tracking-wider font-medium"
          >
            Memories
          </a>
          <a
            href="#letters"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-romantic-pink py-2 text-sm uppercase tracking-wider font-medium"
          >
            Love Notes
          </a>
          <a
            href="#bucketlist"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-romantic-pink py-2 text-sm uppercase tracking-wider font-medium"
          >
            Bucket List
          </a>
        </div>
      )}
    </nav>
  );
}
