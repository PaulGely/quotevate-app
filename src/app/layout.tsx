import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/lib/contexts/LanguageContext';
import { AuthProvider } from '@/lib/contexts/AuthContext';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Quotevate - AI-Powered Quotation Prediction',
    template: '%s | Quotevate'
  },
  description: 'Transform your quotation process with AI-powered predictions and insights. Get accurate quotes in minutes, not hours.',
  keywords: 'quotation software, AI prediction, pricing automation, quote management, business intelligence',
  openGraph: {
    title: 'Quotevate - AI-Powered Quotation Prediction',
    description: 'Transform your quotation process with AI-powered predictions. Generate accurate quotes faster, optimize pricing, and make data-driven decisions.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Quotevate',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quotevate - AI-Powered Quotation Prediction',
    description: 'Transform your quotation process with AI-powered predictions.',
  },
  alternates: {
    languages: {
      'en': '/en',
      'fr': '/fr'
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="scroll-smooth">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
