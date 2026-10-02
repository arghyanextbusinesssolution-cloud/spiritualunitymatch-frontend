'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import DefaultNavbar from '@/components/DefaultNavbar';
import SiteFooter from '@/components/home/SiteFooter';
import { SpiritualUnityLogo } from '@/components/SpiritualUnityLogo';

const approachItems = [
  {
    emoji: '✨',
    title: 'Spiritual Alignment',
    description:
      'Meet people who value spirituality, mindfulness, personal development, and conscious living.',
  },
  {
    emoji: '❤️',
    title: 'Meaningful Connection',
    description:
      "Create conversations that allow you to understand someone's personality, beliefs, values, and relationship goals.",
  },
  {
    emoji: '🌿',
    title: 'Personal Growth',
    description:
      'Connect with people who believe that becoming a better version of yourself can strengthen the relationships you build.',
  },
  {
    emoji: '🔒',
    title: 'Safe & Authentic',
    description:
      'Enjoy a community where genuine profiles, respectful communication, and authentic connections matter.',
  },
];

const coreValues = [
  {
    icon: '✨',
    title: 'Authenticity',
    description:
      'We believe in genuine connections built on truth, transparency, and mutual respect.',
  },
  {
    icon: '🕉️',
    title: 'Spiritual Growth',
    description:
      'Our platform supports personal and spiritual development within relationships.',
  },
  {
    icon: '🤝',
    title: 'Unity & Harmony',
    description:
      'We foster environments where diverse spiritual paths can unite in love and understanding.',
  },
  {
    icon: '🌟',
    title: 'Conscious Love',
    description:
      "We promote mindful relationships that honor both partners' spiritual journeys.",
  },
  {
    icon: '🔒',
    title: 'Safety & Respect',
    description:
      'Your spiritual journey and personal information are always protected and respected.',
  },
  {
    icon: '🌈',
    title: 'Inclusivity',
    description:
      'We welcome all spiritual paths, beliefs, and backgrounds in our loving community.',
  },
];

const stats = [
  { number: '10,000+', label: 'Conscious Connections' },
  { number: '50+', label: 'Countries Represented' },
  { number: '87%', label: 'Match Satisfaction' },
  { number: '24/7', label: 'Community Support' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <DefaultNavbar />

      <main className="pt-20">

        {/* ── Hero Section ── */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-rose-50/60 via-pink-50/30 to-white overflow-hidden">
          {/* Background orbs */}
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-red-200 to-rose-300 opacity-20 blur-3xl -z-10" />
          <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-200 to-rose-300 opacity-20 blur-3xl -z-10" />

          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 flex justify-center"
            >
              <SpiritualUnityLogo width={220} height={60} />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block bg-gradient-to-r from-red-50 to-rose-50 border border-red-100 text-red-700 font-semibold text-sm px-4 py-1.5 rounded-full mb-5 tracking-wider uppercase"
            >
              About Spiritual Unity Match
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Discover a More{' '}
              <span className="bg-gradient-to-r from-[#ff1a1a] to-[#ff8080] bg-clip-text text-transparent">
                Meaningful
              </span>{' '}
              Way to Find Love
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              Love becomes more meaningful when two people connect beyond the surface.
            </motion.p>

            {/* Tagline pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-3 mt-8 text-xs sm:text-sm font-medium text-rose-900 bg-gradient-to-r from-rose-50 via-pink-50 to-red-50 border border-rose-100 rounded-2xl px-5 py-3 max-w-xl mx-auto"
            >
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                Conscious Connections
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                Meaningful Conversations
              </span>
              <span className="text-gray-300">•</span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                Authentic Relationships
              </span>
            </motion.div>
          </div>
        </section>

        {/* ── About / Our Story Section ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Our Story
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#ff1a1a] to-[#ff8080] mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-5 text-gray-600 text-base leading-relaxed"
              >
                <p>
                  <strong className="text-gray-900">Spiritual Unity Match</strong> is a{' '}
                  <strong className="text-gray-900 font-semibold">spiritual dating site in New York</strong> designed for people who believe that lasting relationships begin with genuine understanding.
                </p>
                <p>
                  Instead of focusing only on appearance or quick interactions, we encourage connections based on values, intentions, personal growth, and spiritual compatibility.
                </p>
                <p>
                  Our approach to{' '}
                  <strong className="text-gray-900 font-semibold">soulmate matchmaking in New York</strong> is centered around helping people discover connections that feel authentic and purposeful.
                </p>
                <p>
                  You can create a profile that reflects who you really are, explore people who share your interests and values, and start conversations that go beyond ordinary small talk.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-red-500/10 ring-1 ring-red-100">
                  <Image
                    src="/side1.png"
                    alt="About Spiritual Unity Match — conscious dating in New York"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-lg px-5 py-3 border border-red-50">
                  <p className="text-xs text-gray-500 font-medium">Conscious Singles</p>
                  <p className="text-2xl font-extrabold text-gray-900">10K+</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Our Approach ── */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Our Approach
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#ff1a1a] to-[#ff8080] mx-auto rounded-full mb-5" />
              <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed text-base">
                We encourage connections based on values, intentions, personal growth, and spiritual compatibility — not just first impressions.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {approachItems.map(({ emoji, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-red-100 transition-all duration-300 text-center"
                >
                  <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                    {emoji}
                  </span>
                  <h3 className="text-base font-bold text-gray-900 mb-2">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Core Values ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Our Core Values
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-[#ff1a1a] to-[#ff8080] mx-auto rounded-full" />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-gray-100 hover:border-red-100 text-center"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Mission Quote ── */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative bg-white rounded-3xl p-8 md:p-14 border border-red-100 shadow-sm overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff1a1a] to-[#ff8080] rounded-t-3xl" />
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-50 rounded-full blur-3xl opacity-50" />

              <div className="relative z-10">
                <div className="text-5xl mb-6">✨</div>
                <p
                  className="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed mb-6 italic"
                  style={{ fontFamily: 'var(--font-playfair), serif' }}
                >
                  &ldquo;A lasting relationship does not have to begin with instant chemistry. Sometimes, it begins with a thoughtful conversation, a shared belief, a similar life perspective, or the feeling that someone genuinely understands you.&rdquo;
                </p>
                <div className="text-sm font-bold text-red-600 uppercase tracking-widest">
                  — The Spiritual Unity Match Team
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Community Stats ── */}
        <section className="py-20 px-4 bg-gradient-to-r from-[#ff1a1a] via-rose-600 to-[#ff8080] text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-white mb-3"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                A Growing Community of Conscious Singles
              </h2>
              <p className="text-white/80 text-base max-w-xl mx-auto">
                People from around the world are finding meaningful connections through Spiritual Unity Match.
              </p>
            </motion.div>
            <div className="grid md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/20 transition-colors duration-300"
                >
                  <div className="text-4xl font-extrabold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Conscious Dating NY Block ── */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-rose-50 via-pink-50 to-white rounded-3xl p-8 md:p-12 border border-rose-100 shadow-sm"
            >
              <h2
                className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Why Spiritual Unity Match Is Different
              </h2>
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  As a <strong className="text-gray-900 font-semibold">spiritual dating site in New York</strong>, we bring together people who are interested in authentic communication and intentional relationships.
                </p>
                <p>
                  Whether you are interested in spirituality, meditation, mindfulness, personal development, or conscious living, you can create a profile that represents the person you are and the connection you hope to find.
                </p>
                <p>
                  Instead of asking only <em>&ldquo;Who do I find attractive?&rdquo;</em> you can also ask: Who understands my values? Who supports my personal growth? Who shares my vision for a meaningful relationship?
                </p>
                <p>
                  These are the questions that help create a stronger foundation for connection — and that is exactly what Spiritual Unity Match is designed to encourage.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Join CTA ── */}
        <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2
                className="text-3xl sm:text-4xl font-bold text-gray-900 mb-5"
                style={{ fontFamily: 'var(--font-playfair), serif' }}
              >
                Begin Your Journey Toward Meaningful Love
              </h2>
              <p className="text-lg text-gray-600 mb-3 max-w-2xl mx-auto leading-relaxed">
                Your journey toward meaningful love can start with one genuine connection.
              </p>
              <p className="text-base text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
                Join a community where spirituality, authenticity, personal growth, and meaningful relationships come together. Whether you are exploring{' '}
                <strong className="text-gray-700 font-semibold">soulmate matchmaking in New York</strong> or simply looking for a deeper way to meet someone, your journey starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full font-bold text-white text-base shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105 transition-all duration-300"
                  style={{ background: 'linear-gradient(to right, #ff1a1a, #ff8080)' }}
                >
                  Start Your Journey Free ✨
                </Link>
                <Link
                  href="/plans"
                  className="inline-flex items-center justify-center px-9 py-4 rounded-full font-bold border-2 border-[#ff8080] text-[#ff1a1a] hover:bg-red-50 hover:border-[#ff1a1a] transition-all duration-300"
                >
                  View Plans
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-6 tracking-wide uppercase font-medium">
                Be Authentic. Connect Consciously. Find Your Alignment.
              </p>
            </motion.div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  );
}