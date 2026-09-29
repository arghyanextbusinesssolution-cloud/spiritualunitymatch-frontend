"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import DefaultNavbar from "@/components/DefaultNavbar";
import SiteFooter from "@/components/home/SiteFooter";
import { Sparkles, Heart, ShieldCheck, Compass, MessageCircle, Moon, Sun, Flame, Zap, Award, Users } from "lucide-react";

const mainFeatures = [
  {
    icon: <Compass className="w-8 h-8 text-rose-500" />,
    title: "Soul Compatibility Matching",
    description:
      "Beyond surface-level interests, our algorithm calculates alignment based on spiritual philosophy, daily practices, life intentions, and core values.",
    color: "from-rose-500 to-red-600",
    bg: "from-rose-50 to-red-50",
    badge: "Core Tech",
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-pink-500" />,
    title: "Conscious Messaging & Icebreakers",
    description:
      "Deep conversation prompts and guided spiritual questions help skip small talk and start meaningful connections from the very first message.",
    color: "from-pink-500 to-purple-600",
    bg: "from-pink-50 to-purple-50",
    badge: "Interactive",
  },
  {
    icon: <Moon className="w-8 h-8 text-purple-500" />,
    title: "Astrological & Energy Alignment",
    description:
      "Optional planetary, zodiac, and subtle energy insights provide deeper context into interpersonal dynamics and spiritual resonance.",
    color: "from-purple-500 to-indigo-600",
    bg: "from-purple-50 to-indigo-50",
    badge: "Insights",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
    title: "Sacred Space & Photo Verification",
    description:
      "Verified profiles, robust moderation, and photo check-ins ensure a safe, respectful environment free of fake accounts.",
    color: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
    badge: "Security",
  },
  {
    icon: <Sun className="w-8 h-8 text-amber-500" />,
    title: "Daily Soul Check-Ins & Reflection",
    description:
      "Track your emotional and spiritual state daily. Match with users experiencing similar life phases and spiritual focus.",
    color: "from-amber-500 to-orange-600",
    bg: "from-amber-50 to-orange-50",
    badge: "Wellness",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-yellow-500" />,
    title: "Conscious Event Discovery",
    description:
      "Find local and virtual spiritual workshops, group meditations, retreat meetups, and conscious gatherings nearby.",
    color: "from-yellow-500 to-amber-600",
    bg: "from-yellow-50 to-amber-50",
    badge: "Community",
  },
];

const highlights = [
  {
    number: "98%",
    title: "Higher Retention in Conscious Matching",
    desc: "Users reporting deeper, more authentic conversations compared to traditional dating apps.",
  },
  {
    number: "50+",
    title: "Spiritual Preference Tags",
    desc: "From Meditation & Yoga to Astrology, Plant Medicine, Kundalini, Mindfulness, and Conscious Living.",
  },
  {
    number: "100%",
    title: "Private & Respectful",
    desc: "Your data is encrypted and your privacy is maintained with strict user control options.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <DefaultNavbar />

      <main className="pt-24">
        {/* Hero Banner */}
        <section className="relative overflow-hidden py-20 lg:py-28 bg-gradient-to-b from-purple-50/50 via-pink-50/30 to-white">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-30 blur-3xl" />
          <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-rose-200 to-amber-100 opacity-30 blur-3xl" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4 text-purple-600" /> Platform Features
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                Designed for <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">Conscious Connection</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
                Discover the intuitive tools and algorithms built specifically to connect souls who value spiritual depth, mindfulness, and authentic relationship building.
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/auth/register"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-base shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300"
                >
                  Experience It Free ✨
                </Link>
                <Link
                  href="/pricing"
                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-4 rounded-full font-bold text-base transition-colors"
                >
                  View Membership Plans
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Feature Grid Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Find Alignment
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Purposeful features crafted to remove superficial barriers and foster real intimacy.
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
                  whileHover={{ y: -8 }}
                  className="group relative bg-white rounded-3xl p-8 border border-purple-100/80 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`p-4 rounded-2xl bg-gradient-to-br ${feat.bg} shadow-inner`}>
                        {feat.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gray-100 text-gray-600 group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                        {feat.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {feat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-purple-600">
                    <span>Learn how it works</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Highlight Stats */}
        <section className="py-16 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md"
                >
                  <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-3">
                    {item.number}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Feature Deep Dive */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-100 px-3.5 py-1.5 rounded-full">
                  Soul-Level Compatibility
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  Match based on true spiritual values, not just shallow swipes
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Traditional dating applications encourage split-second physical judgments. Spiritual Unity Match takes into account your daily practices (meditation, breathwork, prayer, yoga), dietary intentions, life goals, and philosophical views.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    "Customizable spiritual preference questionnaires",
                    "Compatibility percentages based on core belief vectors",
                    "Detailed profile cards highlighting life intentions",
                    "Filtered discovery by practice, dietary lifestyle, and location",
                  ].map((point, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                        ✓
                      </div>
                      <span className="text-gray-800 font-medium text-sm sm:text-base">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/auth/register"
                    className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-700 text-base group"
                  >
                    Start your spiritual profile setup <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-1 shadow-2xl overflow-hidden"
              >
                <div className="bg-white rounded-[22px] p-8 space-y-6">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold">
                      🧘‍♀️
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Aria & David</h4>
                      <p className="text-xs text-purple-600 font-semibold">96% Soul Alignment • Mindfulness & Meditation</p>
                    </div>
                  </div>

                  <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100 text-sm text-purple-900 space-y-2">
                    <div className="font-semibold text-xs uppercase tracking-wider text-purple-700">Shared Practices</div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-800 shadow-sm">Daily Meditation</span>
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-800 shadow-sm">Vinyasa Yoga</span>
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-purple-800 shadow-sm">Conscious Living</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm italic border-l-4 border-purple-400 pl-4 py-1">
                    "We connected over our mutual commitment to mindfulness and personal growth. Finding someone on the same frequency changed everything."
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to meet someone aligned with your spirit?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of conscious individuals looking for genuine, soul-centered relationships.
            </p>
            <Link
              href="/auth/register"
              className="inline-block bg-white text-purple-700 px-10 py-4 rounded-full font-bold text-base shadow-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300"
            >
              Join Free Today
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
