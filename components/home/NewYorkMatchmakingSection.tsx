"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const questions = [
  "Who understands my values?",
  "Who supports my personal growth?",
  "Who shares my vision for a meaningful relationship?",
  "Who wants to build something genuine?",
];

export default function NewYorkMatchmakingSection() {
  return (
    <section
      id="new-york-matchmaking"
      className="section-pad bg-gradient-to-b from-white via-rose-50/30 to-white relative overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-30 -z-10" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-30 -z-10" />

      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left column – text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-brand-gradient-light text-brand font-semibold text-sm px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase">
              New York Matchmaking
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Soulmate Matchmaking in New York With a Deeper Purpose
            </h2>

            <div className="space-y-4 text-gray-600 text-base leading-relaxed mb-8">
              <p>
                New York brings together people from different backgrounds, cultures, lifestyles, and experiences. With so many people around you, finding someone who truly understands your values can still be difficult.
              </p>
              <p>
                <strong className="text-gray-800">Spiritual Unity Match offers a different approach.</strong>
              </p>
              <p>
                Our <strong className="text-gray-900 font-semibold">soulmate matchmaking in New York</strong> experience is designed for people who want to look beyond surface-level attraction and discover relationships based on deeper compatibility.
              </p>
              <p>
                Whether you are interested in spirituality, meditation, mindfulness, personal development, conscious living, or simply want a more meaningful relationship, you can create a profile that represents the person you are and the connection you hope to find.
              </p>
              <p>
                As a <strong className="text-gray-900 font-semibold">spiritual dating site in New York</strong>, we bring together people who are interested in authentic communication and intentional relationships.
              </p>
            </div>

            <p className="text-gray-700 font-medium mb-5 text-base">
              Instead of asking only, <em>&ldquo;Who do I find attractive?&rdquo;</em> you can also ask:
            </p>

            {/* Questions */}
            <div className="space-y-3 mb-8">
              {questions.map((q, i) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex items-start gap-3 bg-white border border-red-100 rounded-xl px-4 py-3 shadow-sm"
                >
                  <span className="text-[#ff1a1a] font-bold text-lg flex-shrink-0">✦</span>
                  <p className="text-gray-700 text-sm font-medium">{q}</p>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-500 text-sm leading-relaxed">
              These questions can help create a stronger foundation for connection.
            </p>
          </motion.div>

          {/* Right column – visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-6"
          >
            {/* Feature card */}
            <div className="bg-gradient-to-br from-[#ff1a1a] to-[#ff8080] rounded-3xl p-8 text-white shadow-xl shadow-red-500/25">
              <div className="text-5xl mb-4">🗽</div>
              <h3
                className="text-2xl font-bold mb-3"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Dating in New York, Differently
              </h3>
              <p className="text-white/85 leading-relaxed text-sm">
                In a city of millions, we help you find the one person who shares your values, your vision, and your journey — not just your schedule.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "💫", stat: "10K+", label: "NYC Conscious Singles" },
                { icon: "❤️", stat: "87%", label: "Match Satisfaction" },
                { icon: "🌿", stat: "4.9★", label: "Community Rating" },
                { icon: "🔒", stat: "100%", label: "Verified Profiles" },
              ].map(({ icon, stat, label }) => (
                <div
                  key={label}
                  className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:border-red-100 transition-all duration-300"
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  <div className="text-xl font-bold text-gray-900">{stat}</div>
                  <div className="text-xs text-gray-500 font-medium">{label}</div>
                </div>
              ))}
            </div>

            <Link
              href="/auth/register"
              className="block text-center w-full py-4 px-8 rounded-full font-bold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
              style={{ background: "linear-gradient(to right, #ff1a1a, #ff8080)" }}
            >
              Create Your Profile Today
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
