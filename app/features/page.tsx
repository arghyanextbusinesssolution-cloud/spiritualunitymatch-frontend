"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DefaultNavbar from "@/components/DefaultNavbar";
import SiteFooter from "@/components/home/SiteFooter";
import {
  Sparkles,
  Heart,
  ShieldCheck,
  Compass,
  MessageCircle,
  Moon,
  Sun,
  Calendar,
  Zap,
  CheckCircle2,
  Users,
  Lock,
} from "lucide-react";

const mainFeatures = [
  {
    icon: <Compass className="w-8 h-8 text-rose-600" />,
    title: "Soul Compatibility Matching",
    description:
      "Discover potential matches based on more than photos. Explore compatibility through spiritual values, personal beliefs, lifestyle preferences, relationship goals, and shared practices.",
    color: "from-rose-500 to-red-600",
    bg: "from-rose-50 to-red-50",
    badge: "Core Compatibility",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-pink-600" />,
    title: "Conscious Messaging & Icebreakers",
    description:
      "Start deeper conversations with guided prompt suggestions, meaningful icebreaker questions, and intentional discussion starters designed to move past surface chatter.",
    color: "from-pink-500 to-rose-600",
    bg: "from-pink-50 to-rose-50",
    badge: "Guided Prompts",
  },
  {
    icon: <Moon className="w-8 h-8 text-purple-600" />,
    title: "Astrological & Energy Insights (Optional)",
    description:
      "Optional features to help you explore personality dynamics and cosmic connections through zodiac sign placement, elemental compatibility, and shared interest tags.",
    color: "from-purple-500 to-pink-600",
    bg: "from-purple-50 to-pink-50",
    badge: "Cosmic Insights",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-600" />,
    title: "Verified Profiles & Sacred Safe Space",
    description:
      "Connect with peace of mind. Photo verification, active profile moderation, and simple privacy tools help maintain a safe, authentic, and respectful dating environment.",
    color: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
    badge: "Safety & Privacy",
  },
  {
    icon: <Sun className="w-8 h-8 text-amber-600" />,
    title: "Daily Intentions & Reflection Prompts",
    description:
      "Set your daily profile status, share continuous lifestyle updates, or display what you are currently focusing on spiritually to draw aligned connections.",
    color: "from-amber-500 to-rose-600",
    bg: "from-amber-50 to-rose-50",
    badge: "Daily Alignment",
  },
  {
    icon: <Calendar className="w-8 h-8 text-red-600" />,
    title: "Conscious Events & Local Gatherings",
    description:
      "Discover spiritual gatherings, meditation circles, workshops, and conscious events near you to build connections online and offline in the New York area.",
    color: "from-red-500 to-rose-600",
    bg: "from-red-50 to-rose-50",
    badge: "New York Community",
  },
];

const highlights = [
  {
    number: "98%",
    title: "Meaningful Engagement",
    desc: "Singles report deeper, more authentic conversations compared to conventional dating apps.",
  },
  {
    number: "50+",
    title: "Spiritual Preference Tags",
    desc: "Filter by Mindfulness, Yoga, Meditation, Plant Medicine, Astrology, Sound Healing & Conscious Living.",
  },
  {
    number: "100%",
    title: "Respectful Community",
    desc: "Strict moderation and photo verification ensure a supportive, spam-free space for authentic singles.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <DefaultNavbar />

      <main className="pt-24">
        {/* ── 1. FEATURES HERO SECTION ── */}
        <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-rose-50/70 via-pink-50/30 to-white">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-red-200 to-rose-300 opacity-30 blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-200 to-red-200 opacity-30 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 text-rose-700 text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-rose-600" /> Platform Features
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                Designed for{" "}
                <span className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 bg-clip-text text-transparent">
                  Conscious Connection
                </span>
              </h1>

              <div className="max-w-3xl mx-auto space-y-4 text-gray-600 text-lg sm:text-xl leading-relaxed mb-10">
                <p>
                  Finding someone is easy. Finding someone who truly understands your values, beliefs, and outlook on life can feel very different.
                </p>
                <p>
                  Spiritual Unity Match brings together thoughtful features designed to help conscious singles discover a{" "}
                  <strong className="text-gray-900 font-semibold">spiritual relationship in New York</strong> built around compatibility, intention, and genuine connection.
                </p>
                <p className="text-gray-500 text-base sm:text-lg">
                  Go beyond surface-level matching and discover people who may align with who you really are.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:scale-105 transition-all duration-300"
                >
                  Experience It Free ✨
                </Link>
                <Link
                  href="/pricing"
                  className="border-2 border-rose-200 text-rose-700 hover:bg-rose-50 px-8 py-4 rounded-full font-bold text-base transition-all duration-300"
                >
                  View Membership Plans
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── 2. EVERYTHING YOU NEED TO FIND ALIGNMENT ── */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full inline-block mb-3 border border-rose-100">
                Intuitive Tools
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Everything You Need to Find Alignment
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Thoughtful features created to make meaningful dating feel more personal, intentional, and authentic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainFeatures.map((feat, idx) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-3xl p-8 border border-rose-100/80 shadow-sm hover:shadow-xl hover:border-rose-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feat.bg} shadow-inner`}>
                        {feat.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-rose-100 group-hover:text-rose-700 transition-colors">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-rose-600">
                    <span>Explore feature details</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. HIGHLIGHT STATS BAR ── */}
        <section className="py-16 bg-gradient-to-r from-red-900 via-rose-900 to-red-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-200 to-white mb-3">
                    {item.number}
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-rose-100/80 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. WHY OUR APPROACH WORKS IN NEW YORK ── */}
        <section className="py-24 bg-rose-50/40 border-y border-rose-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-white border border-rose-200 px-4 py-1.5 rounded-full shadow-xs">
                  Soulmate Matchmaking in New York
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  Designed for conscious singles seeking real resonance
                </h2>
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
                  As a leading premier <strong className="text-gray-800">spiritual dating site in New York</strong>, we believe finding a partner should honor your spiritual journey. Whether you align with meditation, yoga, mindfulness, holistic wellness, or personal growth, our features are built to surface genuine compatibility.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    "Customizable spiritual preference questionnaires",
                    "Compatibility indicators based on values, intentions & practices",
                    "Guided icebreakers to spark deep, comfortable conversation",
                    "Local New York events & workshop discovery",
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-gray-800 font-medium text-sm sm:text-base">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 text-rose-600 font-bold hover:text-rose-700 text-base group"
                  >
                    Create your free profile today <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl p-1 shadow-2xl overflow-hidden"
              >
                <div className="bg-white rounded-[22px] p-8 space-y-6">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-500 to-rose-500 flex items-center justify-center text-white text-xl font-bold shadow-md">
                      ✨
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">Spiritual Compatibility Preview</h3>
                      <p className="text-xs text-rose-600 font-semibold">96% Alignment • Mindfulness & Intentional Living</p>
                    </div>
                  </div>

                  <div className="bg-rose-50/70 p-4 rounded-2xl border border-rose-100 text-sm text-rose-900 space-y-2">
                    <div className="font-semibold text-xs uppercase tracking-wider text-rose-700">Shared Practices & Values</div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-rose-800 shadow-sm border border-rose-100">Daily Meditation</span>
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-rose-800 shadow-sm border border-rose-100">Conscious Living</span>
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-rose-800 shadow-sm border border-rose-100">Holistic Wellness</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm italic border-l-4 border-rose-500 pl-4 py-1">
                    "Finding a platform dedicated to soulmate matchmaking in New York changed how I date. The icebreakers and practice tags made connecting natural from day one."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── 5. FINAL CTA SECTION ── */}
        <section className="py-20 bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 text-white text-center relative overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight">
              Begin Your Journey Toward Aligned Love
            </h2>
            <p className="text-white/95 text-lg sm:text-xl mb-8 max-w-2xl mx-auto font-medium">
              Join thousands of conscious individuals looking for genuine, soul-centered relationships with Spiritual Unity Match.
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-white text-rose-700 px-10 py-4 rounded-full font-bold text-base shadow-xl hover:bg-rose-50 hover:scale-105 transition-all duration-300"
            >
              Experience It Free Today ✨
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
