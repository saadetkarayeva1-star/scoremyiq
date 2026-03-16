'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/ventures', label: 'Ventures' },
  { href: '/collective', label: 'Collective' },
  { href: '/journal', label: 'Journal' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const menuVariants = {
    closed: { opacity: 0, y: '-100%' },
    open: {
      opacity: 1,
      y: '0%',
      transition: { duration: 0.7, ease: 'easeOut' as const },
    },
    exit: {
      opacity: 0,
      y: '-100%',
      transition: { duration: 0.6, ease: 'easeIn' as const },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 40 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 + i * 0.08, duration: 0.5, ease: 'easeOut' as const },
    }),
  };

  return (
    <>
      {/* Main nav bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[500] flex items-center justify-between px-6 md:px-12 py-5 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201, 185, 154, 0.1)' : 'none',
        }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Logo */}
        <Link href="/" className="group">
          <div className="flex flex-col">
            <span
              className="text-[10px] tracking-[0.35em] uppercase text-[#c9b99a] leading-none mb-0.5"
            >
              Axelere
            </span>
            <span
              className="text-base tracking-[0.15em] uppercase font-light"
              style={{ color: '#f5f3ef', fontFamily: 'Georgia, serif' }}
            >
              Collective
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.slice(1).map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative text-[11px] tracking-[0.2em] uppercase transition-colors duration-300"
              style={{ color: pathname === link.href ? '#c9b99a' : 'rgba(245, 243, 239, 0.6)' }}
            >
              {link.label}
              <span
                className="absolute -bottom-0.5 left-0 h-px transition-all duration-300 group-hover:w-full"
                style={{
                  backgroundColor: '#c9b99a',
                  width: pathname === link.href ? '100%' : '0%',
                }}
              />
            </Link>
          ))}
        </div>

        {/* Burger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          aria-label="Toggle menu"
        >
          <motion.span
            className="block w-6 h-px"
            style={{ backgroundColor: '#f5f3ef' }}
            animate={menuOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="block w-6 h-px"
            style={{ backgroundColor: '#f5f3ef' }}
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-px"
            style={{ backgroundColor: '#f5f3ef' }}
            animate={menuOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="text-[11px] tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 hover:bg-[#c9b99a] hover:border-[#c9b99a] hover:text-[#0a0a0a]"
            style={{
              borderColor: 'rgba(201, 185, 154, 0.4)',
              color: 'rgba(245, 243, 239, 0.7)',
            }}
          >
            Inquire
          </Link>
        </div>
      </motion.nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[400] flex flex-col justify-center px-10"
            style={{ backgroundColor: '#0a0a0a' }}
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            <div className="mb-16">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  className="overflow-hidden py-3 border-b"
                  style={{ borderColor: 'rgba(201, 185, 154, 0.1)' }}
                >
                  <Link
                    href={link.href}
                    className="block text-4xl md:text-5xl font-light tracking-[0.05em] uppercase transition-colors duration-300 hover:text-[#c9b99a]"
                    style={{
                      fontFamily: 'Georgia, serif',
                      color: pathname === link.href ? '#c9b99a' : '#f5f3ef',
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-[#c9b99a]">
                Contact
              </p>
              <a
                href="mailto:hello@axelerecollective.com"
                className="text-sm tracking-wide"
                style={{ color: 'rgba(245, 243, 239, 0.5)' }}
              >
                hello@axelerecollective.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
