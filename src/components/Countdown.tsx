import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { event_date } from '../config';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const target = new Date(targetDate).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    isPast: false,
  };
}

export function SuperheroCountdown({ targetDate = event_date }: { targetDate?: string }) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const pad = (num: number) => String(num).padStart(2, '0');

  const units = [
    { label: 'DAYS', value: pad(timeLeft.days) },
    { label: 'HOURS', value: pad(timeLeft.hours) },
    { label: 'MINUTES', value: pad(timeLeft.minutes) },
    { label: 'SECONDS', value: pad(timeLeft.seconds) },
  ];

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 15 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{
        type: "spring",
        stiffness: 140,
        damping: 22,
        mass: 0.7
      }}
      className="w-full flex flex-col items-center justify-center px-4 z-20 pointer-events-auto will-change-transform"
    >
      {/* Action Subtitle Badge */}
      <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-spiderRed to-[#b3141b] border-2 border-black comic-shadow mb-3 -rotate-1 shadow-md">
        <span className="text-yellow-300 text-xs">🕷️</span>
        <span className="font-['Bangers'] text-white text-xs sm:text-sm tracking-widest drop-shadow-[1px_1px_0px_#000]">
          COUNTDOWN TO MISSION
        </span>
        <span className="text-yellow-300 text-xs">🕸️</span>
      </div>

      {/* Countdown Grid or Celebration */}
      {timeLeft.isPast ? (
        <div className="w-full max-w-[340px] bg-gradient-to-r from-spiderRed to-spiderBlue border-2 border-yellow-400 rounded-2xl p-4 text-center comic-shadow">
          <p className="font-['Bangers'] text-2xl text-white tracking-wide drop-shadow-[2px_2px_0px_#000]">
            💥 IT'S PARTY TIME! 💥
          </p>
          <p className="font-poppins text-xs font-semibold text-yellow-300 mt-1">
            The superhero adventure has officially begun!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 w-full max-w-[340px] sm:max-w-[380px]">
          {units.map((unit, idx) => (
            <div
              key={idx}
              className="relative bg-[#0b1938]/95 border-[2.5px] border-black rounded-2xl py-2.5 px-1 flex flex-col items-center justify-center shadow-[4px_4px_0px_#000] hover:scale-105 transition-transform duration-200"
            >
              {/* Corner Web Accent */}
              <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400" />

              {/* Number */}
              <span
                className="font-['Bangers'] text-3xl sm:text-4xl text-yellow-400 tracking-wider leading-none drop-shadow-[2px_2px_0px_#000]"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {unit.value}
              </span>

              {/* Label */}
              <span className="font-poppins font-black text-[9px] sm:text-[10px] text-white uppercase tracking-widest mt-1">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Event Date & Time Pill */}
      <div className="mt-3 flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-black/85 border-2 border-black comic-shadow shadow-md">
        <span className="text-white font-poppins font-bold text-[10px] sm:text-[11px] tracking-wide">
          📅 SATURDAY, OCT 10, 2026
        </span>
        <span className="text-yellow-400 text-xs">•</span>
        <span className="text-yellow-400 font-poppins font-bold text-[10px] sm:text-[11px] tracking-wide">
          ⏰ 4:00 PM
        </span>
      </div>
    </motion.div>
  );
}
