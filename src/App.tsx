import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { InvitationContent } from './components/Sections';

const getGuestName = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get('to') || 'Guest';
};

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const guestName = getGuestName();

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio play failed', e));
      setIsPlaying(true);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden bg-black sm:flex sm:justify-center">
      <div className="relative w-full max-w-[480px] h-full bg-black shadow-2xl overflow-hidden">
        <audio ref={audioRef} loop src={`${import.meta.env.BASE_URL}assets/audio/music.mp3`} />
        
        <AnimatePresence>
          {!isOpen && <OpeningScreen onOpen={handleOpen} guestName={guestName} />}
        </AnimatePresence>

        {isOpen && (
          <div ref={scrollRef} className="w-full h-full overflow-y-auto overflow-x-hidden hide-scrollbar relative" id="scroll-container">
            <FloatingAudioButton isPlaying={isPlaying} toggle={toggleAudio} />
            <InvitationContent />
          </div>
        )}
      </div>
    </div>
  );
}

function FloatingAudioButton({ isPlaying, toggle }: { isPlaying: boolean, toggle: () => void }) {
  return (
    <motion.button 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      onClick={toggle}
      className="fixed top-4 right-4 z-50 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-[3px] border-black comic-shadow sm:absolute"
    >
      {isPlaying ? <Volume2 size={24} className="text-spiderRed" /> : <VolumeX size={24} className="text-spiderRed" />}
    </motion.button>
  );
}

function OpeningScreen({ onOpen, guestName }: { onOpen: () => void; guestName: string }) {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1, y: "-100%" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="absolute inset-0 z-[100] bg-black flex flex-col justify-center items-center overflow-hidden cursor-pointer"
      onClick={onOpen}
    >
      <img src={`${import.meta.env.BASE_URL}assets/urutan gambar untuk halaman/opening.jpg`} className="absolute w-full h-full object-cover" alt="Opening" />
      
      {/* Invisible Interactive Overlay for "TAP TO OPEN" */}
      <motion.div 
        className="absolute bottom-[10%] w-full h-[20%] flex justify-center items-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="w-[80%] h-[80%] bg-white/0 rounded-full" />
      </motion.div>
      
      <div className="absolute top-[8%] bg-black/60 px-6 py-2 rounded-full text-white font-poppins font-bold text-lg border-2 border-white comic-shadow">
        Dear {guestName},
      </div>
    </motion.div>
  );
}
