"use client";

import { motion } from "framer-motion";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const testimonials = [
  {
    quote:
      "Spiritual Unity Match helped me find someone who truly understands my spiritual journey. We've been together 8 months and it's been the most aligned relationship I've ever experienced.",
    name: "Sarah & Michael",
    designation: "Conscious Couple · California",
    src: "https://images.unsplash.com/photo-1516589174184-c685266e430c?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "The matching algorithm is incredible! It connected me with someone who shares my meditation practice and yoga philosophy. We met and instantly knew we were meant to be together.",
    name: "Emma & David",
    designation: "Spiritual Partners · New York",
    src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "After years of superficial dating, I finally found depth and meaning. Spiritual Unity Match brought us together based on our shared values and spiritual beliefs. Grateful every day!",
    name: "Lisa & James",
    designation: "Soul Mates · Texas",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
  },
  {
    quote:
      "The platform creates such a safe space for authentic connections. We bonded over our spiritual practices and now we're building a conscious life together.",
    name: "Maria & Alex",
    designation: "Mindful Partners · Florida",
    src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section-pad bg-white relative overflow-hidden">
      {/* Ambient orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10" />

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
            Success Stories
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-5"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            What Our Conscious Couples Say
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Real stories from spiritual souls who found meaningful connections.
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonials} autoplay />
      </div>
    </section>
  );
}
