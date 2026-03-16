'use client';

import { motion } from 'framer-motion';
import SectionReveal from '@/components/ui/SectionReveal';

const founders = [
  {
    initials: 'ES',
    name: 'Elara Severin',
    title: 'Co-Founder & Creative Director',
    discipline: 'Design, Spatial, Editorial',
    bio: 'Elara studied architecture at the Architectural Association in London before a decade working across luxury retail environments in Paris and Tokyo. She brings a spatial and editorial intelligence to every venture.',
    accentColor: '#c9b99a',
  },
  {
    initials: 'MK',
    name: 'Malik Kato',
    title: 'Co-Founder & Technology Director',
    discipline: 'Engineering, Systems, Research',
    bio: 'Malik studied computer science at MIT and spent six years in deep-tech research across Silicon Valley and Berlin. He believes technology should be felt, not seen — embedded in life without friction.',
    accentColor: '#8a9ea8',
  },
  {
    initials: 'RL',
    name: 'Reva Laurent',
    title: 'Co-Founder & Strategy Director',
    discipline: 'Brand, Culture, Investment',
    bio: 'Reva built a career advising European luxury houses on cultural positioning before co-founding Axelere. She is the strategic intelligence that bridges creative vision with long-term cultural and commercial relevance.',
    accentColor: '#b8a89a',
  },
];

const collaborators = [
  { name: 'Soren Vance', role: 'Lead Architect, Arc Studio', location: 'Copenhagen' },
  { name: 'Yuki Tanaka', role: 'Head of Textiles, Maison One', location: 'Kyoto' },
  { name: 'Ines Moreau', role: 'Research Lead, Material Lab', location: 'Lyon' },
  { name: 'Jonas Eriksson', role: 'Software Engineering, Void', location: 'Stockholm' },
  { name: 'Amara Diallo', role: 'Editorial Director, Signal', location: 'Dakar / London' },
  { name: 'Kai Hoffmann', role: 'Brand Partnerships', location: 'Berlin' },
];

export default function CollectiveClient() {
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
            The Collective
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            The People
          </h1>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="h-px" style={{ backgroundColor: 'rgba(201, 185, 154, 0.15)' }} />
      </div>

      {/* Founders */}
      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <SectionReveal className="mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#c9b99a' }}>
            Founders
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {founders.map((founder, i) => (
            <SectionReveal key={founder.name} delay={i * 0.12}>
              <div
                className="group py-12 md:pr-10 border-b md:border-b-0 md:border-r last:border-r-0"
                style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
              >
                {/* Portrait placeholder */}
                <div
                  className="w-full aspect-[3/4] mb-8 flex items-center justify-center border transition-all duration-500 group-hover:border-opacity-40"
                  style={{
                    backgroundColor: '#111111',
                    borderColor: 'rgba(201, 185, 154, 0.08)',
                    background: `linear-gradient(135deg, #0f0f0f 0%, #161616 100%)`,
                  }}
                >
                  <span
                    className="text-5xl font-light tracking-[0.1em]"
                    style={{
                      fontFamily: 'Georgia, serif',
                      color: `rgba(${hexToRgb(founder.accentColor)}, 0.2)`,
                    }}
                  >
                    {founder.initials}
                  </span>
                </div>

                {/* Info */}
                <p
                  className="text-[9px] tracking-[0.25em] uppercase mb-2"
                  style={{ color: founder.accentColor, opacity: 0.7 }}
                >
                  {founder.discipline}
                </p>
                <h3
                  className="text-xl font-light mb-1 tracking-wide"
                  style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                >
                  {founder.name}
                </h3>
                <p className="text-[11px] tracking-wide mb-6" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
                  {founder.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 243, 239, 0.45)' }}>
                  {founder.bio}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Collaborators */}
      <section
        className="py-24 border-t px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <SectionReveal className="mb-16">
          <p className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: '#c9b99a' }}>
            Collaborators
          </p>
          <h2
            className="text-3xl md:text-4xl font-light tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            The Extended Collective
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {collaborators.map((collab, i) => (
            <SectionReveal key={collab.name} delay={i * 0.08}>
              <div
                className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b gap-2"
                style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
              >
                <div>
                  <h4
                    className="text-base font-light tracking-wide"
                    style={{ color: '#f5f3ef' }}
                  >
                    {collab.name}
                  </h4>
                  <p className="text-[11px] tracking-wide mt-0.5" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
                    {collab.role}
                  </p>
                </div>
                <span
                  className="text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(201, 185, 154, 0.4)' }}
                >
                  {collab.location}
                </span>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Join CTA */}
      <section
        className="py-32 text-center border-t px-6"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <SectionReveal>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-8" style={{ color: '#c9b99a' }}>
            Join Us
          </p>
          <h2
            className="text-3xl md:text-5xl font-light tracking-tight mb-6"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            We are always looking for
            <br />
            exceptional collaborators.
          </h2>
          <p className="text-sm leading-relaxed mb-10 max-w-md mx-auto" style={{ color: 'rgba(245, 243, 239, 0.45)' }}>
            If your work demonstrates unusual precision, intelligence, and originality —
            we would like to hear from you.
          </p>
          <a
            href="mailto:hello@axelerecollective.com"
            className="inline-block px-10 py-4 text-[11px] tracking-[0.25em] uppercase border transition-all duration-300 hover:bg-[#c9b99a] hover:border-[#c9b99a] hover:text-[#0a0a0a]"
            style={{ borderColor: 'rgba(201, 185, 154, 0.4)', color: '#c9b99a' }}
          >
            Introduce Yourself
          </a>
        </SectionReveal>
      </section>
    </>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '201, 185, 154';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
