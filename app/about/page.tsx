'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import DefaultNavbar from '@/components/DefaultNavbar';
import SiteFooter from '@/components/home/SiteFooter';
import { SpiritualUnityLogo } from '@/components/SpiritualUnityLogo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <DefaultNavbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-purple-50/50 via-pink-50/30 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex justify-center"
            >
              <SpiritualUnityLogo width={220} height={60} />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              About <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Spiritual Unity Match</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              We believe that true love transcends the physical realm. Our mission is to connect souls
              who share spiritual values, creating meaningful relationships that nurture both the heart and spirit.
            </motion.p>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-600 leading-relaxed">
                  Spiritual Unity Match was born from a simple yet profound realization: in our fast-paced,
                  material world, many people yearn for deeper connections that nourish the soul.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Founded by spiritual practitioners who experienced the challenges of finding like-minded
                  partners, we created a platform that prioritizes spiritual compatibility alongside
                  emotional and physical attraction.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our journey began with a vision of fostering authentic relationships built on shared
                  spiritual values, mutual respect, and genuine love that transcends the ordinary.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/side1.png"
                    alt="About Spiritual Unity Match"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Core Values */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: '✨',
                  title: 'Authenticity',
                  description: 'We believe in genuine connections built on truth, transparency, and mutual respect.'
                },
                {
                  icon: '🕉️',
                  title: 'Spiritual Growth',
                  description: 'Our platform supports personal and spiritual development within relationships.'
                },
                {
                  icon: '🤝',
                  title: 'Unity & Harmony',
                  description: 'We foster environments where diverse spiritual paths can unite in love and understanding.'
                },
                {
                  icon: '🌟',
                  title: 'Conscious Love',
                  description: 'We promote mindful relationships that honor both partners\' spiritual journeys.'
                },
                {
                  icon: '🔒',
                  title: 'Safety & Respect',
                  description: 'Your spiritual journey and personal information are always protected and respected.'
                },
                {
                  icon: '🌈',
                  title: 'Inclusivity',
                  description: 'We welcome all spiritual paths, beliefs, and backgrounds in our loving community.'
                }
              ].map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 text-center"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Quote */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 rounded-3xl p-8 md:p-14 border border-purple-100 shadow-sm"
            >
              <p className="text-xl md:text-2xl text-purple-950 font-medium leading-relaxed mb-6 italic">
                "To create a sacred space where souls can find their perfect spiritual counterpart,
                fostering relationships that elevate consciousness and bring more love, light, and harmony into the world."
              </p>
              <div className="text-base font-bold text-purple-700 uppercase tracking-widest">
                — The Spiritual Unity Match Team
              </div>
            </motion.div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900 to-indigo-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: '10,000+', label: 'Spiritual Connections' },
                { number: '50+', label: 'Countries Represented' },
                { number: '95%', label: 'Satisfaction Rate' },
                { number: '24/7', label: 'Spiritual Support' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white/5 rounded-2xl border border-white/10"
                >
                  <div className="text-4xl font-extrabold text-pink-300 mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Join CTA */}
        <section className="py-20 px-4 bg-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Join Our Spiritual Community
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Ready to embark on a journey of spiritual love and connection?
              Join thousands of like-minded souls who have found meaningful relationships on our platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/auth/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-purple-500/30 hover:scale-105 transition-all"
              >
                Start Your Journey
              </a>
              <a
                href="/pricing"
                className="border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-full font-bold hover:bg-purple-50 transition-colors"
              >
                View Plans
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}