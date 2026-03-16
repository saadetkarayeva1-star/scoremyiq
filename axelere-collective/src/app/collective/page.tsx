import type { Metadata } from 'next';
import CollectiveClient from './CollectiveClient';

export const metadata: Metadata = {
  title: 'Collective',
  description: 'The founders and collaborators of Axelere Collective.',
};

export default function CollectivePage() {
  return <CollectiveClient />;
}
