'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/ui/SectionReveal';

const articles = [
  {
    id: 1,
    issue: 'No. 001',
    category: 'Design',
    title: 'The Case for Emptiness: Why Negative Space is the New Luxury',
    author: 'Elara Severin',
    date: 'March 2026',
    readTime: '12 min',
    excerpt:
      'In an age saturated with content, the most powerful statement a designer can make is restraint. We examine why the greatest luxury houses have always known this — and what it means for the future of design.',
    featured: true,
  },
  {
    id: 2,
    issue: 'No. 002',
    category: 'Technology',
    title: 'Ambient Intelligence: On Technology That Disappears',
    author: 'Malik Kato',
    date: 'February 2026',
    readTime: '15 min',
    excerpt:
      'The best technology is invisible. From the thermostat to the microprocessor, the history of good design is the history of making complexity disappear. Where does AI fit in this story?',
    featured: false,
  },
  {
    id: 3,
    issue: 'No. 003',
    category: 'Culture',
    title: 'On Building Slowly: Lessons from Japanese Craft Traditions',
    author: 'Amara Diallo',
    date: 'January 2026',
    readTime: '10 min',
    excerpt:
      'The sashiko stitcher in Kyoto does not think about scale. She thinks about the next stitch. There is a lesson here for every founder, designer, and builder who has ever felt the pressure to move fast.',
    featured: false,
  },
  {
    id: 4,
    issue: 'No. 004',
    category: 'Fashion',
    title: 'The Anti-Collection: On Making Less and Meaning More',
    author: 'Yuki Tanaka',
    date: 'December 2025',
    readTime: '9 min',
    excerpt:
      'What happens when a fashion house commits to fewer pieces, made with more care? Yuki Tanaka explores the radical act of producing less in an industry addicted to volume.',
    featured: false,
  },
  {
    id: 5,
    issue: 'No. 005',
    category: 'Architecture',
    title: 'Brutalism Revisited: The Honesty of Exposed Structure',
    author: 'Soren Vance',
    date: 'November 2025',
    readTime: '13 min',
    excerpt:
      'The brutalists were not trying to be ugly. They were trying to be honest. A re-examination of a misunderstood movement through the lens of material truth.',
    featured: false,
  },
];

const categories = ['All', 'Design', 'Technology', 'Culture', 'Fashion', 'Architecture'];

export default function JournalClient() {
  const featured = articles.find(a => a.featured);
  const rest = articles.filter(a => !a.featured);

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
            The Journal
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight"
              style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
            >
              Signal
            </h1>
            <p className="text-sm max-w-xs" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
              Long-form writing on culture, design, and technology. One piece per week.
            </p>
          </div>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="h-px" style={{ backgroundColor: 'rgba(201, 185, 154, 0.15)' }} />
      </div>

      {/* Featured Article */}
      {featured && (
        <section className="py-16 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
          <SectionReveal>
            <div
              className="group p-10 md:p-16 border transition-all duration-500 hover:border-opacity-30"
              style={{ borderColor: 'rgba(201, 185, 154, 0.12)', backgroundColor: '#0d0d0d' }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span
                  className="text-[9px] tracking-[0.3em] uppercase px-3 py-1 border"
                  style={{ borderColor: 'rgba(201, 185, 154, 0.3)', color: '#c9b99a' }}
                >
                  Featured
                </span>
                <span
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: 'rgba(245, 243, 239, 0.4)' }}
                >
                  {featured.category}
                </span>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight tracking-tight mb-6 group-hover:text-[#c9b99a] transition-colors duration-300"
                style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
              >
                {featured.title}
              </h2>

              <p className="text-base leading-relaxed mb-8 max-w-2xl" style={{ color: 'rgba(245, 243, 239, 0.5)' }}>
                {featured.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-[11px] tracking-wide" style={{ color: 'rgba(245, 243, 239, 0.5)' }}>
                    {featured.author}
                  </span>
                  <span className="w-px h-3" style={{ backgroundColor: 'rgba(245, 243, 239, 0.2)' }} />
                  <span className="text-[11px] tracking-wide" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
                    {featured.date}
                  </span>
                  <span className="w-px h-3" style={{ backgroundColor: 'rgba(245, 243, 239, 0.2)' }} />
                  <span className="text-[11px] tracking-wide" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
                    {featured.readTime} read
                  </span>
                </div>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#c9b99a] text-sm tracking-[0.15em]">
                  Read →
                </span>
              </div>
            </div>
          </SectionReveal>
        </section>
      )}

      {/* Article List */}
      <section className="pb-16 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <SectionReveal className="mb-10">
          <p className="text-[10px] tracking-[0.3em] uppercase" style={{ color: '#c9b99a' }}>
            Recent Issues
          </p>
        </SectionReveal>

        <div className="space-y-0">
          {rest.map((article, i) => (
            <SectionReveal key={article.id} delay={i * 0.08}>
              <div
                className="group py-8 border-b flex flex-col md:flex-row md:items-start gap-4 md:gap-12 transition-all duration-300 hover:px-4"
                style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
              >
                {/* Issue / Category */}
                <div className="flex md:flex-col gap-4 md:gap-1 shrink-0 md:w-28">
                  <span className="text-[10px] tracking-[0.2em]" style={{ color: 'rgba(201, 185, 154, 0.4)' }}>
                    {article.issue}
                  </span>
                  <span className="text-[10px] tracking-[0.15em] uppercase" style={{ color: 'rgba(245, 243, 239, 0.3)' }}>
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className="text-xl md:text-2xl font-light leading-tight tracking-tight mb-3 transition-colors duration-300 group-hover:text-[#c9b99a]"
                    style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                  >
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'rgba(245, 243, 239, 0.45)' }}>
                    {article.excerpt}
                  </p>
                </div>

                {/* Meta */}
                <div className="shrink-0 text-right hidden md:block">
                  <p className="text-[11px] tracking-wide mb-1" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
                    {article.author}
                  </p>
                  <p className="text-[10px] tracking-wide mb-1" style={{ color: 'rgba(245, 243, 239, 0.3)' }}>
                    {article.date}
                  </p>
                  <p className="text-[10px] tracking-wide" style={{ color: 'rgba(201, 185, 154, 0.35)' }}>
                    {article.readTime}
                  </p>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Newsletter signup */}
      <section
        className="py-32 border-t text-center px-6 md:px-12"
        style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
      >
        <SectionReveal>
          <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: '#c9b99a' }}>
            Subscribe
          </p>
          <h2
            className="text-3xl md:text-5xl font-light tracking-tight mb-4"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            One essay. Each week.
          </h2>
          <p className="text-sm mb-12 max-w-sm mx-auto" style={{ color: 'rgba(245, 243, 239, 0.4)' }}>
            No noise. No aggregation. Just one carefully considered piece of writing.
          </p>
          <div className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto border" style={{ borderColor: 'rgba(201, 185, 154, 0.2)' }}>
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-6 py-4 text-sm bg-transparent border-0 outline-none tracking-wide"
              style={{ color: '#f5f3ef' }}
            />
            <button
              className="px-8 py-4 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#c9b99a] hover:text-[#0a0a0a]"
              style={{ backgroundColor: 'rgba(201, 185, 154, 0.1)', color: '#c9b99a' }}
            >
              Subscribe
            </button>
          </div>
        </SectionReveal>
      </section>
    </>
  );
}
