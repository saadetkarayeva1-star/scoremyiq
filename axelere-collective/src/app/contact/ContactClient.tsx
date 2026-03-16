'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionReveal from '@/components/ui/SectionReveal';

const inquiryTypes = [
  'General Inquiry',
  'Venture Collaboration',
  'Press & Media',
  'Investment',
  'Careers & Collaboration',
];

const socialLinks = [
  { label: 'Instagram', handle: '@axelerecollective', href: '#' },
  { label: 'LinkedIn', handle: 'Axelere Collective', href: '#' },
  { label: 'Twitter / X', handle: '@axelere', href: '#' },
];

export default function ContactClient() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiryType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the form data
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyles = {
    backgroundColor: 'transparent',
    borderColor: 'rgba(201, 185, 154, 0.15)',
    color: '#f5f3ef',
  };

  const labelStyles = {
    color: 'rgba(201, 185, 154, 0.6)',
  };

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
            Contact
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-light leading-none tracking-tight"
            style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
          >
            Let&apos;s Talk
          </h1>
        </motion.div>
      </section>

      <div className="px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="h-px" style={{ backgroundColor: 'rgba(201, 185, 154, 0.15)' }} />
      </div>

      <section className="py-24 px-6 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24">
          {/* Left column — info */}
          <SectionReveal className="md:col-span-4">
            <div className="space-y-16">
              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#c9b99a' }}>
                  Direct
                </p>
                <a
                  href="mailto:hello@axelerecollective.com"
                  className="text-base font-light tracking-wide transition-colors duration-300 hover:text-[#c9b99a] block mb-2"
                  style={{ color: 'rgba(245, 243, 239, 0.7)' }}
                >
                  hello@axelerecollective.com
                </a>
                <p className="text-sm" style={{ color: 'rgba(245, 243, 239, 0.35)' }}>
                  We respond within 2 business days.
                </p>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#c9b99a' }}>
                  Locations
                </p>
                <div className="space-y-3">
                  {['Milan, Italy', 'New York, USA', 'Tokyo, Japan'].map(loc => (
                    <p key={loc} className="text-sm" style={{ color: 'rgba(245, 243, 239, 0.5)' }}>
                      {loc}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] tracking-[0.3em] uppercase mb-6" style={{ color: '#c9b99a' }}>
                  Social
                </p>
                <div className="space-y-3">
                  {socialLinks.map(link => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="flex items-center justify-between group transition-colors duration-300 hover:text-[#c9b99a]"
                      style={{ color: 'rgba(245, 243, 239, 0.5)' }}
                    >
                      <span className="text-[10px] tracking-[0.15em] uppercase">
                        {link.label}
                      </span>
                      <span className="text-sm">{link.handle}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </SectionReveal>

          {/* Right column — form */}
          <SectionReveal delay={0.2} className="md:col-span-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-20 text-center"
              >
                <p className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: '#c9b99a' }}>
                  Received
                </p>
                <h2
                  className="text-3xl md:text-4xl font-light tracking-tight mb-6"
                  style={{ fontFamily: 'Georgia, serif', color: '#f5f3ef' }}
                >
                  Thank you.
                </h2>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(245, 243, 239, 0.5)' }}>
                  We&apos;ve received your message and will be in touch within two business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-3" style={labelStyles}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 text-base font-light border-0 border-b outline-none tracking-wide bg-transparent"
                    style={{ ...inputStyles, borderBottomColor: 'rgba(201, 185, 154, 0.2)' }}
                    placeholder="Your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-3" style={labelStyles}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-0 py-3 text-base font-light border-0 border-b outline-none tracking-wide bg-transparent"
                    style={{ ...inputStyles, borderBottomColor: 'rgba(201, 185, 154, 0.2)' }}
                    placeholder="your@email.com"
                  />
                </div>

                {/* Inquiry type */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-3" style={labelStyles}>
                    Nature of Inquiry
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {inquiryTypes.map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, inquiryType: type }))}
                        className="px-4 py-2 text-[10px] tracking-[0.15em] uppercase border transition-all duration-300"
                        style={{
                          borderColor: formData.inquiryType === type
                            ? '#c9b99a'
                            : 'rgba(201, 185, 154, 0.2)',
                          color: formData.inquiryType === type
                            ? '#c9b99a'
                            : 'rgba(245, 243, 239, 0.4)',
                          backgroundColor: formData.inquiryType === type
                            ? 'rgba(201, 185, 154, 0.08)'
                            : 'transparent',
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase mb-3" style={labelStyles}>
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-0 py-3 text-base font-light border-0 border-b outline-none tracking-wide bg-transparent resize-none"
                    style={{ ...inputStyles, borderBottomColor: 'rgba(201, 185, 154, 0.2)' }}
                    placeholder="Tell us about your inquiry..."
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:text-[#c9b99a]"
                    style={{ color: '#f5f3ef' }}
                  >
                    Send Message
                    <span
                      className="block w-12 h-px transition-all duration-500 group-hover:w-20"
                      style={{ backgroundColor: '#c9b99a' }}
                    />
                  </button>
                </div>
              </form>
            )}
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
