'use client';

import { motion } from 'framer-motion';
import DefaultNavbar from '@/components/DefaultNavbar';
import SiteFooter from '@/components/home/SiteFooter';
import { useState } from 'react';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    icon: '📋',
    content: [
      'By accessing or using the Spiritual Unity Match platform ("Service"), you agree to be bound by these Terms & Conditions ("Terms"). If you do not agree to these Terms, please do not use our Service.',
      'These Terms apply to all users of the Service, including visitors, registered members, and subscribers. We reserve the right to update these Terms at any time, and we will notify you of any material changes via email or a prominent notice on our platform.',
      'Your continued use of the Service after any modification to these Terms constitutes your acceptance of the revised Terms.',
    ],
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Account Registration',
    icon: '🔐',
    content: [
      'You must be at least 18 years of age to create an account and use our Service. By registering, you confirm that you are 18 years of age or older.',
      'You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.',
      'You are responsible for safeguarding the password you use to access the Service and for all activities that occur under your account. Notify us immediately at support@spiritualunitymatch.com of any unauthorized use of your account.',
      'We reserve the right to refuse registration or suspend or terminate accounts at our sole discretion.',
    ],
  },
  {
    id: 'conduct',
    title: 'User Conduct & Community Standards',
    icon: '🤝',
    content: [
      'Our platform is a sacred space built on respect, authenticity, and spiritual growth. By using Spiritual Unity Match, you agree to treat all members with dignity and kindness.',
      'You must not: post false or misleading information; harass, bully, or intimidate other members; share explicit, violent, or otherwise inappropriate content; impersonate another person or entity; use the platform for commercial solicitation or spam.',
      'We have a zero-tolerance policy for discrimination based on race, religion, gender, sexual orientation, disability, or any other characteristic. Violations may result in immediate account termination.',
      'We encourage open, honest communication but reserve the right to remove content that violates our community standards without prior notice.',
    ],
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions & Payments',
    icon: '💳',
    content: [
      'Spiritual Unity Match offers both free and premium subscription plans. Premium features are available upon purchase of a subscription plan as described on our Pricing page.',
      'All subscription fees are billed in advance on a monthly or annual basis, depending on the plan you select. Prices are subject to change with 30 days\' notice.',
      'Payments are processed through secure third-party payment processors. We do not store your complete credit card information on our servers.',
      'Subscriptions automatically renew at the end of each billing period unless you cancel at least 24 hours before the renewal date. You can manage your subscription from your account settings.',
      'Refunds are issued in accordance with our Refund Policy. We offer a 30-day satisfaction guarantee for first-time subscribers.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: '©️',
    content: [
      'The Service and its original content, features, and functionality are owned by Spiritual Unity Match and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.',
      'You retain ownership of the content you post on our platform. By posting content, you grant Spiritual Unity Match a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content in connection with the Service.',
      'You may not reproduce, distribute, modify, create derivative works of, publicly display, or commercially exploit any content from our Service without prior written permission.',
    ],
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Protection',
    icon: '🔒',
    content: [
      'Your privacy is of the utmost importance to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the Service, you consent to the practices described in our Privacy Policy.',
      'We employ industry-standard security measures to protect your data, including SSL encryption, secure data centers, and regular security audits.',
      'You have the right to access, correct, or delete your personal data at any time. Contact us at privacy@spiritualunitymatch.com for any data-related requests.',
    ],
  },
  {
    id: 'disclaimers',
    title: 'Disclaimers & Limitation of Liability',
    icon: '⚖️',
    content: [
      'Spiritual Unity Match is provided "as is" and "as available" without any warranties, expressed or implied. We do not guarantee that the Service will be uninterrupted, error-free, or completely secure.',
      'We are not responsible for the conduct of any user on the platform, whether online or offline. Meeting someone in person always carries inherent risks, and we strongly encourage all members to exercise caution and meet in public places.',
      'To the fullest extent permitted by applicable law, Spiritual Unity Match shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service.',
      'Our total liability to you for any claim arising out of these Terms shall not exceed the amount paid by you to Spiritual Unity Match in the twelve months preceding the claim.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: '🚫',
    content: [
      'We may terminate or suspend your account immediately, without prior notice or liability, for any reason, including if you breach these Terms.',
      'Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.',
      'You may terminate your account at any time by contacting us at support@spiritualunitymatch.com or through your account settings.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Dispute Resolution',
    icon: '🌐',
    content: [
      'These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.',
      'Any disputes arising from these Terms or the Service shall first be attempted to be resolved through good-faith negotiation. If unsuccessful, disputes shall be resolved through binding arbitration in accordance with the American Arbitration Association rules.',
      'You agree to resolve any disputes with Spiritual Unity Match on an individual basis and waive any right to participate in class action lawsuits.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: '📬',
    content: [
      'If you have any questions about these Terms & Conditions, please contact us:',
      '📧 Email: legal@spiritualunitymatch.com',
      '📍 Address: 123 Enlightenment Way, Spiritual City, SC 12345, United States',
      '📞 Phone: +1 (555) 123-LOVE',
      'We aim to respond to all legal inquiries within 5 business days.',
    ],
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DefaultNavbar />

      <main className="pt-20 flex-1">
        {/* Hero */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-purple-50/60 via-pink-50/30 to-white overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl mb-6"
            >
              📜
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Terms &{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Conditions
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-6"
            >
              Please read these Terms carefully before using Spiritual Unity Match. They form a
              binding agreement between you and us.
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

        {/* Content */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
            {/* Table of Contents Sidebar */}
            <aside className="lg:w-72 flex-shrink-0">
              <div className="sticky top-28 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="flex items-center gap-2.5 text-sm text-gray-600 hover:text-purple-700 hover:bg-purple-50 px-3 py-2 rounded-lg transition-all font-medium"
                    >
                      <span className="text-base">{section.icon}</span>
                      {section.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-8">
              {/* Intro banner */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl p-6">
                <p className="text-gray-600 leading-relaxed text-sm">
                  Welcome to Spiritual Unity Match. These Terms & Conditions govern your use of our
                  platform and services. By creating an account or using our services, you confirm
                  that you have read, understood, and agree to be bound by these Terms. Our goal is
                  to maintain a sacred, safe, and uplifting community for spiritual seekers.
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
                      setActiveSection(activeSection === section.id ? null : section.id)
                    }
                    className="w-full flex items-center gap-4 p-6 text-left hover:bg-purple-50/50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                      {section.icon}
                    </div>
                    <div className="flex-1">
                      <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-0.5">
                        Section {String(index + 1).padStart(2, '0')}
                      </span>
                      <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                    </div>
                    <span className="text-gray-400 text-xl flex-shrink-0">
                      {activeSection === section.id ? '−' : '+'}
                    </span>
                  </button>

                  {/* Always visible on desktop, toggle on mobile */}
                  <div className={`px-6 pb-6 ${activeSection === section.id ? 'block' : 'hidden lg:block'}`}>
                    <div className="ml-14 space-y-3 border-t border-gray-50 pt-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-gray-600 text-sm leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Agreement Banner */}
              <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-2xl p-8 text-center text-white">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-3">Agreement Acknowledgement</h3>
                <p className="text-purple-200/80 text-sm leading-relaxed max-w-lg mx-auto">
                  By using Spiritual Unity Match, you acknowledge that you have read and understood
                  these Terms & Conditions and agree to be bound by them. Thank you for being part
                  of our spiritual community.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
