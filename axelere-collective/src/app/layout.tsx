import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import CustomCursor from '@/components/ui/CustomCursor';
import LoadingScreen from '@/components/ui/LoadingScreen';

export const metadata: Metadata = {
  title: {
    default: 'Axelere Collective',
    template: '%s | Axelere Collective',
  },
  description:
    'A collective of vision, innovation, and design. Premium creative collective focused on fashion, technology, and culture.',
  keywords: ['Axelere Collective', 'luxury', 'fashion', 'design', 'innovation', 'technology'],
  openGraph: {
    title: 'Axelere Collective',
    description: 'A collective of vision, innovation, and design.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-[#f5f3ef] antialiased overflow-x-hidden">
        <LoadingScreen />
        <CustomCursor />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
