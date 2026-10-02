"use client";

import { motion } from "framer-motion";
import { MaskContainer } from "@/components/ui/svg-mask-effect";

const stats = [
  { value: "10K+", label: "Conscious Souls" },
  { value: "4.9★", label: "Average Rating" },
  { value: "87%", label: "Match Satisfaction" },
];

const highlights = [
  {
    emoji: "✨",
    title: "Spiritual Alignment",
    body: "Meet people who value spirituality, mindfulness, personal development, and conscious living.",
  },
  {
    emoji: "❤️",
    title: "Meaningful Connection",
    body: "Create conversations that allow you to understand someone's personality, beliefs, values, and relationship goals.",
  },
  {
    emoji: "🌿",
    title: "Personal Growth",
    body: "Connect with people who believe that becoming a better version of yourself can strengthen the relationships you build.",
  },
  {
    emoji: "🔒",
    title: "Safe & Authentic",
    body: "Enjoy a community where genuine profiles, respectful communication, and authentic connections matter.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="section-pad bg-white">
      <div className="section-inner">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-brand-gradient-light text-brand font-semibold text-sm px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            About Spiritual Unity Match
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Discover a More Meaningful Way to Find Love
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Love becomes more meaningful when two people connect beyond the surface.
          </p>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="text-center p-4 rounded-2xl bg-brand-gradient-light border border-red-100"
            >
              <p className="text-2xl sm:text-3xl font-bold text-brand-gradient">
                {value}
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Two-column ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left – text + highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-4 text-gray-600 text-base leading-relaxed mb-8">
              <p>
                <strong>Spiritual Unity Match</strong> is a <strong className="text-gray-900 font-semibold">spiritual dating site in New York</strong> designed for people who believe that lasting relationships begin with genuine understanding. Instead of focusing only on appearance or quick interactions, we encourage connections based on values, intentions, personal growth, and spiritual compatibility.
              </p>
              <p>
                Our approach to <strong className="text-gray-900 font-semibold">soulmate matchmaking in New York</strong> is centered around helping people discover connections that feel authentic and purposeful.
              </p>
              <p>
                You can create a profile that reflects who you really are, explore people who share your interests and values, and start conversations that go beyond ordinary small talk.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">Our Approach</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map(({ emoji, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="group flex gap-3 items-start bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300"
                >
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {emoji}
                  </span>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm mb-0.5">
                      {title}
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right – interactive mask */}
          <motion.div
            className="relative h-[26rem]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <MaskContainer
              revealText={
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="text-7xl mb-4">✨</div>
                  <h3
                    className="text-2xl font-bold text-gray-800 mb-3"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    Conscious Connections
                  </h3>
                  <p className="text-gray-600 max-w-xs leading-relaxed text-sm">
                    Relationships built on spiritual alignment and shared
                    purpose.
                  </p>
                </div>
              }
              size={20}
              revealSize={420}
              className="rounded-3xl h-full"
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="text-7xl mb-4">🌸</div>
                <h3
                  className="text-2xl font-bold text-white mb-3"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Our Philosophy
                </h3>
                <p className="text-white/90 leading-relaxed max-w-xs text-sm">
                  "Find alignment before attraction" — true connections come
                  from shared values, spiritual paths, and conscious intentions.
                </p>
              </div>
            </MaskContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
