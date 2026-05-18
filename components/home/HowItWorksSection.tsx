"use client";

import { motion } from "framer-motion";

const steps = [
  {
    step: "01",
    icon: "📝",
    title: "Create Your Profile",
    description:
      "Share your spiritual beliefs, practices, and what you're looking for in a relationship. Your authentic self is your strongest asset.",
    color: "from-red-500 to-rose-600",
  },
  {
    step: "02",
    icon: "🔍",
    title: "Discover Matches",
    description:
      "Our intelligent algorithm connects you with people who share your spiritual path, values, and relationship intentions.",
    color: "from-pink-500 to-rose-600",
  },
  {
    step: "03",
    icon: "💬",
    title: "Connect & Message",
    description:
      "When you both like each other, begin meaningful conversations. Our prompt library helps you dive deeper than small talk.",
    color: "from-orange-500 to-red-600",
  },
  {
    step: "04",
    icon: "💑",
    title: "Build a Relationship",
    description:
      "Nurture conscious relationships rooted in alignment, depth, and mutual spiritual growth — one genuine moment at a time.",
    color: "from-emerald-500 to-teal-600",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-40 bottom-20 w-px bg-gradient-to-b from-transparent via-red-200 to-transparent hidden lg:block" />

      <div className="section-inner">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-brand-gradient-light text-brand font-semibold text-sm px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            How It Works
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Your Journey in 4 Steps
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            From first profile to lasting connection — here's how conscious
            relationships begin.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {steps.map(({ step, icon, title, description, color }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative flex gap-5 items-start bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-red-100 transition-all duration-300"
            >
              {/* Step number background */}
              <div
                className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                <span className="text-2xl" role="img" aria-label={title}>
                  {icon}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs font-bold bg-gradient-to-r ${color} text-transparent bg-clip-text`}
                  >
                    STEP {step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-red-800 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Hover accent corner */}
              <div
                className={`absolute -bottom-3 -right-3 w-16 h-16 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 blur-lg transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
