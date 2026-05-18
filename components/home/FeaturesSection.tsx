"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🧘",
    title: "Spiritual Matching",
    description:
      "Advanced algorithm matches based on spiritual beliefs, practices, and life intentions for genuine soul-level compatibility.",
    color: "from-red-500 to-rose-600",
    bg: "from-red-50 to-rose-50",
  },
  {
    icon: "💬",
    title: "Meaningful Conversations",
    description:
      "Connect with people who share your values and spiritual journey through thoughtful, intentional messaging.",
    color: "from-pink-500 to-rose-600",
    bg: "from-pink-50 to-rose-50",
  },
  {
    icon: "✨",
    title: "Conscious Relationships",
    description:
      "Build relationships based on depth, intention, and spiritual alignment — not just physical attraction.",
    color: "from-rose-500 to-red-600",
    bg: "from-rose-50 to-red-50",
  },
  {
    icon: "🔒",
    title: "Safe & Verified",
    description:
      "Verified profiles, privacy controls, and a respectful community you can trust.",
    color: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
  },
  {
    icon: "🌱",
    title: "Growth-Oriented",
    description:
      "Soul check-ins, reflection tools, and features to support your personal and spiritual growth.",
    color: "from-green-500 to-emerald-600",
    bg: "from-green-50 to-emerald-50",
  },
  {
    icon: "🌟",
    title: "Authentic Profiles",
    description:
      "Comprehensive profiles that reflect your true self, values, and conscious intentions.",
    color: "from-amber-500 to-orange-600",
    bg: "from-amber-50 to-orange-50",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="section-pad bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-red-100 rounded-full blur-3xl opacity-40 -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-rose-100 rounded-full blur-3xl opacity-40 -z-10" />

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
            Features
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Why Choose Spiritual Unity Match?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Discover the features that make conscious dating meaningful and
            transformative.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {features.map(({ icon, title, description, color, bg }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="group relative bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-gray-100 hover:border-red-100 transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Hover bg gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl`}
              />

              {/* Icon badge */}
              <div
                className={`relative z-10 inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-2xl mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
              >
                {icon}
              </div>

              <h3 className="relative z-10 text-lg font-bold text-gray-900 mb-2 group-hover:text-red-800 transition-colors duration-300">
                {title}
              </h3>
              <p className="relative z-10 text-gray-500 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {description}
              </p>

              {/* Corner accent */}
              <div
                className={`absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
