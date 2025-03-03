'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <div className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-32 min-h-[90vh] flex items-center">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#a47b67]/10 via-white to-[#a47b67]/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] opacity-30">
          <div className="absolute inset-0 bg-gradient-radial from-[#a47b67]/30 to-transparent" />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <div className="max-w-2xl">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 mb-8">
              {t('hero.title')}{' '}
              <span className="text-[#a47b67]">Quotevate</span> – {t('hero.subtitle')}
            </h1>
            <p className="text-xl text-gray-600 mb-10">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-[#a47b67] text-white font-medium hover:bg-[#8f6a58] transition-colors"
              >
                {t('hero.cta.primary')}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="#demo"
                className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-white border-2 border-[#a47b67] text-[#a47b67] font-medium hover:bg-[#a47b67]/5 transition-colors"
              >
                {t('hero.cta.secondary')}
                <svg
                  className="ml-2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Link>
            </div>
            
            {/* Social proof */}
            <div className="mt-12">
              <p className="text-sm text-gray-500 mb-4">{t('hero.trustedBy')}</p>
              <div className="flex flex-wrap gap-8 items-center">
                {t('hero.companies').map((company: string, index: number) => (
                  <div key={index} className="text-[#a47b67] font-semibold">
                    {company}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Image */}
          <div className="relative lg:h-[600px] hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#a47b67]/20 to-[#8f6a58]/20 rounded-2xl" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative p-8">
                <div className="bg-white rounded-xl shadow-2xl p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-[#a47b67] text-6xl font-bold mb-4">85%</div>
                    <div className="text-gray-600 text-xl">{t('hero.stats.generation')}</div>
                    <div className="mt-8 text-[#a47b67] text-4xl font-bold">99.9%</div>
                    <div className="text-gray-600 text-xl">{t('hero.stats.accuracy')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 