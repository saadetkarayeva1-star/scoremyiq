'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionReveal from '@/components/ui/SectionReveal';

const ventures = [
  {
    id: 'arc-studio',
    title: 'Arc Studio',
    category: 'Design & Architecture',
    year: '2024',
  },
  {
    id: 'void-technology',
    title: 'Void Technology',
    category: 'Deep Tech',
    year: '2024',
  },
  {
    id: 'maison-one',
    title: 'Maison One',
    category: 'Fashion',
    year: '2023',
  },
];

const principles = [
  { number: '01', title: 'Vision', body: 'We begin with a clear point of view — a conviction about what should exist in the world.' },
  { number: '02', title: 'Restraint', body: 'True luxury is knowing what to remove. We design by subtraction.' },
  { number: '03', title: 'Craft', body: 'Every detail is deliberate. Every material chosen with intention and respect.' },
  { number: '04', title: 'Longevity', body: 'We build for decades, not trends. Permanence is our ultimate measure of quality.' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#0a0a0a' }}
      >
        {/* Background grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(201,185,154,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,185,154,1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, #c9b99a 0%, transparent 70%)' }}
        />

        <motion.div
          className="relative z-10 text-center px-6"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          {/* Eyebrow */}
          <motion.p
            className="text-[10px] tracking-[0.45em] uppercase mb-8"
            style={{ color: '#c9b99a' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Est. 2023 — A Creative Collective
          </motion.p>

          {/* Main title line 1 */}
          <div className="overflow-hidden mb-2">
            <motion.h1
              className="text-[15vw] md:text-[11vw] lg:text-[9vw] font-light leading-none tracking-[-0.02em] uppercase"
              style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 1.4, ease: [0.76, 0, 0.24, 1] }}
            >
              Axelere
            </motion.h1>
          </div>

          {/* Main title line 2 — outlined */}
          <div className="overflow-hidden mb-10">
            <motion.h1
              className="text-[15vw] md:text-[11vw] lg:text-[9vw] font-light leading-none tracking-[-0.02em] uppercase"
              style={{
                fontFamily: 'Georgia, serif',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(245,243,239,0.2)',
              }}
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1, delay: 1.55, ease: [0.76, 0, 0.24, 1] }}
            >
              Collective
            </motion.h1>
          </div>

          {/* Tagline */}
          <motion.p
            className="text-sm md:text-base font-light tracking-[0.15em] max-w-lg mx-auto mb-14"
            style={{ color: 'rgba(245, 243, 239, 0.45)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.1 }}
          >
            A Collective of Vision, Innovation, and Design
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <Link
              href="/ventures"
              className="group inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#c9b99a]"
              style={{ color: 'rgba(245, 243, 239, 0.6)' }}
            >
              Explore the Collective
              <span
                className="block w-12 h-px transition-all duration-500 group-hover:w-20"
                style={{ backgroundColor: '#c9b99a' }}
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          <motion.div
            className="w-px h-12"
            style={{ backgroundColor: 'rgba(201, 185, 154, 0.3)' }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <p className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(201, 185, 154, 0.4)' }}>
            Scroll
          </p>
        </motion.div>
      </section>

      {/* ── Introduction ── */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
          <SectionReveal>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: '#c9b99a' }}>
              Who We Are
            </p>
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight"
              style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
            >
              We build at the
              <br />
              <em>intersection</em> of
              <br />
              culture and craft.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p
              className="text-base md:text-lg leading-relaxed mb-6"
              style={{ color: 'rgba(245, 243, 239, 0.55)' }}
            >
              Axelere Collective is a premium creative and investment collective operating
              at the convergence of fashion, deep technology, and architectural design.
            </p>
            <p
              className="text-base md:text-lg leading-relaxed mb-12"
              style={{ color: 'rgba(245, 243, 239, 0.55)' }}
            >
              We don&apos;t follow culture — we shape it. Each venture is a distillation
              of a singular idea, executed without compromise.
            </p>
            <Link
              href="/about"
              className="group inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#c9b99a]"
              style={{ color: 'rgba(245, 243, 239, 0.5)' }}
            >
              Our Story
              <span className="block w-8 h-px transition-all duration-500 group-hover:w-16" style={{ backgroundColor: '#c9b99a' }} />
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── Featured Ventures ── */}
      <section className="py-24 md:py-32 border-t" style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}>
        <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          <SectionReveal className="flex justify-between items-end mb-16">
            <div>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#c9b99a' }}>
                Featured Ventures
              </p>
              <h2
                className="text-3xl md:text-4xl font-light tracking-tight"
                style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
              >
                Selected Works
              </h2>
            </div>
            <Link
              href="/ventures"
              className="hidden md:inline-flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-[#c9b99a] group"
              style={{ color: 'rgba(245, 243, 239, 0.5)' }}
            >
              View All
              <span className="block w-6 h-px transition-all duration-500 group-hover:w-12" style={{ backgroundColor: '#c9b99a' }} />
            </Link>
          </SectionReveal>

          <div>
            {ventures.map((venture, i) => (
              <SectionReveal key={venture.id} delay={i * 0.1}>
                <Link href={`/ventures/${venture.id}`}>
                  <div
                    className="group relative py-8 border-b flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-500 hover:px-6"
                    style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
                  >
                    <span className="text-[11px] tracking-[0.2em] font-light" style={{ color: 'rgba(201, 185, 154, 0.4)' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className="text-2xl md:text-3xl font-light tracking-tight flex-1 md:ml-12 transition-colors duration-300 group-hover:text-[#c9b99a]"
                      style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                    >
                      {venture.title}
                    </h3>
                    <div className="flex items-center gap-8 md:gap-16">
                      <span className="text-[11px] tracking-[0.15em] uppercase" style={{ color: 'rgba(245, 243, 239, 0.35)' }}>
                        {venture.category}
                      </span>
                      <span className="text-[11px] tracking-wider" style={{ color: 'rgba(201, 185, 154, 0.4)' }}>
                        {venture.year}
                      </span>
                    </div>
                    <span className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#c9b99a]">→</span>
                  </div>
                </Link>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <SectionReveal className="mb-20">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#c9b99a' }}>
            Our Principles
          </p>
          <h2
            className="text-3xl md:text-4xl font-light tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            What guides us
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {principles.map((p, i) => (
            <SectionReveal key={p.number} delay={i * 0.12}>
              <div
                className="py-10 pr-8 border-b md:border-b-0 md:border-r last:border-r-0"
                style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
              >
                <p className="text-[10px] tracking-[0.3em] mb-6" style={{ color: 'rgba(201, 185, 154, 0.4)' }}>
                  {p.number}
                </p>
                <h3
                  className="text-xl font-light mb-4 tracking-wide"
                  style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                >
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 243, 239, 0.45)' }}>
                  {p.body}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="py-32 md:py-48 flex flex-col items-center justify-center text-center px-6 border-t"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <SectionReveal>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: '#c9b99a' }}>
            Join the Collective
          </p>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-light leading-none tracking-tight mb-12"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            Ready to build
            <br />
            <em>something lasting?</em>
          </h2>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.25em] uppercase border transition-all duration-300 hover:bg-[#c9b99a] hover:border-[#c9b99a] hover:text-[#0a0a0a]"
            style={{ borderColor: 'rgba(201, 185, 154, 0.4)', color: '#c9b99a' }}
          >
            Get in Touch
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
