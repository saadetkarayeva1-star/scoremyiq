import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story, philosophy, and mission of Axelere Collective.',
};

export default function AboutPage() {
  return <AboutClient />;
}
