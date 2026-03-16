'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: '#0a0a0a' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16 text-center"
          >
            <p className="text-xs tracking-[0.35em] uppercase text-[#c9b99a] mb-3">
              Axelere
            </p>
            <h1
              className="text-4xl md:text-5xl font-light tracking-[0.15em] uppercase"
              style={{ color: '#f5f3ef', fontFamily: 'Georgia, serif' }}
            >
              Collective
            </h1>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            className="w-48 h-px overflow-hidden"
            style={{ backgroundColor: 'rgba(201, 185, 154, 0.15)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full"
              style={{
                backgroundColor: '#c9b99a',
                width: `${progress}%`,
                transition: 'width 0.1s ease',
              }}
            />
          </motion.div>

          {/* Progress number */}
          <motion.p
            className="mt-4 text-xs tracking-widest"
            style={{ color: 'rgba(201, 185, 154, 0.5)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {Math.min(Math.round(progress), 100)}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
