'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/ui/SectionReveal';
import { ventures } from '@/lib/ventures';

export default function VenturesClient() {
  return (
    <>
      {/* Page Header */}
      <section className="pt-40 pb-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: '#c9b99a' }}>
            Ventures
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            Our Portfolio
          </h1>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="h-px w-full" style={{ backgroundColor: 'rgba(201, 185, 154, 0.15)' }} />
      </div>

      {/* Intro text */}
      <section className="pt-16 pb-12 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 md:col-start-6">
            <SectionReveal>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: 'rgba(245, 243, 239, 0.5)' }}>
                Each venture begins with a single, irreducible idea. We develop only what we believe
                in completely — projects we would be proud to work on for a decade or more.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Ventures Grid */}
      <section className="py-16 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
          {ventures.map((venture, i) => (
            <SectionReveal key={venture.id} delay={i * 0.08}>
              <Link href={`/ventures/${venture.id}`}>
                <div
                  className="group relative p-8 md:p-10 border-b border-r h-full transition-all duration-500 hover:bg-[#111111]"
                  style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
                >
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className="text-[9px] tracking-[0.25em] uppercase px-2.5 py-1 border"
                      style={{
                        borderColor: 'rgba(201, 185, 154, 0.2)',
                        color: 'rgba(201, 185, 154, 0.6)',
                      }}
                    >
                      {venture.status}
                    </span>
                    <span
                      className="text-[10px] tracking-wider"
                      style={{ color: 'rgba(201, 185, 154, 0.35)' }}
                    >
                      {venture.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-2xl md:text-3xl font-light leading-tight mb-3 tracking-tight transition-colors duration-300 group-hover:text-[#c9b99a]"
                    style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                  >
                    {venture.title}
                  </h2>

                  {/* Category */}
                  <p
                    className="text-[10px] tracking-[0.2em] uppercase mb-6"
                    style={{ color: 'rgba(245, 243, 239, 0.35)' }}
                  >
                    {venture.category}
                  </p>

                  {/* Tagline */}
                  <p
                    className="text-sm italic leading-relaxed mb-6"
                    style={{ fontFamily: 'Georgia, serif', color: 'rgba(245, 243, 239, 0.5)' }}
                  >
                    &ldquo;{venture.tagline}&rdquo;
                  </p>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed line-clamp-3 mb-8"
                    style={{ color: 'rgba(245, 243, 239, 0.4)' }}
                  >
                    {venture.description}
                  </p>

                  {/* Arrow */}
                  <div
                    className="inline-flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: '#c9b99a' }}
                  >
                    View Venture
                    <span className="block w-6 h-px" style={{ backgroundColor: '#c9b99a' }} />
                  </div>
                </div>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section
        className="py-32 border-t text-center px-6"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <SectionReveal>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: '#c9b99a' }}>
            Collaborate
          </p>
          <h2
            className="text-3xl md:text-5xl font-light tracking-tight mb-10"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            Have an idea worth pursuing?
          </h2>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.25em] uppercase border transition-all duration-300 hover:bg-[#c9b99a] hover:border-[#c9b99a] hover:text-[#0a0a0a]"
            style={{ borderColor: 'rgba(201, 185, 154, 0.4)', color: '#c9b99a' }}
          >
            Start a Conversation
          </Link>
        </SectionReveal>
      </section>
    </>
  );
}
