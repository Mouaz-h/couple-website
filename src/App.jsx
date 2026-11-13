import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MusicPlayer from './components/MusicPlayer';
import { DEFAULT_COUPLE_DATA } from './data/initialData';
import { Heart, Calendar, MapPin, Sparkles, Image as ImageIcon, BookOpen, CheckSquare, Plus, X, Check, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { db } from './sync';

export default function App() {
  const [coupleData] = useState(DEFAULT_COUPLE_DATA);
  const [currentTrack, setCurrentTrack] = useState(DEFAULT_COUPLE_DATA.musicTrack);
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [bucketList, setBucketList] = useState([]);
  const [newBucketItem, setNewBucketItem] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  // Real-time Gun.js Sync for Bucket List
  useEffect(() => {
    const bucket = db.get('bucketList');

    bucket.map().on((data, id) => {
      if (data) {
        setBucketList(prev => {
          const exists = prev.find(item => item.id === id);
          if (exists) {
            return prev.map(item => item.id === id ? { ...data, id } : item);
          }
          return [...prev, { ...data, id }];
        });
      } else {
        // Handle deletion
        setBucketList(prev => prev.filter(item => item.id !== id));
      }
    });

    // Initial load check - if empty, put default data
    bucket.once((data) => {
      if (!data) {
        DEFAULT_COUPLE_DATA.bucketList.forEach(item => {
          bucket.set({ title: item.title, completed: item.completed });
        });
      }
    });
  }, []);

  const triggerHeartConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#ff2a85', '#ff75b3', '#e6c594', '#e0a9bc']
    });
  };

  const toggleBucketItem = (id, currentStatus) => {
    db.get('bucketList').get(id).put({ completed: !currentStatus });
    if (!currentStatus) triggerHeartConfetti();
  };

  const deleteBucketItem = (e, id) => {
    e.stopPropagation();
    db.get('bucketList').get(id).put(null);
  };

  const addBucketItem = (e) => {
    e.preventDefault();
    if (!newBucketItem.trim()) return;
    db.get('bucketList').set({
      title: newBucketItem.trim(),
      completed: false,
      createdAt: Date.now()
    });
    setNewBucketItem('');
  };

  const categories = ['All', ...new Set(coupleData.photos.map(p => p.tag))];
  const filteredPhotos = activeTab === 'All'
    ? coupleData.photos
    : coupleData.photos.filter(p => p.tag === activeTab);

  return (
    <div className="relative min-h-screen bg-dark-900 text-roseGold-light selection:bg-romantic-pink selection:text-white">
      <Navbar
        partner1={coupleData.partner1}
        partner2={coupleData.partner2}
      />

      <main className="overflow-hidden">
        <Hero data={coupleData} />

        <section id="story" className="py-28 px-6 max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-romantic-pink">Milestones of Us</span>
            <h2 className="text-4xl sm:text-6xl font-serif text-white mt-2">Our Love Story</h2>
            <div className="w-16 h-0.5 bg-romantic-pink mx-auto mt-4"></div>
          </div>

          <div className="relative border-l border-romantic-pink/30 ml-4 sm:ml-1/2 space-y-12">
            {coupleData.milestones.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col sm:flex-row items-start ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''} group`}>
                <div className="absolute -left-[5px] sm:-left-[7px] top-6 w-3.5 h-3.5 rounded-full bg-romantic-pink border-4 border-dark-950 shadow-lg shadow-romantic-pink group-hover:scale-125 transition-transform"></div>

                <div className={`sm:w-1/2 ${index % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'} pl-8 sm:pl-0 w-full`}>
                  <div className="glass-card p-6 rounded-3xl shadow-xl hover:border-romantic-pink/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase tracking-widest text-romantic-gold font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" /> {item.date}
                      </span>
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-romantic-pink/10 text-romantic-softPink border border-romantic-pink/20">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-2xl font-serif text-white mb-2">{item.title}</h3>
                    <p className="text-xs text-roseGold/70 mb-4 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-romantic-pink" /> {item.location}
                    </p>

                    <p className="text-sm text-roseGold-light/90 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {item.image && (
                      <div
                        onClick={() => setLightboxPhoto({ url: item.image, title: item.title, caption: item.description })}
                        className="rounded-2xl overflow-hidden cursor-pointer relative group/img bg-dark-900/50"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-auto max-h-[400px] object-contain mx-auto group-hover/img:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-dark-900/10 group-hover/img:bg-transparent transition-colors"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="memories" className="py-28 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-romantic-pink">Captured Moments</span>
            <h2 className="text-4xl sm:text-6xl font-serif text-white mt-2">Our Memory Vault</h2>
            <div className="w-16 h-0.5 bg-romantic-pink mx-auto mt-4"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                  activeTab === cat
                    ? 'bg-romantic-pink text-white shadow-lg shadow-romantic-pink/30 scale-105'
                    : 'glass text-roseGold hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setLightboxPhoto(photo)}
                className="glass-card p-4 rounded-3xl cursor-pointer group hover:-translate-y-2 transition-all duration-300 shadow-2xl flex flex-col"
              >
                <div className="overflow-hidden rounded-2xl mb-4 relative bg-dark-900/50 flex items-center justify-center" style={{ minHeight: '280px' }}>
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="max-w-full max-h-[400px] object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs text-white uppercase tracking-wider font-medium flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-romantic-pink" /> Click to view full
                    </span>
                  </div>
                </div>
                <div className="px-2 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif text-lg text-white group-hover:text-romantic-softPink transition-colors">{photo.title}</h3>
                    <span className="text-[10px] text-romantic-pink uppercase tracking-widest">{photo.date}</span>
                  </div>
                  <p className="text-xs text-roseGold/70 italic font-serif mt-auto">"{photo.caption}"</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="letters" className="py-28 px-6 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-romantic-pink">Words From The Heart</span>
            <h2 className="text-4xl sm:text-6xl font-serif text-white mt-2">Our Love Letters</h2>
            <div className="w-16 h-0.5 bg-romantic-pink mx-auto mt-4"></div>
          </div>

          <div className="glass-card p-8 sm:p-12 rounded-3xl shadow-2xl border border-romantic-pink/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-romantic-pink/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-romantic-pink/20 flex items-center justify-center text-romantic-pink font-serif">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-xl text-white">A Forever Note</h4>
                  <p className="text-xs text-roseGold/60">Written with devotion</p>
                </div>
              </div>
              <button
                onClick={triggerHeartConfetti}
                className="px-4 py-2 rounded-full bg-romantic-pink/20 text-romantic-softPink text-xs uppercase tracking-wider hover:bg-romantic-pink hover:text-white transition-all flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" /> Send Love
              </button>
            </div>

            <div className="font-serif text-lg sm:text-xl text-roseGold-light leading-relaxed whitespace-pre-line italic">
              {coupleData.loveLetter}
            </div>
          </div>

          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif text-white">Reasons Why I Love You</h3>
              <p className="text-xs uppercase tracking-widest text-romantic-pink mt-2">Every little detail about us</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {coupleData.reasonsToLove.map((reason) => (
                <div key={reason.id} className="glass-card p-6 rounded-2xl hover:border-romantic-pink/40 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-romantic-pink/10 text-romantic-pink flex items-center justify-center font-serif text-sm mb-4 group-hover:bg-romantic-pink group-hover:text-white transition-colors">
                    0{reason.id}
                  </div>
                  <h4 className="font-serif text-lg text-white mb-2">{reason.title}</h4>
                  <p className="text-xs text-roseGold/80 leading-relaxed">{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="bucketlist" className="py-28 px-6 max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-romantic-pink">Future Dreams</span>
            <h2 className="text-4xl sm:text-6xl font-serif text-white mt-2">Our Shared Bucket List</h2>
            <div className="w-16 h-0.5 bg-romantic-pink mx-auto mt-4"></div>
          </div>

          <div className="glass-card p-8 rounded-3xl shadow-2xl border border-romantic-pink/20">
            <form onSubmit={addBucketItem} className="flex gap-3 mb-8">
              <input
                type="text"
                placeholder="Add a new dream to share..."
                value={newBucketItem}
                onChange={(e) => setNewBucketItem(e.target.value)}
                className="flex-1 bg-dark-900/80 border border-white/10 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-roseGold/40 focus:outline-none focus:border-romantic-pink transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-romantic-pink text-white rounded-2xl text-xs uppercase tracking-wider font-semibold hover:bg-romantic-softPink transition-all shadow-lg shadow-romantic-pink/20 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>

            <div className="space-y-3">
              {bucketList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleBucketItem(item.id, item.completed)}
                  className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all group ${
                    item.completed
                      ? 'bg-romantic-pink/10 border border-romantic-pink/30 text-roseGold/60 line-through'
                      : 'glass hover:border-romantic-pink/40 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      item.completed ? 'bg-romantic-pink text-white' : 'border border-white/20'
                    }`}>
                      {item.completed && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 text-roseGold/60">
                      {item.completed ? 'Completed' : 'Dreaming'}
                    </span>
                    <button
                      onClick={(e) => deleteBucketItem(e, item.id)}
                      className="p-1 text-roseGold/40 hover:text-romantic-pink transition-colors rounded-lg hover:bg-white/5"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 text-center border-t border-white/10 bg-dark-950">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-romantic-pink fill-romantic-pink" />
          <span className="font-serif text-xl text-white">{coupleData.partner1} & {coupleData.partner2}</span>
          <Heart className="w-4 h-4 text-romantic-pink fill-romantic-pink" />
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-roseGold/50">
          Created with endless love & devotion • Forever & Always
        </p>
      </footer>

      {lightboxPhoto && (
        <div
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 bg-dark-950/90 backdrop-blur-xl flex items-center justify-center p-6 animate-fade-in"
        >
          <div className="relative max-w-3xl w-full glass-card p-6 rounded-3xl border border-romantic-pink/40" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setLightboxPhoto(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-romantic-pink text-white flex items-center justify-center shadow-xl hover:bg-romantic-softPink transition-all"
            >
              <X className="w-5 h-5" />
            </button>
            <img src={lightboxPhoto.url} alt="" className="w-full max-h-[80vh] object-contain rounded-2xl mb-6 shadow-2xl mx-auto" />
            <h3 className="font-serif text-2xl text-white mb-1">{lightboxPhoto.title}</h3>
            {lightboxPhoto.date && <p className="text-xs text-romantic-pink uppercase tracking-widest mb-2">{lightboxPhoto.date}</p>}
            <p className="text-sm text-roseGold-light/80 italic font-serif">"{lightboxPhoto.caption || lightboxPhoto.description}"</p>
          </div>
        </div>
      )}

      <MusicPlayer
        currentTrack={currentTrack}
        songPresets={coupleData.songPresets}
        onTrackChange={setCurrentTrack}
      />
    </div>
  );
}
