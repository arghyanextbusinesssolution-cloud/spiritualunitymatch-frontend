"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-32 px-6 bg-[#0f0a0a]">
      {/* ── Topographic Line Background ── */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, #0f0a0a 100%), 
                            url("data:image/svg+xml,%3Csvg width='1000' height='1000' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23ff0000' stroke-width='1.5' stroke-opacity='0.15'%3E%3Cpath d='M-200,400 C100,200 400,600 700,400 T1200,400' /%3E%3Cpath d='M-200,440 C100,240 400,640 700,440 T1200,440' /%3E%3Cpath d='M-200,480 C100,280 400,680 700,480 T1200,480' /%3E%3Cpath d='M-200,520 C100,320 400,720 700,520 T1200,520' /%3E%3Cpath d='M-200,560 C100,360 400,760 700,560 T1200,560' /%3E%3Cpath d='M-200,360 C100,160 400,560 700,360 T1200,360' /%3E%3Cpath d='M-200,320 C100,120 400,520 700,320 T1200,320' /%3E%3Cpath d='M-200,280 C100,80 400,480 700,280 T1200,280' /%3E%3Cpath d='M-200,240 C100,40 400,440 700,240 T1200,240' /%3E%3Cpath d='M-200,200 C100,0 400,400 700,200 T1200,200' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '150% 150%',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
        {/* ── The Pill Button ── */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative group w-full max-w-[800px] h-[180px] sm:h-[220px] rounded-full overflow-hidden shadow-[0_0_50px_rgba(120,0,0,0.5)] flex items-center justify-center transition-all duration-500"
          style={{
            background: 'linear-gradient(135deg, #3d0000 0%, #1a0000 100%)',
          }}
        >
          {/* Edge Glow Highlight (Top-Right) */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/30 blur-[40px] pointer-events-none" />
          <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-red-500 blur-[60px] opacity-40 -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          {/* Content Wrapper */}
          <div className="flex items-center gap-6 sm:gap-14 px-8">
            <h2 
              className="text-white font-bold italic tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Meet your love
            </h2>
            <div className="relative flex-shrink-0">
              <Heart className="w-14 h-14 sm:w-24 sm:h-24 fill-[#ff0000] text-[#ff0000] drop-shadow-[0_0_20px_rgba(255,0,0,0.9)]" />
              <div className="absolute inset-0 w-full h-full bg-red-600 blur-2xl opacity-30 animate-pulse -z-10 rounded-full" />
            </div>
          </div>

          {/* Border Highlight */}
          <div className="absolute inset-0 rounded-full border-[0.5px] border-white/5" />
        </motion.button>

        {/* ── Subtext ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-white/50 text-xs sm:text-sm font-light tracking-[0.2em] uppercase text-center"
        >
          Download the app now and find your perfect match today!
        </motion.p>
      </div>
    </section>
  );
}
