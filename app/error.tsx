"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    // Log to error reporting service in production
    if (process.env.NODE_ENV === "production") {
      console.error("[GlobalError]", error.digest, error.message);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-gradient-light flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="text-7xl mb-6">🌌</div>
        <h1
          className="text-3xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          Something went astray
        </h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          The universe took an unexpected turn. Please try again or return home.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="bg-brand-gradient text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-all shadow-md shadow-purple-500/30"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="border-2 border-purple-300 text-purple-700 px-8 py-3 rounded-full font-semibold hover:bg-purple-50 transition-all"
          >
            Go Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
