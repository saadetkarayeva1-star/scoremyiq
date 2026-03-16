'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const footerLinks = {
  Navigate: [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/ventures', label: 'Ventures' },
    { href: '/collective', label: 'Collective' },
    { href: '/journal', label: 'Journal' },
    { href: '/contact', label: 'Contact' },
  ],
  Connect: [
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'LinkedIn' },
    { href: '#', label: 'Twitter / X' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t py-16 md:py-24"
      style={{ borderColor: 'rgba(201, 185, 154, 0.12)', backgroundColor: '#0a0a0a' }}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-20">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <p className="text-[10px] tracking-[0.35em] uppercase text-[#c9b99a] mb-1">
                Axelere
              </p>
              <h3
                className="text-2xl tracking-[0.15em] uppercase font-light"
                style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
              >
                Collective
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed max-w-xs"
              style={{ color: 'rgba(245, 243, 239, 0.4)' }}
            >
              A collective of vision, innovation, and design. Building the future through
              culture, technology, and craft.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p
                className="text-[10px] tracking-[0.25em] uppercase mb-6"
                style={{ color: '#c9b99a' }}
              >
                {category}
              </p>
              <ul className="space-y-3">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm tracking-wide transition-colors duration-300 hover:text-[#c9b99a]"
                      style={{ color: 'rgba(245, 243, 239, 0.5)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t"
          style={{ borderColor: 'rgba(201, 185, 154, 0.08)' }}
        >
          <p
            className="text-[11px] tracking-[0.15em] uppercase"
            style={{ color: 'rgba(245, 243, 239, 0.25)' }}
          >
            © {year} Axelere Collective. All rights reserved.
          </p>
          <p
            className="text-[11px] tracking-wide"
            style={{ color: 'rgba(245, 243, 239, 0.2)' }}
          >
            Designed with intention.
          </p>
        </div>
      </div>
    </footer>
  );
}
