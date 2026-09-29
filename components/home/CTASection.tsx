"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28 px-6 bg-gradient-to-b from-[#0b0518] via-[#13092b] to-[#0b0518]">
      {/* ── Topographic / Ambient Sparkle Background ── */}
      <div 
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, #0b0518 100%), 
                            url("data:image/svg+xml,%3Csvg width='1000' height='1000' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a855f7' stroke-width='1.2' stroke-opacity='0.25'%3E%3Cpath d='M-200,400 C100,200 400,600 700,400 T1200,400' /%3E%3Cpath d='M-200,440 C100,240 400,640 700,440 T1200,440' /%3E%3Cpath d='M-200,480 C100,280 400,680 700,480 T1200,480' /%3E%3Cpath d='M-200,520 C100,320 400,720 700,520 T1200,520' /%3E%3Cpath d='M-200,560 C100,360 400,760 700,560 T1200,560' /%3E%3Cpath d='M-200,360 C100,160 400,560 700,360 T1200,360' /%3E%3Cpath d='M-200,320 C100,120 400,520 700,320 T1200,320' /%3E%3Cpath d='M-200,280 C100,80 400,480 700,280 T1200,280' /%3E%3Cpath d='M-200,240 C100,40 400,440 700,240 T1200,240' /%3E%3Cpath d='M-200,200 C100,0 400,400 700,200 T1200,200' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '150% 150%',
          backgroundPosition: 'center',
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-rose-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* ── The Pill Button ── */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group w-full max-w-[800px] h-[180px] sm:h-[220px] rounded-full overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.35)] flex items-center justify-center transition-all duration-500 cursor-pointer border border-white/20"
          style={{
            background: 'linear-gradient(135deg, #581c87 0%, #9d174d 50%, #be123c 100%)',
          }}
        >
          {/* Edge Glow Highlight */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pink-500/40 via-purple-500/20 to-transparent blur-[30px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[180px] h-[180px] bg-pink-400 blur-[50px] opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          {/* Content Wrapper */}
          <div className="flex items-center gap-6 sm:gap-14 px-8 z-10">
            <h2 
              className="text-white font-extrabold italic tracking-tight leading-none drop-shadow-md"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Meet your love
            </h2>
            <div className="relative flex-shrink-0">
              <Heart className="w-14 h-14 sm:w-24 sm:h-24 fill-pink-500 text-rose-300 drop-shadow-[0_0_25px_rgba(244,63,94,0.9)] group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 w-full h-full bg-pink-500 blur-2xl opacity-50 animate-pulse -z-10 rounded-full" />
            </div>
          </div>

          {/* Border Highlight */}
          <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
        </motion.button>

        {/* ── Subtext ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-purple-200/80 text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-center"
        >
          Download the app now and find your perfect match today!
        </motion.p>
      </div>
    </section>
  );
}
