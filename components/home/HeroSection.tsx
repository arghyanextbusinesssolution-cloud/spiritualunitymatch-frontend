"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/contexts/LoadingContext";

const LOGO = "/logo2.png";

export default function HeroSection() {
  const { startLoading } = useLoading();

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center pt-20">
      {/* Ambient background orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-gradient opacity-10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-red-400 to-rose-600 opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full bg-brand-gradient-light blur-2xl" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(0 100% 55% / 0.05) 1px, transparent 1px), linear-gradient(to right, hsl(0 100% 55% / 0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-inner w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Left column ── */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            {/* Logo */}
            <motion.div
              className="mb-8 flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <Image
                src={LOGO}
                alt="Spiritual Unity Match Logo"
                width={180}
                height={180}
                priority
                className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 object-contain drop-shadow-xl"
              />
            </motion.div>

            {/* Headline */}
            <h1
              className="font-playfair text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight text-center lg:text-left"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Find{" "}
              <span className="bg-gradient-to-r from-[#ff1a1a] to-[#ff8080] bg-clip-text text-transparent">Alignment</span>
              <br />
              Before{" "}
              <span className="relative inline-block">
                Attraction
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 300 12"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M2 10 Q75 2 150 6 Q225 10 298 4"
                    stroke="url(#underline-grad)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop stopColor="#ff1a1a" />
                      <stop offset="1" stopColor="#ff8080" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>

            {/* Sub-headline / Copy */}
            <div className="space-y-4 text-base sm:text-lg text-gray-600 mb-8 max-w-xl leading-relaxed text-center lg:text-left">
              <p>
                Finding the right person is about more than attraction. It is about meeting someone who understands your values, respects your journey, and wants to build a meaningful relationship.
              </p>
              <p className="font-medium text-gray-700">
                Spiritual Unity Match is a <strong className="text-gray-900 font-semibold">spiritual dating site in New York</strong> created for conscious singles who are looking for genuine connection, shared values, and relationships with purpose.
              </p>
              <p className="text-gray-500 text-sm sm:text-base">
                Whether you are exploring spirituality, personal growth, mindfulness, or simply looking for someone who sees relationships differently, you can begin your journey here.
              </p>
            </div>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link
                href="/auth/register"
                onClick={startLoading}
                className="group relative overflow-hidden px-8 py-4 rounded-full font-semibold text-base sm:text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105 text-center text-white"
                style={{ background: 'linear-gradient(to right, #ff1a1a 0%, #ff8080 100%)' }}
              >
                <span className="relative z-10">Start Your Journey Free ✨</span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </Link>

              <Link
                href="#plans"
                className="border-2 border-[#ff8080] text-[#ff1a1a] px-8 py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-red-50 hover:border-[#ff1a1a] transition-all duration-300 text-center"
              >
                View Plans
              </Link>
            </div>

            {/* Tagline / Core Pillars Bar */}
            <motion.div
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-xs sm:text-sm font-medium text-purple-900 bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border border-purple-100 rounded-2xl px-4 py-3 shadow-xs"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                Conscious Connections
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                Meaningful Conversations
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                Authentic Relationships
              </span>
            </motion.div>
          </motion.div>

          {/* ── Right column – Image Slider ── */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
          >
            <HeroImageSlider />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Hero Image Slider (local, no extra chunk) ──────────────────────────── */
const SLIDES = [
  "https://res.cloudinary.com/dxx54fccl/image/upload/v1776788211/photo1_xx7mbe.webp",
  "https://res.cloudinary.com/dxx54fccl/image/upload/v1776788211/photo2_bmtjyv.webp",
  "https://res.cloudinary.com/dxx54fccl/image/upload/v1776788210/photo3_wxhucm.webp",
];

function HeroImageSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((p) => (p + 1) % SLIDES.length),
      3500
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-red-500/20 ring-1 ring-white/60">
      {SLIDES.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === current ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={src}
            alt={`Spiritual couple ${i + 1}`}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
