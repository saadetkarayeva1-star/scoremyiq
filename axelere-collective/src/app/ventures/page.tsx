import type { Metadata } from 'next';
import VenturesClient from './VenturesClient';

export const metadata: Metadata = {
  title: 'Ventures',
  description: 'Explore the ventures and projects of Axelere Collective.',
};

export default function VenturesPage() {
  return <VenturesClient />;
}
