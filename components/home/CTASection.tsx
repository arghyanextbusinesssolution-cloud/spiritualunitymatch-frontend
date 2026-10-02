"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-28 px-6 bg-gradient-to-b from-[#0b0518] via-[#13092b] to-[#0b0518]">
      {/* ── Topographic / Ambient Sparkle Background ── */}
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0%, #0b0518 100%), 
                            url("data:image/svg+xml,%3Csvg width='1000' height='1000' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23a855f7' stroke-width='1.2' stroke-opacity='0.25'%3E%3Cpath d='M-200,400 C100,200 400,600 700,400 T1200,400' /%3E%3Cpath d='M-200,440 C100,240 400,640 700,440 T1200,440' /%3E%3Cpath d='M-200,480 C100,280 400,680 700,480 T1200,480' /%3E%3Cpath d='M-200,520 C100,320 400,720 700,520 T1200,520' /%3E%3Cpath d='M-200,560 C100,360 400,760 700,560 T1200,560' /%3E%3Cpath d='M-200,360 C100,160 400,560 700,360 T1200,360' /%3E%3Cpath d='M-200,320 C100,120 400,520 700,320 T1200,320' /%3E%3Cpath d='M-200,280 C100,80 400,480 700,280 T1200,280' /%3E%3Cpath d='M-200,240 C100,40 400,440 700,240 T1200,240' /%3E%3Cpath d='M-200,200 C100,0 400,400 700,200 T1200,200' /%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "150% 150%",
          backgroundPosition: "center",
        }}
      />

      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-rose-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* ── Headline ── */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-white font-extrabold italic tracking-tight leading-tight mb-4 drop-shadow-md"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Meet Someone Who Truly Gets You ❤️
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-purple-200/80 text-base sm:text-lg max-w-2xl mb-4 leading-relaxed"
        >
          Your journey toward meaningful love can start with one genuine connection.
          Join a community where spirituality, authenticity, personal growth, and meaningful relationships come together.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-purple-300/70 text-sm sm:text-base max-w-xl mb-10 leading-relaxed"
        >
          Whether you are exploring{" "}
          <strong className="text-pink-300 font-semibold">soulmate matchmaking in New York</strong>{" "}
          or simply looking for a deeper way to meet someone, your journey starts here.
        </motion.p>

        {/* ── CTA Button ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/auth/register"
            className="group relative overflow-hidden inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg text-white shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:shadow-[0_0_60px_rgba(168,85,247,0.6)] transition-all duration-300 hover:scale-105"
            style={{
              background:
                "linear-gradient(135deg, #581c87 0%, #9d174d 50%, #be123c 100%)",
            }}
          >
            <Heart className="w-6 h-6 fill-pink-400 text-pink-300 group-hover:scale-110 transition-transform duration-300" />
            Start Your Journey Free
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-white/40 transition-colors" />
          </Link>
        </motion.div>

        {/* ── Supporting text ── */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-purple-200/60 text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-center"
        >
          Be Authentic. Connect Consciously. Find Your Alignment.
        </motion.p>
      </div>
    </section>
  );
}
