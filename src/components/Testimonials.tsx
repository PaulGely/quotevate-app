'use client';

import Image from 'next/image';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: 'David Chen',
      role: 'Operations Director at BuildTech Solutions',
      image: '/testimonials/avatar1.jpg',
      content: 'Quotevate has transformed our quotation process. What used to take hours now takes minutes, and the AI predictions have improved our accuracy by 95%. The ROI has been incredible.',
      rating: 5,
    },
    {
      name: 'Sarah Martinez',
      role: 'CEO at Global Manufacturing Inc.',
      image: '/testimonials/avatar2.jpg',
      content: 'The dynamic pricing models and market insights have given us a competitive edge. We\'ve seen a 40% increase in quote acceptance rates since implementing Quotevate.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'Sales Director at TechPro Services',
      image: '/testimonials/avatar3.jpg',
      content: 'Integration was seamless with our existing systems. The AI algorithms quickly learned our pricing patterns, and the predictive analytics have been spot-on. A game-changer for our sales team.',
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-[#a47b67]' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-center mb-6">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

              <blockquote>
                <p className="text-gray-600 leading-relaxed">"{testimonial.content}"</p>
              </blockquote>
            </div>
          ))}
        </div>

        {/* Impact metrics */}
        <div className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[
            { label: t('testimonials.metrics.timeSaved'), value: '85%' },
            { label: t('testimonials.metrics.accuracy'), value: '95%' },
            { label: t('testimonials.metrics.roi'), value: '150%' },
            { label: t('testimonials.metrics.quotes'), value: '1M+' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-[#a47b67] mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 