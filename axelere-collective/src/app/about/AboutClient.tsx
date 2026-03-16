'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/ui/SectionReveal';

const timeline = [
  { year: '2021', event: 'Concept formed between three creatives in Milan.' },
  { year: '2022', event: 'First residency and ideation retreat in Iceland.' },
  { year: '2023', event: 'Axelere Collective officially founded. Maison One launched.' },
  { year: '2024', event: 'Arc Studio and Void Technology added to the portfolio.' },
  { year: '2025', event: 'Expanded to New York and Tokyo. Journal launched.' },
];

const values = [
  {
    title: 'Obsessive Quality',
    body: 'We have no interest in average. Everything we touch must meet an uncompromising standard of excellence — not as an aspiration, but as a baseline.',
  },
  {
    title: 'Cultural Intelligence',
    body: 'We read the world with depth. Our work reflects a genuine understanding of history, material culture, technology, and human behaviour.',
  },
  {
    title: 'Selective Ambition',
    body: 'We are deliberate about what we pursue. Saying no is as important as saying yes. Focus is the ultimate competitive advantage.',
  },
];

export default function AboutClient() {
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
            About
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight mb-0"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            The Story
          </h1>
        </motion.div>
      </section>

      {/* Divider */}
      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="h-px w-full" style={{ backgroundColor: 'rgba(201, 185, 154, 0.15)' }} />
      </div>

      {/* Mission Statement */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionReveal className="md:col-span-3">
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#c9b99a' }}>
              Mission
            </p>
          </SectionReveal>
          <SectionReveal delay={0.15} className="md:col-span-9">
            <blockquote
              className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed tracking-tight"
              style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
            >
              &ldquo;To create enduring works at the intersection of culture, craft, and
              technology — ventures that matter not because of their scale, but because
              of their <em>precision</em> and <em>intention</em>.&rdquo;
            </blockquote>
          </SectionReveal>
        </div>
      </section>

      {/* Origin Story */}
      <section
        className="py-24 border-t"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32">
            <SectionReveal>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: '#c9b99a' }}>
                Origin
              </p>
              <h2
                className="text-3xl md:text-4xl font-light leading-tight mb-8 tracking-tight"
                style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
              >
                Born from
                <br />
                dissatisfaction.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(245, 243, 239, 0.55)' }}>
                Axelere Collective was born from a shared frustration: too much of what is called
                &ldquo;luxury&rdquo; or &ldquo;innovation&rdquo; today is neither. It is branding
                over substance. Novelty mistaken for progress.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(245, 243, 239, 0.55)' }}>
                Three creatives — a designer, an engineer, and a strategist — met during a residency
                in Milan and found themselves aligned on one idea: the world needs fewer things,
                made far better.
              </p>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="text-[10px] tracking-[0.3em] uppercase mb-8" style={{ color: '#c9b99a' }}>
                Philosophy
              </p>
              <h2
                className="text-3xl md:text-4xl font-light leading-tight mb-8 tracking-tight"
                style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
              >
                Future culture
                <br />
                needs deep roots.
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: 'rgba(245, 243, 239, 0.55)' }}>
                Innovation without history is noise. We study the great ateliers, the modernist
                architects, the early technology visionaries — not to imitate, but to understand
                what lasting looks like.
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(245, 243, 239, 0.55)' }}>
                Our philosophy is simple: build slowly, build well, and let the work speak
                for itself across generations.
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section
        className="py-24 border-t"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          <SectionReveal className="mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#c9b99a' }}>
              Timeline
            </p>
          </SectionReveal>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <SectionReveal key={item.year} delay={i * 0.08}>
                <div
                  className="flex flex-col md:flex-row md:items-center gap-4 md:gap-16 py-7 border-b"
                  style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
                >
                  <span
                    className="text-[11px] tracking-[0.2em] font-light w-16 shrink-0"
                    style={{ color: '#c9b99a' }}
                  >
                    {item.year}
                  </span>
                  <p
                    className="text-base md:text-lg font-light"
                    style={{ color: 'rgba(245, 243, 239, 0.7)' }}
                  >
                    {item.event}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <SectionReveal className="mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#c9b99a' }}>
            Core Values
          </p>
          <h2
            className="text-3xl md:text-4xl font-light tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            What we stand for
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {values.map((v, i) => (
            <SectionReveal key={v.title} delay={i * 0.12}>
              <div
                className="py-10 md:pr-12 border-b md:border-b-0 md:border-r last:border-r-0"
                style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
              >
                <h3
                  className="text-xl font-light mb-5 tracking-wide"
                  style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 243, 239, 0.5)' }}>
                  {v.body}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 border-t"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <SectionReveal>
            <h2
              className="text-3xl md:text-4xl font-light tracking-tight"
              style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
            >
              See what we&apos;ve built.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.15}>
            <Link
              href="/ventures"
              className="inline-flex items-center gap-4 text-[11px] tracking-[0.25em] uppercase transition-colors duration-300 hover:text-[#c9b99a] group"
              style={{ color: 'rgba(245, 243, 239, 0.6)' }}
            >
              View Ventures
              <span className="block w-8 h-px transition-all duration-500 group-hover:w-16" style={{ backgroundColor: '#c9b99a' }} />
            </Link>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
