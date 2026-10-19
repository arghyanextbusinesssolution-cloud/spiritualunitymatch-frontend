'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import DefaultNavbar from '@/components/DefaultNavbar';
import SiteFooter from '@/components/home/SiteFooter';
import { useState, useEffect } from 'react';
import api from '@/lib/api';

const categories = [
  'All',
  'Spiritual Growth',
  'Relationships',
  'Meditation',
  'Soul Connections',
  'Community',
  'Wellness',
];

type BlogItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  author: string;
  createdAt: string;
  readTime: string;
  coverImage?: {
    url: string;
    publicId: string;
  };
  featured?: boolean;
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  useEffect(() => {
    let isMounted = true;
    const url = activeCategory === 'All' ? '/blogs?limit=50' : `/blogs?category=${encodeURIComponent(activeCategory)}&limit=50`;

    setLoading(true);
    api
      .get(url)
      .then((res) => {
        if (isMounted && res.data?.blogs) {
          setBlogs(res.data.blogs);
        }
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeCategory]);

  const featuredPost = blogs.find((p) => p.featured) || blogs[0];
  const regularPosts = blogs.filter((p) => p._id !== featuredPost?._id || activeCategory !== 'All');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DefaultNavbar />

      <main className="pt-24 flex-1">
        {/* Hero Section */}
        <section className="relative py-16 px-4 bg-gradient-to-b from-purple-50/60 via-pink-50/30 to-white overflow-hidden">
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
              written by our community of conscious seekers.
            </motion.p>
          </div>
        </section>

        {/* Featured Post */}
        {activeCategory === 'All' && featuredPost && !loading && (
          <section className="py-8 px-4">
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

                  <div className="flex-1 relative z-10">
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
                      <span>
                        📅{' '}
                        {new Date(featuredPost.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span>•</span>
                      <span>⏱ {featuredPost.readTime || '5 min read'}</span>
                    </div>
                    <button
                      onClick={() => setSelectedBlog(featuredPost)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold px-7 py-3.5 rounded-full hover:from-purple-400 hover:to-pink-400 transition-all hover:scale-105 shadow-lg"
                    >
                      Read Full Article →
                    </button>
                  </div>

                  {featuredPost.coverImage?.url ? (
                    <div className="relative w-full md:w-80 h-64 rounded-2xl overflow-hidden shadow-xl flex-shrink-0">
                      <Image
                        src={featuredPost.coverImage.url}
                        alt={featuredPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-[120px] leading-none select-none relative">✨</div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-6 px-4 sticky top-20 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
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
            {loading ? (
              <div className="flex items-center justify-center py-24">
                <div className="w-10 h-10 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" />
              </div>
            ) : regularPosts.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                <div className="text-5xl mb-4">📭</div>
                <p className="text-lg font-medium">No posts in this category yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <motion.article
                    key={post._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-200/50 border border-gray-100 transition-all hover:-translate-y-1 flex flex-col cursor-pointer"
                    onClick={() => setSelectedBlog(post)}
                  >
                    <div className="h-48 relative overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                      {post.coverImage?.url ? (
                        <Image
                          src={post.coverImage.url}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">
                          🌿
                        </div>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-xs text-gray-400">{post.readTime || '5 min read'}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug group-hover:text-purple-700 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-5 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                        <div className="text-xs text-gray-400">
                          <span className="font-semibold text-gray-600">{post.author}</span>
                          <span className="mx-1.5">·</span>
                          {new Date(post.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <span className="text-xs font-bold text-purple-600 hover:text-pink-600 transition-colors">
                          Read →
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Read Full Blog Modal */}
        {selectedBlog && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedBlog(null);
            }}
          >
            <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 relative shadow-2xl">
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-2xl font-bold bg-gray-100 rounded-full w-9 h-9 flex items-center justify-center"
              >
                ✕
              </button>

              {selectedBlog.coverImage?.url && (
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-6">
                  <Image
                    src={selectedBlog.coverImage.url}
                    alt={selectedBlog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              <span className="inline-block text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full mb-3">
                {selectedBlog.category}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-3">
                {selectedBlog.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-gray-400 mb-6 pb-4 border-b border-gray-100">
                <span>By {selectedBlog.author}</span>
                <span>•</span>
                <span>{selectedBlog.readTime}</span>
                <span>•</span>
                <span>
                  {new Date(selectedBlog.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <div className="prose prose-purple text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
                {selectedBlog.content || selectedBlog.excerpt}
              </div>
            </div>
          </div>
        )}

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
