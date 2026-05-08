'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import api from '@/lib/api';

const READINESS_STAGES = [
  {
    id: 'knowing-self',
    title: 'Knowing Self',
    desc: 'Understand your core values, needs, and emotional patterns before inviting another soul in.',
    icon: '🔍',
    color: 'from-violet-500 to-purple-600',
    completed: true,
  },
  {
    id: 'healing-patterns',
    title: 'Healing Patterns',
    desc: 'Identify and transform the wounds and conditioning that shape how you relate to others.',
    icon: '🌿',
    color: 'from-emerald-400 to-teal-500',
    completed: false,
  },
  {
    id: 'conscious-love',
    title: 'Conscious Love',
    desc: 'Open to giving and receiving love that is rooted in awareness, presence, and spiritual depth.',
    icon: '✨',
    color: 'from-pink-400 to-rose-500',
    completed: false,
  },
  {
    id: 'sacred-partnership',
    title: 'Sacred Partnership',
    desc: 'Meet another soul at the level of depth, truth, and growth you have cultivated within yourself.',
    icon: '🌟',
    color: 'from-amber-400 to-orange-500',
    completed: false,
  },
];

const DAILY_RITUALS = [
  { icon: '🧘', title: 'Morning Meditation', desc: '5 minutes of stillness to centre yourself', duration: '5 min' },
  { icon: '📖', title: 'Gratitude Practice', desc: 'Write 3 things you appreciate about yourself', duration: '3 min' },
  { icon: '🌬️', title: 'Breath Awareness', desc: 'Box breathing for emotional regulation', duration: '4 min' },
  { icon: '🚶', title: 'Mindful Walk', desc: 'A walk without your phone to reconnect with nature', duration: '10 min' },
];

export default function GrowPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(null);
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const [completedRituals, setCompletedRituals] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!authLoading && !user) { router.push('/auth/login'); return; }
    if (user) fetchProfile();
  }, [user, authLoading, router]);

  const fetchProfile = async () => {
    try {
      const res = await api.get('/profiles/me');
      if (res.data.success && res.data.profile) {
        const photo = res.data.profile.photos?.find((p: any) => p.isPrimary)?.url || res.data.profile.photos?.[0]?.url;
        setUserProfilePhoto(photo || null);
      }
    } catch {}
  };

  const toggleRitual = (id: string) => {
    setCompletedRituals(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (authLoading || !user) return null;

  const completedCount = READINESS_STAGES.filter(s => s.completed).length;
  const progressPct = (completedCount / READINESS_STAGES.length) * 100;

  return (
    <ResponsiveLayout userProfilePhoto={userProfilePhoto}>
      <div className="w-full overflow-x-hidden px-4 py-6 pb-28 max-w-lg mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/soul')}
            className="w-9 h-9 rounded-xl bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-sm flex-shrink-0"
          >
            <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-black text-gray-900 tracking-tight flex items-center gap-2">
              🌱 Grow
            </h1>
            <p className="text-xs text-gray-500 font-semibold">Track your readiness journey</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-4 border border-white/60 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Readiness Progress</span>
            <span className="text-[9px] font-black text-purple-600">{completedCount}/{READINESS_STAGES.length} Stages</span>
          </div>
          <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          </div>
        </div>

        {/* Readiness Stages */}
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Your Journey Stages</p>
          <div className="space-y-3">
            {READINESS_STAGES.map((stage, i) => (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <button
                  onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
                  className={`w-full text-left bg-white/40 backdrop-blur-xl rounded-2xl p-4 border transition-all shadow-sm ${
                    activeStage === stage.id ? 'border-purple-300 bg-white/60' : 'border-white/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stage.color} flex items-center justify-center text-xl shadow-md flex-shrink-0`}>
                      {stage.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-gray-900 text-sm truncate">{stage.title}</span>
                        {stage.completed && (
                          <span className="text-[8px] font-black uppercase tracking-widest bg-green-500/10 text-green-600 border border-green-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
                            ✓ Done
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-gray-400 font-semibold mt-0.5 truncate">
                        Stage {i + 1} of {READINESS_STAGES.length}
                      </p>
                    </div>
                    <svg
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${activeStage === stage.id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {/* Expanded Description */}
                {activeStage === stage.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-white/30 backdrop-blur-md border border-white/50 border-t-0 rounded-b-2xl px-4 py-3 -mt-1"
                  >
                    <p className="text-sm text-gray-700 font-semibold leading-relaxed">{stage.desc}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Rituals */}
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
            Daily Rituals — {completedRituals.size}/{DAILY_RITUALS.length} Complete
          </p>
          <div className="space-y-2">
            {DAILY_RITUALS.map((ritual, i) => {
              const done = completedRituals.has(ritual.title);
              return (
                <motion.button
                  key={ritual.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => toggleRitual(ritual.title)}
                  className={`w-full text-left rounded-2xl p-4 border flex items-center gap-4 transition-all active:scale-[0.98] ${
                    done
                      ? 'bg-emerald-50/60 border-emerald-300/50 shadow-sm'
                      : 'bg-white/30 backdrop-blur-md border-white/50'
                  }`}
                >
                  <span className="text-2xl flex-shrink-0">{ritual.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className={`font-black text-sm ${done ? 'text-emerald-700 line-through opacity-70' : 'text-gray-900'}`}>
                      {ritual.title}
                    </p>
                    <p className="text-[10px] text-gray-400 font-semibold mt-0.5 truncate">{ritual.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-[9px] font-black text-gray-400 uppercase">{ritual.duration}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                      done ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'
                    }`}>
                      {done && (
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>
    </ResponsiveLayout>
  );
}
