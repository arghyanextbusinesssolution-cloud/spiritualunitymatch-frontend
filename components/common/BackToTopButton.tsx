"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min((scrollY / total) * 100, 100) : 0);
      setVisible(scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const r = 20;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;

  return (
    <motion.button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-[#0f0a0a] shadow-[0_0_20px_rgba(255,0,0,0.2)] border border-white/20 flex items-center justify-center focus-ring transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(255,0,0,0.4)]"
    >
      {/* Ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56" aria-hidden>
        <circle cx="28" cy="28" r={r} stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="none" />
        <circle
          cx="28"
          cy="28"
          r={r}
          stroke="white"
          strokeWidth="3"
          fill="none"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
      <ArrowUp className="w-5 h-5 text-white relative z-10" />
    </motion.button>
  );
}
