'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import DefaultNavbar from '@/components/DefaultNavbar';
import SiteFooter from '@/components/home/SiteFooter';
import { useState } from 'react';

const categories = [
  'All',
  'Spiritual Growth',
  'Relationships',
  'Meditation',
  'Soul Connections',
  'Community',
  'Wellness',
];

const blogPosts = [
  {
    id: 1,
    title: 'Finding Your Soul Mate Through Spiritual Alignment',
    excerpt:
      'Discover how aligning your spiritual values creates deeper, more meaningful romantic connections that transcend the ordinary.',
    category: 'Soul Connections',
    author: 'Maya Patel',
    date: 'September 20, 2026',
    readTime: '6 min read',
    emoji: '✨',
    gradient: 'from-purple-600 to-pink-600',
    featured: true,
  },
  {
    id: 2,
    title: 'The Power of Shared Meditation in Relationships',
    excerpt:
      'Couples who meditate together build unbreakable bonds. Learn how incorporating mindfulness can transform your love life.',
    category: 'Meditation',
    author: 'James Whitfield',
    date: 'September 15, 2026',
    readTime: '5 min read',
    emoji: '🧘',
    gradient: 'from-indigo-600 to-purple-600',
    featured: false,
  },
  {
    id: 3,
    title: "7 Signs You've Found a Spiritually Compatible Partner",
    excerpt:
      "Beyond physical attraction, spiritual compatibility creates relationships that stand the test of time. Here's what to look for.",
    category: 'Relationships',
    author: 'Priya Sharma',
    date: 'September 10, 2026',
    readTime: '7 min read',
    emoji: '💫',
    gradient: 'from-pink-600 to-rose-600',
    featured: false,
  },
  {
    id: 4,
    title: 'Morning Rituals That Attract Conscious Love',
    excerpt:
      'Start your day with intention. These powerful morning practices help you radiate the energy that draws your ideal partner.',
    category: 'Wellness',
    author: 'Arjun Nair',
    date: 'September 5, 2026',
    readTime: '4 min read',
    emoji: '🌅',
    gradient: 'from-amber-500 to-pink-600',
    featured: false,
  },
  {
    id: 5,
    title: 'How Our Community Found Love Across Continents',
    excerpt:
      'Real stories from Spiritual Unity Match members who discovered that love knows no borders when souls resonate.',
    category: 'Community',
    author: 'Sofia Reyes',
    date: 'August 28, 2026',
    readTime: '8 min read',
    emoji: '🌍',
    gradient: 'from-teal-500 to-purple-600',
    featured: false,
  },
  {
    id: 6,
    title: 'Understanding Spiritual Compatibility in Dating',
    excerpt:
      "Our AI-powered compatibility score analyses over 50 spiritual dimensions. Here's what it reveals about lasting love.",
    category: 'Spiritual Growth',
    author: 'David Chen',
    date: 'August 22, 2026',
    readTime: '9 min read',
    emoji: '🌟',
    gradient: 'from-violet-600 to-indigo-600',
    featured: false,
  },
  {
    id: 7,
    title: 'Healing Trauma Before Opening Your Heart',
    excerpt:
      'True spiritual love requires wholeness. Explore how inner healing creates space for the relationship you truly deserve.',
    category: 'Spiritual Growth',
    author: 'Luna Martinez',
    date: 'August 18, 2026',
    readTime: '10 min read',
    emoji: '🌿',
    gradient: 'from-emerald-500 to-teal-600',
    featured: false,
  },
  {
    id: 8,
    title: 'The Role of Energy in Attraction: A Spiritual Perspective',
    excerpt:
      'Science meets spirituality. Discover the vibrational frequencies that draw compatible souls together across distances.',
    category: 'Soul Connections',
    author: 'Asha Krishnan',
    date: 'August 10, 2026',
    readTime: '6 min read',
    emoji: '⚡',
    gradient: 'from-yellow-500 to-orange-600',
    featured: false,
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = filteredPosts.filter((p) => !p.featured || activeCategory !== 'All');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DefaultNavbar />

      <main className="pt-20 flex-1">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-purple-50/60 via-pink-50/30 to-white overflow-hidden">
          <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 text-purple-700 text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-6"
            >
              <span>✨</span> Our Spiritual Blog
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
            >
              Wisdom for the{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Spiritual Heart
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
            >
              Insights, stories, and guidance for those seeking love that transcends the ordinary —
              written by our community of spiritual seekers.
            </motion.p>
          </div>
        </section>

        {/* Featured Post */}
        {activeCategory === 'All' && featuredPost && (
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-3xl p-[1px] shadow-2xl shadow-purple-900/20"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777, #4f46e5)' }}
              >
                <div className="relative rounded-[22px] overflow-hidden bg-gradient-to-br from-purple-950 to-indigo-950 p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl" />

                  <div className="flex-1 relative">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 text-pink-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                      ⭐ Featured Article
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-purple-200/80 text-base leading-relaxed mb-6 max-w-xl">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-purple-300/70 mb-8">
                      <span>✍️ {featuredPost.author}</span>
                      <span>•</span>
                      <span>📅 {featuredPost.date}</span>
                      <span>•</span>
                      <span>⏱ {featuredPost.readTime}</span>
                    </div>
                    <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-7 py-3.5 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all hover:scale-105 shadow-lg">
                      Read Full Article →
                    </button>
                  </div>

                  <div className="text-[120px] lg:text-[160px] leading-none select-none relative">
                    {featuredPost.emoji}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 px-4 sticky top-20 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-300/50'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            {regularPosts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-lg font-medium">No posts in this category yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.07 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-200/50 border border-gray-100 transition-all hover:-translate-y-1 flex flex-col"
                  >
                    <div
                      className={`h-44 bg-gradient-to-br ${post.gradient} flex items-center justify-center text-7xl relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-black/10" />
                      <span className="relative z-10">{post.emoji}</span>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">{post.readTime}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-purple-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-400">
                          <span className="font-semibold text-gray-600">{post.author}</span>
                          <span className="mx-1.5">·</span>
                          {post.date}
                        </div>
                        <button className="text-xs font-bold text-purple-600 hover:text-pink-600 transition-colors">
                          Read →
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}

            <div className="text-center mt-14">
              <button className="inline-flex items-center gap-2 border-2 border-purple-200 text-purple-700 font-bold px-8 py-3.5 rounded-full hover:bg-purple-50 hover:border-purple-400 transition-all">
                Load More Articles ↓
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-900">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl mb-6">💌</div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Get Spiritual Wisdom Delivered
              </h2>
              <p className="text-purple-200/80 text-lg mb-8 leading-relaxed">
                Subscribe to our newsletter and receive weekly insights on spiritual love,
                mindfulness, and conscious relationships.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white placeholder:text-purple-300/60 focus:outline-none focus:border-pink-400 transition-colors"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-7 py-3.5 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all hover:scale-105 shadow-lg whitespace-nowrap">
                  Subscribe ✨
                </button>
              </div>
              <p className="text-purple-300/50 text-xs mt-4">
                No spam, ever. Unsubscribe anytime. 💜
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
