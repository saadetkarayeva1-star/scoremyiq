'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Venture } from '@/lib/ventures';
import SectionReveal from '@/components/ui/SectionReveal';

interface Props {
  venture: Venture;
}

export default function VentureDetailClient({ venture }: Props) {
  return (
    <>
      {/* Hero */}
      <section
        className="relative min-h-[70vh] flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-16 pt-40"
        style={{ backgroundColor: '#0d0d0d' }}
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, ${venture.accentColor} 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              href="/ventures"
              className="inline-flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase mb-12 transition-colors duration-300 hover:text-[#c9b99a]"
              style={{ color: 'rgba(245, 243, 239, 0.4)' }}
            >
              <span className="block w-6 h-px" style={{ backgroundColor: 'rgba(201, 185, 154, 0.4)' }} />
              All Ventures
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <p
                  className="text-[10px] tracking-[0.35em] uppercase mb-4"
                  style={{ color: venture.accentColor }}
                >
                  {venture.category} — {venture.year}
                </p>
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight"
                  style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                >
                  {venture.title}
                </h1>
              </div>
              <div className="md:max-w-sm">
                <p
                  className="text-xl md:text-2xl font-light italic"
                  style={{ fontFamily: 'Georgia, serif', color: 'rgba(245, 243, 239, 0.5)' }}
                >
                  &ldquo;{venture.tagline}&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Sidebar */}
          <SectionReveal className="md:col-span-3">
            <div className="space-y-8">
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(201, 185, 154, 0.5)' }}>
                  Status
                </p>
                <p className="text-sm tracking-wide" style={{ color: '#f5f3ef' }}>
                  {venture.status}
                </p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(201, 185, 154, 0.5)' }}>
                  Category
                </p>
                <p className="text-sm tracking-wide" style={{ color: '#f5f3ef' }}>
                  {venture.category}
                </p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: 'rgba(201, 185, 154, 0.5)' }}>
                  Founded
                </p>
                <p className="text-sm tracking-wide" style={{ color: '#f5f3ef' }}>
                  {venture.year}
                </p>
              </div>
            </div>
          </SectionReveal>

          {/* Main body */}
          <SectionReveal delay={0.15} className="md:col-span-9">
            <p
              className="text-lg md:text-xl leading-relaxed mb-8"
              style={{ color: 'rgba(245, 243, 239, 0.7)' }}
            >
              {venture.description}
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'rgba(245, 243, 239, 0.5)' }}
            >
              {venture.longDescription}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Visual break */}
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="h-px" style={{ backgroundColor: 'rgba(201, 185, 154, 0.1)' }} />
      </div>

      {/* Decorative section */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <SectionReveal>
          <div
            className="w-full aspect-[16/7] flex items-center justify-center border"
            style={{
              borderColor: 'rgba(201, 185, 154, 0.08)',
              backgroundColor: '#0d0d0d',
              background: `radial-gradient(ellipse at center, rgba(${hexToRgb(venture.accentColor)}, 0.04) 0%, #0d0d0d 70%)`,
            }}
          >
            <div className="text-center">
              <p
                className="text-[10px] tracking-[0.4em] uppercase mb-4"
                style={{ color: 'rgba(201, 185, 154, 0.3)' }}
              >
                {venture.title}
              </p>
              <p
                className="text-5xl md:text-7xl font-light"
                style={{
                  fontFamily: 'Georgia, serif',
                  color: 'transparent',
                  WebkitTextStroke: `1px rgba(${hexToRgb(venture.accentColor)}, 0.15)`,
                }}
              >
                {venture.category}
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* Navigate */}
      <section
        className="py-24 border-t flex flex-col md:flex-row justify-between items-center gap-8 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <SectionReveal>
          <Link
            href="/ventures"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#c9b99a] group"
            style={{ color: 'rgba(245, 243, 239, 0.5)' }}
          >
            <span className="block w-6 h-px transition-all duration-500 group-hover:w-12" style={{ backgroundColor: '#c9b99a' }} />
            All Ventures
          </Link>
        </SectionReveal>
        <SectionReveal delay={0.1}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#c9b99a] group"
            style={{ color: 'rgba(245, 243, 239, 0.5)' }}
          >
            Inquire About This Venture
            <span className="block w-8 h-px transition-all duration-500 group-hover:w-16" style={{ backgroundColor: '#c9b99a' }} />
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}

// Helper to convert hex to RGB string
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '201, 185, 154';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
