"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, User, ArrowRight } from "lucide-react";
import api from "@/lib/api";

export interface OnlineMember {
  id: string;
  firstName: string;
  age: number;
  photoUrl: string;
  isOnline: boolean;
  location?: string;
  bioSnippet?: string;
}

// ── Fallback sample profiles (used when API data is unavailable) ─────────────
const SAMPLE_ONLINE_MEMBERS: OnlineMember[] = [
  {
    id: "sample-1",
    firstName: "Elena",
    age: 28,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
    isOnline: true,
    location: "California, USA",
  },
  {
    id: "sample-2",
    firstName: "Maya",
    age: 26,
    photoUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
    isOnline: true,
    location: "London, UK",
  },
  {
    id: "sample-3",
    firstName: "Aria",
    age: 31,
    photoUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400",
    isOnline: true,
    location: "Sydney, Australia",
  },
  {
    id: "sample-4",
    firstName: "Seraphina",
    age: 29,
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    isOnline: true,
    location: "Vancouver, Canada",
  },
  {
    id: "sample-5",
    firstName: "Claire",
    age: 32,
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400",
    isOnline: true,
    location: "Berlin, Germany",
  },
  {
    id: "sample-6",
    firstName: "Amara",
    age: 27,
    photoUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=400",
    isOnline: true,
    location: "Austin, USA",
  },
];

const DEFAULT_AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23cbd5e1' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";

export default function MembersOnlineSection() {
  const [members, setMembers] = useState<OnlineMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let isMounted = true;

    async function fetchOnlineMembers() {
      try {
        // Attempt to fetch public online members from API endpoint if available
        const res = await api.get("/users/public-online");
        if (isMounted && res.data && Array.isArray(res.data.members) && res.data.members.length > 0) {
          setMembers(res.data.members);
          setLoading(false);
          return;
        }
      } catch {
        // Silent fallback for guest/unauthenticated users or if endpoint doesn't exist
      }

      if (isMounted) {
        setMembers(SAMPLE_ONLINE_MEMBERS);
        setLoading(false);
      }
    }

    fetchOnlineMembers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-purple-50/20 to-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-3xl rounded-full pointer-events-none -z-10"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100/80 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200/50">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
            Live Community
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Members <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Online Now</span>
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Connect with conscious souls actively seeking authentic relationships right at this moment.
          </p>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center animate-pulse">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-purple-100 mb-3" />
                <div className="w-16 h-4 bg-purple-100 rounded mb-1" />
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 bg-purple-50/50 rounded-3xl border border-purple-100 max-w-md mx-auto">
            <User className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">No members online right now.</p>
            <p className="text-xs text-gray-400 mt-1">Check back shortly to connect with new souls.</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center mb-14"
          >
            {members.map((member, index) => {
              const hasError = imageErrors[member.id];
              const imageSrc = hasError || !member.photoUrl ? DEFAULT_AVATAR : member.photoUrl;

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                  className="group flex flex-col items-center cursor-pointer text-center"
                >
                  <Link
                    href="/auth/register"
                    className="relative focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 rounded-full p-1"
                    aria-label={`Connect with ${member.firstName}, age ${member.age}`}
                  >
                    {/* Ring gradient & subtle shadow on hover */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-400 shadow-sm group-hover:shadow-lg group-hover:shadow-purple-500/25 group-hover:scale-105 transition-all duration-300">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-100 relative">
                        <Image
                          src={imageSrc}
                          alt={`${member.firstName}, ${member.age}`}
                          fill
                          sizes="(max-width: 640px) 96px, 112px"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={() => handleImageError(member.id)}
                          unoptimized={typeof imageSrc === "string" && imageSrc.startsWith("http")}
                        />
                      </div>

                      {/* Online green status indicator dot */}
                      {member.isOnline && (
                        <div
                          className="absolute bottom-1 right-1 w-4 h-4 sm:w-4.5 sm:h-4.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center"
                          title="Online now"
                        >
                          <span className="w-2 h-2 bg-white rounded-full animate-ping opacity-75" />
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Name and Age */}
                  <div className="mt-3">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                      {member.firstName}, <span className="font-semibold text-gray-700">{member.age}</span>
                    </h3>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Join to Connect
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
