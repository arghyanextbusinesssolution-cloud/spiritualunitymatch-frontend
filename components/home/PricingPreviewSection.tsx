"use client";

import { motion } from "framer-motion";
import { LoadingLink } from "@/components/LoadingLink";
import { CheckCircle } from "lucide-react";

const plans = [
  {
    id: "basic",
    name: "Seeker",
    price: "$0",
    period: "forever",
    description: "Begin your spiritual journey",
    icon: "🌱",
    features: ["Create your profile", "10 profile views / day", "Basic matching"],
    cta: "Get Started Free",
    popular: false,
    gradient: "from-gray-100 to-gray-200",
    badge: null,
  },
  {
    id: "standard",
    name: "Awakened",
    price: "$19",
    period: "per month",
    description: "Our most popular choice",
    icon: "✨",
    features: [
      "Unlimited browsing",
      "Full messaging access",
      "See who liked you",
      "Advanced filters",
    ],
    cta: "Start 7-Day Trial",
    popular: true,
    gradient: "from-red-600 to-rose-600",
    badge: "Most Popular",
  },
  {
    id: "premium",
    name: "Enlightened",
    price: "$39",
    period: "per month",
    description: "Divine connection experience",
    icon: "👑",
    features: [
      "Priority placement",
      "Soul compatibility score",
      "Spiritual profile deep-dive",
      "Exclusive events",
    ],
    cta: "Go Premium",
    popular: false,
    gradient: "from-amber-500 to-orange-600",
    badge: null,
  },
];

export default function PricingPreviewSection() {
  return (
    <section
      id="plans"
      className="section-pad bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* BG decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-brand-gradient-light blur-3xl opacity-50 -z-10" />

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
            Pricing
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Choose Your Path
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Find the plan that aligns with your spiritual journey. Upgrade or
            cancel anytime.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">
          {plans.map(
            (
              { id, name, price, period, description, icon, features, cta, popular, gradient, badge },
              i
            ) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 ${
                  popular ? "ring-2 ring-red-500 scale-105 z-10" : ""
                }`}
              >
                {/* Popular badge */}
                {badge && (
                  <div className="absolute top-0 inset-x-0 flex justify-center">
                    <span
                      className={`bg-gradient-to-r ${gradient} text-white text-xs font-bold px-5 py-1.5 rounded-b-xl`}
                    >
                      {badge}
                    </span>
                  </div>
                )}

                {/* Card header */}
                <div
                  className={`px-8 pt-${badge ? "10" : "8"} pb-6 ${
                    popular
                      ? `bg-gradient-to-br ${gradient} text-white`
                      : "bg-gray-50 text-gray-900"
                  }`}
                >
                  <div className="text-4xl mb-3">{icon}</div>
                  <h3
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-playfair), serif" }}
                  >
                    {name}
                  </h3>
                  <p
                    className={`text-sm mb-4 ${
                      popular ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    {description}
                  </p>
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold">{price}</span>
                    <span
                      className={`text-sm mb-1 ${
                        popular ? "text-white/70" : "text-gray-400"
                      }`}
                    >
                      /{period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="px-8 py-6">
                  <ul className="space-y-3 mb-7">
                    {features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <LoadingLink
                    href="/plans"
                    className={`block w-full text-center py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
                      popular
                        ? `bg-gradient-to-r ${gradient} text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105`
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 hover:scale-105"
                    }`}
                  >
                    {cta}
                  </LoadingLink>
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Footer link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <LoadingLink
            href="/plans"
            className="inline-flex items-center gap-2 text-brand font-semibold hover:text-red-800 transition-colors text-sm"
          >
            View all plans & detailed comparison →
          </LoadingLink>
        </motion.div>
      </div>
    </section>
  );
}
