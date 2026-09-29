'use client';

import { motion } from 'framer-motion';
import DefaultNavbar from '@/components/DefaultNavbar';
import SiteFooter from '@/components/home/SiteFooter';
import { useState } from 'react';

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information We Collect',
    icon: '📊',
    content: [
      {
        subtitle: 'Information You Provide',
        text: 'When you create an account, we collect your name, email address, date of birth, gender, and profile information including spiritual beliefs, practices, and preferences. We also collect payment information for premium subscriptions (processed securely by third-party providers).',
      },
      {
        subtitle: 'Profile & Spiritual Data',
        text: 'To deliver meaningful matches, you may share details about your spiritual path, meditation practices, religious beliefs, life goals, and personal values. This information is used exclusively to enhance your matching experience and is never sold to third parties.',
      },
      {
        subtitle: 'Automatically Collected Data',
        text: 'We automatically collect usage data such as IP address, browser type, device information, pages visited, time spent, and interaction patterns. This helps us improve platform performance and personalize your experience.',
      },
      {
        subtitle: 'Communications',
        text: 'Messages sent between members are stored securely to provide the messaging service and to detect and prevent abuse. We may review flagged content to enforce our community standards.',
      },
    ],
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    icon: '🎯',
    content: [
      {
        subtitle: 'Matching & Personalization',
        text: 'Your spiritual profile, preferences, and behavioral data power our AI-driven matching algorithm. We analyze compatibility across 50+ dimensions to surface the most meaningful connections for you.',
      },
      {
        subtitle: 'Service Improvement',
        text: 'Aggregated and anonymized data helps us understand how our platform is used, identify popular features, and continuously improve the quality of our service.',
      },
      {
        subtitle: 'Communication',
        text: 'We use your email to send account notifications, match alerts, security updates, and (with your consent) newsletters and promotional content. You can manage communication preferences in your account settings.',
      },
      {
        subtitle: 'Safety & Security',
        text: 'We use your data to detect and prevent fraud, abuse, spam, and other violations of our Terms of Service, ensuring the platform remains a safe space for all members.',
      },
    ],
  },
  {
    id: 'sharing',
    title: 'Information Sharing & Disclosure',
    icon: '🔗',
    content: [
      {
        subtitle: 'With Other Members',
        text: 'Your public profile information is visible to other members. You control what information appears publicly through your privacy settings. Your contact details (email, phone) are never shared with other members.',
      },
      {
        subtitle: 'Service Providers',
        text: 'We share necessary data with trusted third-party service providers (e.g., payment processors, cloud hosting, analytics) under strict data processing agreements. These providers are prohibited from using your data for any purpose beyond the services they provide to us.',
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information when required by law, court order, or governmental authority, or when we believe disclosure is necessary to protect the rights and safety of our users or the public.',
      },
      {
        subtitle: 'We Do Not Sell Your Data',
        text: 'Spiritual Unity Match does not sell, rent, or trade your personal information to third parties for their marketing purposes. Your spiritual journey and personal data are sacred to us.',
      },
    ],
  },
  {
    id: 'data-security',
    title: 'Data Security',
    icon: '🛡️',
    content: [
      {
        subtitle: 'Encryption',
        text: 'All data transmitted between your device and our servers is encrypted using industry-standard TLS (Transport Layer Security). Sensitive data at rest, including messages and payment information, is encrypted using AES-256.',
      },
      {
        subtitle: 'Access Controls',
        text: 'Access to user data within our organization is strictly limited to personnel who need it to perform their job functions. All staff undergo regular security training and sign confidentiality agreements.',
      },
      {
        subtitle: 'Security Audits',
        text: 'We conduct regular third-party security audits and penetration testing to identify and remediate vulnerabilities. We also maintain a responsible disclosure program for security researchers.',
      },
      {
        subtitle: 'Data Breach Response',
        text: 'In the event of a data breach that may affect your personal information, we will notify you within 72 hours in compliance with applicable data protection laws, and provide guidance on protective steps you can take.',
      },
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking Technologies',
    icon: '🍪',
    content: [
      {
        subtitle: 'Essential Cookies',
        text: 'Required for core platform functionality such as session management, authentication, and security. These cannot be disabled without affecting platform performance.',
      },
      {
        subtitle: 'Analytics Cookies',
        text: 'Help us understand how members use the platform. We use privacy-respecting analytics tools and anonymize data wherever possible. You can opt out via your cookie preferences.',
      },
      {
        subtitle: 'Preference Cookies',
        text: 'Remember your settings and preferences (e.g., language, theme, notification preferences) to provide a personalized experience.',
      },
      {
        subtitle: 'Managing Cookies',
        text: 'You can manage or delete cookies through your browser settings. Note that disabling certain cookies may impact your ability to use some features of our platform.',
      },
    ],
  },
  {
    id: 'your-rights',
    title: 'Your Rights & Choices',
    icon: '⚡',
    content: [
      {
        subtitle: 'Access & Portability',
        text: 'You have the right to request a copy of the personal data we hold about you, in a portable, machine-readable format. Submit a data access request through your account settings or email privacy@spiritualunitymatch.com.',
      },
      {
        subtitle: 'Correction & Deletion',
        text: 'You can update or correct your personal information at any time through your account settings. You also have the right to request deletion of your account and associated data, subject to legal retention requirements.',
      },
      {
        subtitle: 'Opt-Out of Marketing',
        text: 'You can unsubscribe from marketing emails at any time by clicking "Unsubscribe" in any email or updating your notification preferences. Transactional and security notifications cannot be opted out of while your account is active.',
      },
      {
        subtitle: 'GDPR & CCPA Rights',
        text: 'Depending on your jurisdiction, you may have additional rights including the right to object to processing, restrict processing, or lodge a complaint with your local data protection authority. Contact us to exercise any of these rights.',
      },
    ],
  },
  {
    id: 'children',
    title: "Children's Privacy",
    icon: '👶',
    content: [
      {
        subtitle: 'Age Restriction',
        text: 'Spiritual Unity Match is strictly for users aged 18 and above. We do not knowingly collect or solicit personal information from anyone under 18. If we discover that we have collected information from a person under 18, we will immediately delete it.',
      },
      {
        subtitle: 'Reporting',
        text: 'If you believe we may have inadvertently collected information from a minor, please contact us immediately at privacy@spiritualunitymatch.com so we can take appropriate action.',
      },
    ],
  },
  {
    id: 'international',
    title: 'International Data Transfers',
    icon: '🌐',
    content: [
      {
        subtitle: 'Global Operations',
        text: 'Spiritual Unity Match operates globally and your data may be transferred to, stored in, and processed in countries other than your own, including the United States. We ensure such transfers comply with applicable data protection laws.',
      },
      {
        subtitle: 'Safeguards',
        text: 'For transfers from the European Economic Area, we rely on Standard Contractual Clauses approved by the European Commission. We take appropriate measures to ensure your data is treated securely regardless of where it is processed.',
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Our Privacy Team',
    icon: '📬',
    content: [
      {
        subtitle: 'Data Protection Officer',
        text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact our Data Protection Officer.',
      },
      {
        subtitle: 'Contact Details',
        text: '📧 Email: privacy@spiritualunitymatch.com\n📍 Address: 123 Enlightenment Way, Spiritual City, SC 12345, USA\n📞 Phone: +1 (555) 123-LOVE\n\nWe aim to respond to all privacy inquiries within 30 days.',
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DefaultNavbar />

      <main className="pt-20 flex-1">
        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-purple-50/30 to-white">
          <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl mb-6"
            >
              🔒
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Privacy{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Policy
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-6"
            >
              Your privacy is sacred to us. This Policy explains how Spiritual Unity Match
              collects, uses, and protects your personal information.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-sm font-medium px-5 py-2.5 rounded-full"
            >
              📅 Last updated: September 30, 2026
            </motion.div>
          </div>
        </section>

        {/* Key Commitments */}
        <section className="py-12 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: '🚫', label: 'No Data Sales', desc: 'We never sell your personal data to third parties' },
                { icon: '🔐', label: 'AES-256 Encryption', desc: 'Military-grade encryption protects all your data' },
                { icon: '✅', label: 'Your Control', desc: 'Access, correct, or delete your data anytime' },
                { icon: '🌍', label: 'GDPR Compliant', desc: 'Fully compliant with global privacy regulations' },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-5 text-center"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <div className="font-bold text-gray-900 mb-1 text-sm">{item.label}</div>
                  <div className="text-gray-500 text-xs leading-relaxed">{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
            {/* Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 px-3 py-2 rounded-lg transition-all font-medium"
                    >
                      <span>{section.icon}</span>
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-2xl p-6">
                <p className="text-gray-600 leading-relaxed text-sm">
                  At Spiritual Unity Match, we believe your personal journey is sacred. This Privacy
                  Policy is designed to be transparent and easy to understand. It explains what data
                  we collect, why we collect it, and how we protect it. If you have any questions,
                  our Privacy Team is always here to help.
                </p>
              </div>

              {sections.map((section, index) => (
                <motion.div
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenSection(openSection === section.id ? null : section.id)
                    }
                    className="w-full flex items-center gap-4 p-6 text-left hover:bg-indigo-50/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 block mb-0.5">
                        Section {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <span className="text-gray-400 text-xl flex-shrink-0">
                      {openSection === section.id ? '−' : '+'}
                    </span>
                  </button>

                  <div className={`px-6 pb-6 ${openSection === section.id ? 'block' : 'hidden lg:block'}`}>
                    <div className="ml-14 space-y-5 border-t border-gray-50 pt-4">
                      {section.content.map((block, bIndex) => (
                        <div key={bIndex}>
                          <h3 className="text-sm font-bold text-gray-900 mb-1.5">{block.subtitle}</h3>
                          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                            {block.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Footer Banner */}
              <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 rounded-2xl p-8 text-center text-white">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-xl font-bold mb-3">Your Trust Is Our Priority</h3>
                <p className="text-purple-200/80 text-sm leading-relaxed max-w-lg mx-auto mb-5">
                  We are committed to protecting your privacy and handling your data with the care
                  and respect it deserves. Thank you for trusting Spiritual Unity Match with your
                  journey.
                </p>
                <a
                  href="mailto:privacy@spiritualunitymatch.com"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/20 transition-all"
                >
                  📧 Contact Our Privacy Team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
