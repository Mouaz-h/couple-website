import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Calendar, Sparkles } from 'lucide-react';

const TimeCounter = ({ date }) => {
  const [timeLeft, setTimeLeft] = useState({
    years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const anniversary = new Date(date);
      const now = new Date();
      const diff = Math.max(0, now.getTime() - anniversary.getTime());

      const seconds = Math.floor(diff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const daysTotal = Math.floor(hours / 24);

      const years = Math.floor(daysTotal / 365.25);
      const remainingDays = Math.floor(daysTotal % 365.25);
      const months = Math.floor(remainingDays / 30.44);
      const days = Math.floor(remainingDays % 30.44);

      setTimeLeft({
        years,
        months,
        days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [date]);

  const TimeUnit = ({ label, value }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4 my-2">
      <span className="text-3xl sm:text-5xl font-serif text-white text-glow-pink tracking-tight">{value}</span>
      <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#ff75b3] mt-1 font-semibold">{label}</span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center mt-8 glass rounded-3xl p-6 sm:p-8 border-t border-b border-[#ff2a85]/30 shadow-2xl backdrop-blur-2xl">
      <TimeUnit label="Years" value={timeLeft.years} />
      <TimeUnit label="Months" value={timeLeft.months} />
      <TimeUnit label="Days" value={timeLeft.days} />
      <TimeUnit label="Hours" value={timeLeft.hours} />
      <TimeUnit label="Mins" value={timeLeft.minutes} />
      <TimeUnit label="Secs" value={timeLeft.seconds} />
    </div>
  );
};

export default function Hero({ data }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 overflow-hidden">
      {/* Background Glowing Orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#ff2a85]/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-[#4a0e17]/40 rounded-full blur-[160px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-[#e6c594]/40"></div>
          <span className="text-xs uppercase tracking-[0.35em] font-semibold text-[#e6c594] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff75b3]" /> Together Forever <Sparkles className="w-3.5 h-3.5 text-[#ff75b3]" />
          </span>
          <div className="h-[1px] w-12 bg-[#e6c594]/40"></div>
        </div>

        <h1 className="text-6xl sm:text-8xl md:text-9xl mb-6 font-serif font-normal text-gradient-romantic leading-tight tracking-tight">
          {data.partner1} <span className="font-script text-[#ff2a85] text-7xl sm:text-9xl md:text-[10rem] mx-2 inline-block animate-float" style={{ animationDuration: '4s' }}>&</span> {data.partner2}
        </h1>

        <div className="flex items-center justify-center gap-3 mb-10 text-[#f7d6e0]/90">
          <Heart className="w-4 h-4 text-[#ff2a85] fill-[#ff2a85]" />
          <p className="italic font-serif text-xl sm:text-2xl tracking-wide max-w-2xl font-light">
            "{data.tagline}"
          </p>
          <Heart className="w-4 h-4 text-[#ff2a85] fill-[#ff2a85]" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.25em] font-medium text-white/70 flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-[#ff2a85]" /> Time Traveled In Love
          </p>
          <TimeCounter date={data.anniversaryDate} />
        </div>
      </motion.div>

      {/* Floating Animated Hearts */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-25"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${6 + Math.random() * 8}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          >
            <Heart className="text-[#ff2a85] w-6 h-6" />
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#e0a9bc]/60">Scroll to Explore</span>
        <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-1.5 h-2 bg-[#ff2a85] rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
