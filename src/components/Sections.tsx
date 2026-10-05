import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { EVENT_CONFIG } from '../config';
import { SuperheroCountdown } from './Countdown';

export function InvitationContent() {
  const images = [
    '1.JPG', '2.JPG', 'timer_bg.jpg', '3.jpg', '4.JPG', '5.JPG', '6.JPG', '7.jpg', '8.JPG'
  ];

  return (
    <div className="w-full relative flex flex-col bg-black pb-10">
      {images.map((img, idx) => (
        <section
          key={idx}
          className={`relative w-full ${idx > 0 ? '-mt-4' : ''}`}
          style={idx > 0 ? {
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 24px)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 24px)'
          } : undefined}
        >
          <img
            src={`${import.meta.env.BASE_URL}assets/urutan gambar untuk halaman/${img}`}
            alt={`Section ${idx + 1}`}
            className="w-full h-auto block"
          />

          {/* Overlay Animated Title on Image 1 */}
          {img === '1.JPG' && (
            <RazkaTitle className="top-[30%] inset-x-0" />
          )}

          {/* Overlay Maps Button on Image 2 */}
          {img === '2.JPG' && (
            <div className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2">
              <LocationButton />
            </div>
          )}

          {/* Overlay Superhero Countdown Timer on timer_bg.jpg */}
          {img === 'timer_bg.jpg' && (
            <div className="absolute top-[51%] -translate-y-1/2 inset-x-0 flex items-center justify-center">
              <SuperheroCountdown />
            </div>
          )}

          {/* Overlay Animated Title on Image 5 */}
          {img === '5.JPG' && (
            <RazkaTitle className="top-[31%] inset-x-0" />
          )}

          {/* Overlay RSVP Form perfectly inside Image 8 */}
          {img === '8.JPG' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pt-[15%] gap-6">
              <ModernRSVPForm />
              <LocationButton />
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

function ModernRSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [attendStatus, setAttendStatus] = useState<string | null>(null);
  const [guestNameState, setGuestNameState] = useState(new URLSearchParams(window.location.search).get('to') || '');
  const [guestWishes, setGuestWishes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Construct WhatsApp Message
    const phoneNumber = "081241302504"; // The number provided by the user

    // Convert local format (08xxx) to international format (628xxx)
    let cleanNumber = phoneNumber.replace(/\\D/g, '');
    if (cleanNumber.startsWith('0')) {
      cleanNumber = '62' + cleanNumber.substring(1);
    }

    const isAttending = attendStatus === 'yes' ? 'Attending (YES, I WILL! 🦸‍♂️)' : 'Not Attending (NO, SORRY 💤)';

    let message = `Hello! I am *${guestNameState}* confirming my RSVP for Razka's birthday party.\n\nAttendance Status: *${isAttending}*`;
    if (guestWishes.trim().length > 0) {
      message += `\n\nWishes: "${guestWishes}"`;
    }
    message += `\n\nThank you! 🕷️🕸️`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=${cleanNumber}&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (submitted) {
    return (
      <div className="w-[90%] max-w-[360px] bg-white/90 backdrop-blur-md border-2 border-white/50 flex flex-col items-center justify-center py-10 px-6 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.3)] animate-bounce-slow">
        <div className="text-[4rem] mb-2 animate-pulse">🎉</div>
        <h3 className="font-poppins font-black text-2xl text-spiderBlue mb-2 text-center">YAY! THANK YOU!</h3>
        <p className="font-poppins font-medium text-gray-700 text-center text-sm">
          Your response has been saved. We can't wait for the adventure! 🕸️
        </p>
      </div>
    );
  }

  return (
    <div className="w-[90%] max-w-[360px] bg-white/85 backdrop-blur-lg border border-white/60 rounded-[2rem] p-6 shadow-[0_10px_40px_rgba(0,0,0,0.3)] relative overflow-hidden">
      {/* Cute little decoration */}
      <div className="absolute -top-6 -right-6 text-[4rem] opacity-20 transform rotate-12">🕷️</div>

      <h2 className="font-bangers text-[2.5rem] text-spiderRed text-center leading-none mb-1 tracking-wide">RSVP</h2>
      <p className="font-poppins text-gray-700 text-center text-xs font-semibold mb-5">
        Will you join <span className="text-spiderBlue">{EVENT_CONFIG.childNameFirst}'s</span> adventure?
      </p>

      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <div className="mb-4">
          <label className="block font-poppins font-bold text-gray-800 text-xs mb-1 ml-1 uppercase tracking-wider">Guest Name</label>
          <input
            type="text"
            value={guestNameState}
            onChange={(e) => setGuestNameState(e.target.value)}
            required
            className="w-full border-2 border-gray-200 p-3 font-poppins text-gray-900 text-sm bg-white/70 focus:outline-none focus:border-spiderBlue focus:ring-2 focus:ring-spiderBlue/20 rounded-xl transition-all"
            placeholder="Enter your name..."
          />
        </div>

        <div className="mb-4">
          <label className="block font-poppins font-bold text-gray-800 text-xs mb-1 ml-1 uppercase tracking-wider">Wishes</label>
          <textarea
            value={guestWishes}
            onChange={(e) => setGuestWishes(e.target.value)}
            className="w-full border-2 border-gray-200 p-3 font-poppins text-gray-900 text-sm bg-white/70 focus:outline-none focus:border-spiderBlue focus:ring-2 focus:ring-spiderBlue/20 rounded-xl transition-all resize-none h-20"
            placeholder="Write a birthday wish for Razka..."
          />
        </div>

        <div className="flex gap-2 mb-6">
          <label className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${attendStatus === 'yes' ? 'bg-spiderRed/10 border-spiderRed' : 'bg-white/60 border-gray-200 hover:border-spiderRed/50'}`}>
            <input type="radio" name="attend" value="yes" required className="hidden" onChange={() => setAttendStatus('yes')} />
            <span className="text-2xl mb-1">🦸‍♂️</span>
            <span className={`font-poppins font-bold text-xs ${attendStatus === 'yes' ? 'text-spiderRed' : 'text-gray-500'}`}>Yes, I will!</span>
          </label>

          <label className={`flex-1 flex flex-col items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${attendStatus === 'no' ? 'bg-spiderBlue/10 border-spiderBlue' : 'bg-white/60 border-gray-200 hover:border-spiderBlue/50'}`}>
            <input type="radio" name="attend" value="no" required className="hidden" onChange={() => setAttendStatus('no')} />
            <span className="text-2xl mb-1">💤</span>
            <span className={`font-poppins font-bold text-xs ${attendStatus === 'no' ? 'text-spiderBlue' : 'text-gray-500'}`}>Sorry, can't</span>
          </label>
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-spiderRed to-[#b91c22] text-white font-poppins font-bold text-sm py-3 px-4 rounded-xl shadow-lg hover:shadow-spiderRed/40 hover:-translate-y-0.5 active:translate-y-1 transition-all uppercase tracking-widest flex justify-center items-center gap-2">
          Send RSVP <span className="text-lg leading-none">🕸️</span>
        </button>
      </form>
    </div>
  );
}

function LocationButton() {
  return (
    <a
      href={EVENT_CONFIG.ceremony.mapLink}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2 bg-[#0a3a8a]/90 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 shadow-xl hover:bg-[#0a3a8a] active:scale-95 transition-all font-poppins font-semibold text-sm tracking-widest z-50"
    >
      <MapPin size={16} />
      VIEW LOCATION
    </a>
  );
}

function RazkaTitle({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -15 }}
      whileInView={{ scale: 1, rotate: [-5, 2, -5] }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{
        scale: { type: "spring", bounce: 0.6, duration: 0.8 },
        rotate: { repeat: Infinity, duration: 4, ease: "easeInOut" }
      }}
      className={`absolute flex justify-center items-center pointer-events-none z-40 ${className || ''}`}
    >
      <div className="relative text-center w-full px-4">
        <h1 className="font-bangers text-[3rem] md:text-[3.5rem] text-spiderYellow text-outline-black tracking-widest uppercase leading-none transform -skew-y-3 drop-shadow-[4px_4px_0_rgba(185,28,34,1)]">
          RAZKA
        </h1>
      </div>
    </motion.div>
  );
}
