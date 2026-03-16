import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ventures } from '@/lib/ventures';
import VentureDetailClient from './VentureDetailClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const venture = ventures.find(v => v.id === slug);
  if (!venture) return { title: 'Not Found' };
  return {
    title: venture.title,
    description: venture.description,
  };
}

export function generateStaticParams() {
  return ventures.map(v => ({ slug: v.id }));
}

export default async function VentureDetailPage({ params }: Props) {
  const { slug } = await params;
  const venture = ventures.find(v => v.id === slug);
  if (!venture) notFound();
  return <VentureDetailClient venture={venture} />;
}
