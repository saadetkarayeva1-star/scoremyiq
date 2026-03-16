import type { Metadata } from 'next';
import JournalClient from './JournalClient';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Long-form editorial writing on culture, design, and technology from Axelere Collective.',
};

export default function JournalPage() {
  return <JournalClient />;
}
