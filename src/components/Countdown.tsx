"use client";
import React, { useEffect, useState } from 'react';

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    // Target: February 28, 2026
    const targetDate = new Date("2026-02-28T00:00:00Z").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    const timerId = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex gap-4 items-center justify-center text-center mt-6 mb-10 w-full max-w-lg mx-auto">
      <div className="bg-[#0c1222] border-t border-emerald-500/50 w-24 h-24 rounded-2xl flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(16,185,129,0.15)]">
         <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">{timeLeft.days}</span>
         <span className="text-xs uppercase text-emerald-500 font-bold tracking-widest mt-1">Days</span>
      </div>
      <span className="text-2xl font-bold text-gray-700">:</span>
      <div className="bg-[#0c1222] border-t border-emerald-500/30 w-20 h-20 rounded-2xl flex flex-col items-center justify-center">
         <span className="text-2xl font-black text-white">{timeLeft.hours}</span>
         <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mt-1">Hrs</span>
      </div>
      <span className="text-2xl font-bold text-gray-700">:</span>
      <div className="bg-[#0c1222] border-t border-emerald-500/30 w-20 h-20 rounded-2xl flex flex-col items-center justify-center">
         <span className="text-2xl font-black text-white">{timeLeft.minutes}</span>
         <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest mt-1">Min</span>
      </div>
    </div>
  );
}
