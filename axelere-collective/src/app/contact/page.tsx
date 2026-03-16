import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Axelere Collective.',
};

export default function ContactPage() {
  return <ContactClient />;
}
