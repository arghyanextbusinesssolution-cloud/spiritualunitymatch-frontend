'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '@/contexts/LoadingContext';
import { Loader } from './Loader';
import { motion, AnimatePresence } from 'framer-motion';

export function TransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isPageLoading, stopLoading } = useLoading();

  useEffect(() => {
    // When the route fully changes, stop the loading animation
    stopLoading();
  }, [pathname, searchParams, stopLoading]);

  return (
    <AnimatePresence mode="wait">
      {isPageLoading && (
        <motion.div
          key="global-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] pointer-events-auto"
        >
          {/* Overlay to block interaction */}
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
          
          {/* Reuse the existing beautiful Loader component */}
          <Loader />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
