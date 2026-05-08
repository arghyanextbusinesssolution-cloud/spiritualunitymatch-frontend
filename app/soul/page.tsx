'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import ResponsiveLayout from '@/components/ResponsiveLayout';

export default function SoulPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(null);
  const [todayCheckIn, setTodayCheckIn] = useState<any>(null);
  const [soulScore, setSoulScore] = useState<number | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }
    if (user) {
      fetchUserProfile();
      fetchTodayCheckIn();
      fetchSoulScore();
    }
  }, [user, authLoading, router]);

  const fetchUserProfile = async () => {
    try {
      const res = await api.get('/profiles/me');
      if (res.data.success && res.data.profile) {
        const photo =
          res.data.profile.photos?.find((p: any) => p.isPrimary)?.url ||
          res.data.profile.photos?.[0]?.url;
        setUserProfilePhoto(photo || null);
      }
    } catch {}
  };

  const fetchTodayCheckIn = async () => {
    try {
      const res = await api.get('/soul/check-in');
      if (res.data.success && res.data.checkIn) setTodayCheckIn(res.data.checkIn);
    } catch {}
  };

  const fetchSoulScore = async () => {
    try {
      const res = await api.get('/soul/score');
      if (res.data.success) setSoulScore(res.data.score);
    } catch {}
  };

  if (authLoading || !user) return null;

  const paths = [
    {
      route: '/soul/check-in',
      label: 'Check In',
      subtitle: 'How are you feeling today?',
      icon: '💭',
      gradient: 'from-purple-500 to-violet-600',
      badge: todayCheckIn ? '✓ Done today' : null,
    },
    {
      route: '/soul/reflect',
      label: 'Reflect',
      subtitle: 'Journal your inner world',
      icon: '📝',
      gradient: 'from-blue-400 to-indigo-500',
      badge: null,
    },
    {
      route: '/soul/grow',
      label: 'Grow',
      subtitle: 'Track your readiness journey',
      icon: '🌱',
      gradient: 'from-emerald-400 to-teal-500',
      badge: null,
    },
  ];

  return (
    <ResponsiveLayout userProfilePhoto={userProfilePhoto}>
      <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-10 pb-28 overflow-x-hidden w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm space-y-6"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="text-5xl mb-2">✨</div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Come back to yourself.
            </h1>
            <p className="text-sm text-gray-500 font-semibold">
              Your daily space for spiritual alignment
            </p>
          </div>

          {/* Soul Score Banner */}
          {soulScore !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-4 text-white flex items-center justify-between shadow-lg"
            >
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest opacity-70">Soul Score</p>
                <p className="text-xs font-bold opacity-60 mt-0.5">Thriving</p>
              </div>
              <div className="text-3xl font-black">{soulScore}</div>
            </motion.div>
          )}

          {/* Path Cards */}
          <div className="space-y-3">
            {paths.map((path, i) => (
              <motion.button
                key={path.route}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * (i + 1) }}
                onClick={() => router.push(path.route)}
                className="w-full bg-white/40 backdrop-blur-xl border border-white/60 rounded-2xl p-4 flex items-center gap-4 hover:bg-white/60 active:scale-[0.98] transition-all shadow-sm text-left"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${path.gradient} flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                  {path.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-gray-900 text-sm">{path.label}</span>
                    {path.badge && (
                      <span className="text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-600 border border-green-500/20 px-2 py-0.5 rounded-full">
                        {path.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 font-semibold mt-0.5 truncate">{path.subtitle}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </ResponsiveLayout>
  );
}