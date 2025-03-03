'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {t('pricing.plans').map((plan: any, index: number) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-2xl ${
                plan.popular
                  ? 'bg-[#a47b67] text-white shadow-xl scale-105'
                  : 'bg-white text-gray-900 border border-gray-200'
              } p-8`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 bg-gradient-to-r from-[#8f6a58] to-[#a47b67] text-white px-4 py-1 rounded-full text-sm font-medium">
                  {plan.popular}
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className={`${plan.popular ? 'text-white/90' : 'text-gray-600'} mb-6`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className={`ml-2 ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                    /month
                  </span>
                </div>
              </div>

              <ul className="mb-8 space-y-4 flex-1">
                {plan.features.map((feature: string, featureIndex: number) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg
                      className={`w-5 h-5 mr-3 ${
                        plan.popular ? 'text-white' : 'text-[#a47b67]'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.name === 'Enterprise' || plan.name === 'Entreprise' ? '/contact' : '/signup'}
                className={`w-full py-3 px-6 rounded-full text-center font-medium transition-colors ${
                  plan.popular
                    ? 'bg-white text-[#a47b67] hover:bg-gray-50'
                    : 'bg-[#a47b67] text-white hover:bg-[#8f6a58]'
                }`}
              >
                {plan.name === 'Enterprise' || plan.name === 'Entreprise' 
                  ? t('pricing.cta.contact')
                  : t('pricing.cta.trial')
                }
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 