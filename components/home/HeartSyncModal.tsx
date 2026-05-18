"use client";

import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const HeartSyncGame = dynamic(() => import("./HeartSyncGame"), { ssr: false });

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function HeartSyncModal({ open, onClose }: Props) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content */}
          <motion.div
            key="modal-content"
            className="relative max-w-md w-full max-h-[90vh] overflow-y-auto z-10"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-black/70 transition-all border border-white/20"
            >
              ✕
            </button>

            <HeartSyncGame />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
