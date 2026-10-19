"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import api from "@/lib/api";

type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  author: string;
  readTime: string;
  coverImage?: {
    url: string;
    publicId: string;
  };
  createdAt: string;
  featured?: boolean;
};

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    api
      .get("/blogs?limit=3")
      .then((res) => {
        if (isMounted && res.data?.blogs) {
          setBlogs(res.data.blogs);
        }
      })
      .catch((err) => {
        console.error("Error fetching homepage blogs:", err);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="blogs" className="section-pad bg-gradient-to-b from-white via-purple-50/20 to-white relative overflow-hidden">
      {/* Background aura decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="section-inner relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block bg-brand-gradient-light text-brand font-semibold text-xs sm:text-sm px-4 py-1.5 rounded-full mb-4 tracking-wider uppercase">
            Spiritual Wisdom & Insights
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Latest from Our Blog
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Guidance, mindfulness practices, and heartfelt stories on cultivating deep, conscious connections.
          </p>
        </motion.div>

        {/* Blog Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm animate-pulse space-y-4"
              >
                <div className="h-48 bg-gray-100 rounded-2xl w-full" />
                <div className="h-4 bg-gray-100 rounded w-1/3" />
                <div className="h-6 bg-gray-100 rounded w-4/5" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No blog posts published yet. Stay tuned!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, idx) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100/80 shadow-md hover:shadow-2xl hover:shadow-purple-200/40 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100">
                  {blog.coverImage?.url ? (
                    <Image
                      src={blog.coverImage.url}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl">
                      ✨
                    </div>
                  )}
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-xs font-bold text-purple-700 px-3.5 py-1.5 rounded-full shadow-sm">
                    {blog.category}
                  </span>
                  {blog.featured && (
                    <span className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-sm">
                      ★ Featured
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>{blog.author}</span>
                    <span>•</span>
                    <span>{blog.readTime || "5 min read"}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#ff1a1a] transition-colors line-clamp-2 mb-3">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-1">
                    {blog.excerpt}
                  </p>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <Link
                      href={`/blog`}
                      className="text-sm font-bold text-[#ff1a1a] hover:text-[#e01414] inline-flex items-center gap-1 group/btn"
                    >
                      Read Article
                      <span className="group-hover/btn:translate-x-1 transition-transform">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm border-2 border-[#ff8080] text-[#ff1a1a] hover:bg-red-50 hover:border-[#ff1a1a] transition-all duration-300"
          >
            Explore All Blog Posts →
          </Link>
        </div>
      </div>
    </section>
  );
}
