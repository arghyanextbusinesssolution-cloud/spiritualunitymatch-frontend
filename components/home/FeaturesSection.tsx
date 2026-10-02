"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🧘",
    title: "Spiritual Matching",
    description:
      "Discover people who share an interest in spirituality, self-awareness, personal growth, and deeper relationships.",
    color: "from-red-500 to-rose-600",
    bg: "from-red-50 to-rose-50",
  },
  {
    icon: "💬",
    title: "Meaningful Conversations",
    description:
      "Move beyond simple introductions and create conversations that help you understand each other's values and intentions.",
    color: "from-pink-500 to-rose-600",
    bg: "from-pink-50 to-rose-50",
  },
  {
    icon: "✨",
    title: "Conscious Relationships",
    description:
      "Build relationships around respect, honesty, emotional awareness, communication, and shared growth.",
    color: "from-rose-500 to-red-600",
    bg: "from-rose-50 to-red-50",
  },
  {
    icon: "🔒",
    title: "Safe & Verified",
    description:
      "Connect in a dating environment where authenticity and respectful interactions are an important part of the experience.",
    color: "from-emerald-500 to-teal-600",
    bg: "from-emerald-50 to-teal-50",
  },
  {
    icon: "🌱",
    title: "Growth-Oriented",
    description:
      "Meet people who believe that personal growth and self-awareness can create stronger relationships.",
    color: "from-green-500 to-emerald-600",
    bg: "from-green-50 to-emerald-50",
  },
  {
    icon: "🌟",
    title: "Authentic Profiles",
    description:
      "Show who you really are, what matters to you, and what you hope to find in a relationship.",
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
            Why Choose Us
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Why Choose Spiritual Unity Match?
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Because meaningful love starts with meaningful connection. There is a difference between meeting someone and truly connecting with someone.
          </p>
          <p className="text-base text-gray-500 max-w-2xl mx-auto leading-relaxed mt-3">
            As a <strong className="text-gray-700 font-semibold">spiritual dating site in New York</strong>, our goal is to create an environment where people can connect around more than appearances.
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
