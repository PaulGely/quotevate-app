'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/contexts/LanguageContext';

export default function FAQ() {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = {
    en: [
      {
        question: 'How does the AI quotation prediction work?',
        answer: 'Our AI system analyzes your historical quotation data, market trends, and industry patterns to generate accurate predictions. It learns from your specific pricing strategies, customer segments, and success rates to provide increasingly accurate quotes over time.',
      },
      {
        question: 'Can Quotevate integrate with our existing systems?',
        answer: 'Yes, Quotevate offers seamless integration with major CRM, ERP, and accounting systems. We provide APIs and pre-built connectors for popular platforms, making it easy to incorporate our solution into your existing workflow.',
      },
      {
        question: 'How long does it take to implement Quotevate?',
        answer: 'Implementation typically takes 2-4 weeks, depending on your system complexity and data volume. Our team provides comprehensive support throughout the process, including data migration, system integration, and team training.',
      },
      {
        question: 'What kind of accuracy can we expect?',
        answer: 'After the initial learning period (typically 2-3 weeks), our AI models achieve 95%+ accuracy in quote predictions. The system continues to improve over time as it learns from your specific business patterns and market dynamics.',
      },
      {
        question: 'How secure is our data with Quotevate?',
        answer: 'We maintain the highest security standards with enterprise-grade encryption, regular security audits, and compliance with major security frameworks. Your data is encrypted both in transit and at rest, and we provide additional security features like 2FA and SSO.',
      },
      {
        question: 'What support and training do you provide?',
        answer: 'We offer comprehensive support including initial team training, documentation, and ongoing technical assistance. Professional and Enterprise plans include priority support, while Enterprise customers get a dedicated account manager and 24/7 support.',
      },
    ],
    fr: [
      {
        question: 'Comment fonctionne la prédiction de devis par IA ?',
        answer: 'Notre système d\'IA analyse vos données historiques de devis, les tendances du marché et les modèles sectoriels pour générer des prédictions précises. Il apprend de vos stratégies de tarification spécifiques, segments de clientèle et taux de réussite pour fournir des devis de plus en plus précis au fil du temps.',
      },
      {
        question: 'Quotevate peut-il s\'intégrer à nos systèmes existants ?',
        answer: 'Oui, Quotevate offre une intégration transparente avec les principaux systèmes CRM, ERP et comptables. Nous fournissons des APIs et des connecteurs préconçus pour les plateformes populaires, facilitant l\'incorporation de notre solution dans votre flux de travail existant.',
      },
      {
        question: 'Combien de temps faut-il pour implémenter Quotevate ?',
        answer: 'L\'implémentation prend généralement 2 à 4 semaines, selon la complexité de votre système et le volume de données. Notre équipe fournit un support complet tout au long du processus, incluant la migration des données, l\'intégration système et la formation des équipes.',
      },
      {
        question: 'Quel niveau de précision pouvons-nous espérer ?',
        answer: 'Après la période d\'apprentissage initiale (généralement 2-3 semaines), nos modèles d\'IA atteignent une précision de plus de 95% dans les prédictions de devis. Le système continue de s\'améliorer au fil du temps en apprenant de vos modèles commerciaux spécifiques et de la dynamique du marché.',
      },
      {
        question: 'Comment nos données sont-elles sécurisées avec Quotevate ?',
        answer: 'Nous maintenons les plus hauts standards de sécurité avec un chiffrement de niveau entreprise, des audits de sécurité réguliers et la conformité aux principaux cadres de sécurité. Vos données sont chiffrées en transit et au repos, et nous fournissons des fonctionnalités de sécurité supplémentaires comme la 2FA et le SSO.',
      },
      {
        question: 'Quel support et quelle formation proposez-vous ?',
        answer: 'Nous offrons un support complet incluant la formation initiale des équipes, la documentation et une assistance technique continue. Les plans Professional et Enterprise incluent un support prioritaire, tandis que les clients Enterprise bénéficient d\'un gestionnaire de compte dédié et d\'un support 24/7.',
      },
    ],
  };

  const currentFaqs = faqs[language as keyof typeof faqs];

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {currentFaqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                <svg
                  className={`w-6 h-6 text-[#a47b67] transform transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 rounded-b-lg mt-1">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional help section */}
        <div className="text-center mt-12 pt-12 border-t">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            {t('faq.needHelp')}
          </h3>
          <p className="text-gray-600 mb-8">
            {t('faq.helpText')}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[#a47b67] text-white font-medium hover:bg-[#8f6a58] transition-colors"
          >
            {t('faq.demoButton')}
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 