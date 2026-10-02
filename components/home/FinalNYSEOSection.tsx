"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FinalNYSEOSection() {
  return (
    <section
      id="spiritual-dating-new-york"
      className="section-pad bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-red-50 via-rose-50 to-pink-50 blur-3xl opacity-60 -z-10 rounded-full" />

      <div className="section-inner">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <div className="text-center mb-10">
            <span className="inline-block bg-brand-gradient-light text-brand font-semibold text-sm px-4 py-1.5 rounded-full tracking-wider uppercase">
              Conscious Dating in New York
            </span>
          </div>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-8 text-center leading-tight"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            A Spiritual Dating Site in New York for Conscious Singles
          </h2>

          {/* Body copy */}
          <div className="space-y-5 text-gray-600 text-base leading-relaxed mb-10">
            <p>
              Finding love in a busy city can sometimes feel overwhelming. You may meet plenty of people but still have difficulty finding someone who shares your values, relationship goals, and approach to life.
            </p>
            <p>
              <strong className="text-gray-900 font-semibold">Spiritual Unity Match</strong> is a <strong className="text-gray-900 font-semibold">spiritual dating site in New York</strong> created to make meaningful connections easier to explore.
            </p>
            <p>
              Our community is for people who want more from dating than quick interactions. You can meet people interested in spirituality, personal growth, emotional connection, mindfulness, and conscious relationships.
            </p>
            <p>
              For those looking for <strong className="text-gray-900 font-semibold">soulmate matchmaking in New York</strong>, our platform provides an opportunity to start with shared values and meaningful conversations.
            </p>

            {/* Divider insight block */}
            <div className="bg-white border border-red-100 rounded-2xl p-6 shadow-sm my-6">
              <p className="text-gray-700 font-medium text-base leading-relaxed italic">
                A lasting relationship does not have to begin with instant chemistry. Sometimes, it begins with a thoughtful conversation, a shared belief, a similar life perspective, or the feeling that someone genuinely understands you.
              </p>
            </div>

            <p>
              That is the kind of connection Spiritual Unity Match is designed to encourage.
            </p>
            <p>
              Create your profile, share what matters to you, discover people with similar intentions, and take the first step toward a more meaningful relationship.
            </p>
          </div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-2 px-10 py-4 rounded-full font-bold text-white text-base sm:text-lg shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              style={{ background: "linear-gradient(to right, #ff1a1a, #ff8080)" }}
            >
              <span>Start Your Journey Free</span>
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
