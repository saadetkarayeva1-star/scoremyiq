'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p
          className="text-[9px] tracking-[0.4em] uppercase mb-8"
          style={{ color: '#c9b99a' }}
        >
          404
        </p>
        <h1
          className="text-5xl md:text-7xl font-light leading-none tracking-tight mb-6"
          style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
        >
          Not Found
        </h1>
        <p className="text-sm mb-12 max-w-xs mx-auto" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="group inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#c9b99a]"
          style={{ color: 'rgba(245, 243, 239, 0.6)' }}
        >
          Return Home
          <span
            className="block w-8 h-px transition-all duration-500 group-hover:w-16"
            style={{ backgroundColor: '#c9b99a' }}
          />
        </Link>
      </motion.div>
    </div>
  );
}
