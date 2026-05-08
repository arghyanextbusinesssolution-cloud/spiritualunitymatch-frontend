'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import api from '@/lib/api';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import CheckInCalendar from '@/components/CheckInCalendar';

type Emotion = 'calm' | 'heavy' | 'open' | 'confused' | 'hopeful';
type Need = 'connection' | 'healing' | 'clarity' | 'growth' | 'rest';
type Energy = 'low' | 'balanced' | 'high';

const EMOTIONS: { value: Emotion; emoji: string; label: string }[] = [
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'heavy', emoji: '😔', label: 'Heavy' },
  { value: 'open', emoji: '😊', label: 'Open' },
  { value: 'confused', emoji: '😕', label: 'Confused' },
  { value: 'hopeful', emoji: '✨', label: 'Hopeful' },
];

const NEEDS: Need[] = ['connection', 'healing', 'clarity', 'growth', 'rest'];
const ENERGIES: Energy[] = ['low', 'balanced', 'high'];

export default function CheckInPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(null);
  const [checkInData, setCheckInData] = useState<{ emotion: Emotion | null; need: Need | null; energy: Energy | null }>({
    emotion: null, need: null, energy: null,
  });
  const [todayCheckIn, setTodayCheckIn] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [soulScore, setSoulScore] = useState<number | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    if (!authLoading && !user) { router.push('/auth/login'); return; }
    if (user) fetchAll();
  }, [user, authLoading, router]);

  const fetchAll = async () => {
    try {
      const [profileRes, checkInRes, scoreRes] = await Promise.all([
        api.get('/profiles/me'),
        api.get('/soul/check-in'),
        api.get('/soul/score'),
      ]);
      if (profileRes.data.success && profileRes.data.profile) {
        const photo = profileRes.data.profile.photos?.find((p: any) => p.isPrimary)?.url || profileRes.data.profile.photos?.[0]?.url;
        setUserProfilePhoto(photo || null);
      }
      if (checkInRes.data.success && checkInRes.data.checkIn) {
        setTodayCheckIn(checkInRes.data.checkIn);
        const ci = checkInRes.data.checkIn;
        setCheckInData({ emotion: ci.emotion, need: ci.need, energy: ci.energy });
      }
      if (scoreRes.data.success) setSoulScore(scoreRes.data.score);
    } catch {}
  };

  const saveCheckIn = async () => {
    if (!checkInData.emotion || !checkInData.need || !checkInData.energy) return;
    setSaving(true);
    try {
      const res = await api.post('/soul/check-in', checkInData);
      if (res.data.success) {
        setTodayCheckIn(res.data.checkIn);
        const scoreRes = await api.get('/soul/score');
        if (scoreRes.data.success) setSoulScore(scoreRes.data.score);
        showNotification("You've aligned with yourself today. ✨");
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        showNotification(error.response.data.message || 'Already checked in today.', 'info');
        await fetchAll();
      } else {
        showNotification('Error saving check-in.', 'error');
      }
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) return null;

  const isComplete = !!checkInData.emotion && !!checkInData.need && !!checkInData.energy;

  return (
    <ResponsiveLayout userProfilePhoto={userProfilePhoto}>
      <div className="w-full overflow-x-hidden px-4 py-6 pb-28 max-w-lg mx-auto space-y-5">

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
              💭 Daily Check-In
            </h1>
            <p className="text-xs text-gray-500 font-semibold">Tune in to how you feel right now</p>
          </div>
          {todayCheckIn && (
            <span className="text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-600 border border-green-500/20 px-2.5 py-1 rounded-full flex-shrink-0">
              ✓ Aligned
            </span>
          )}
        </div>

        {/* Check-In Form */}
        <div className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-xl p-5 border border-white/70 w-full space-y-6">

          {/* Feeling */}
          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
              Feeling?
            </label>
            <div className="grid grid-cols-5 gap-2 w-full">
              {EMOTIONS.map(({ value, emoji, label }) => (
                <button
                  key={value}
                  onClick={() => !todayCheckIn && setCheckInData(prev => ({ ...prev, emotion: value }))}
                  disabled={!!todayCheckIn}
                  title={label}
                  className={`flex flex-col items-center gap-1 py-2 rounded-xl transition-all ${
                    checkInData.emotion === value
                      ? 'bg-white/70 ring-2 ring-purple-400 shadow-lg'
                      : 'bg-white/20 border border-white/30'
                  }`}
                >
                  <span className="text-xl">{emoji}</span>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-wide">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Need */}
          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
              Need?
            </label>
            <div className="grid grid-cols-2 gap-2 w-full">
              {NEEDS.map((need) => (
                <button
                  key={need}
                  onClick={() => !todayCheckIn && setCheckInData(prev => ({ ...prev, need }))}
                  disabled={!!todayCheckIn}
                  className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    checkInData.need === need
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white/30 text-gray-600 border border-white/40'
                  }`}
                >
                  {need}
                </button>
              ))}
            </div>
          </div>

          {/* Energy */}
          <div>
            <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">
              Energy?
            </label>
            <div className="grid grid-cols-3 gap-2 w-full">
              {ENERGIES.map((energy) => (
                <button
                  key={energy}
                  onClick={() => !todayCheckIn && setCheckInData(prev => ({ ...prev, energy }))}
                  disabled={!!todayCheckIn}
                  className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    checkInData.energy === energy
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'bg-white/30 text-gray-600 border border-white/40'
                  }`}
                >
                  {energy}
                </button>
              ))}
            </div>
          </div>

          {/* Save Button */}
          {!todayCheckIn && isComplete && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={saveCheckIn}
              disabled={saving}
              className="w-full bg-purple-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-purple-500/20 active:scale-95 transition-all disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Complete ✨'}
            </motion.button>
          )}
        </div>

        {/* Calendar */}
        <CheckInCalendar />

        {/* Soul Score */}
        {soulScore !== null && (
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-5 text-white shadow-xl flex items-center justify-between">
            <div>
              <h3 className="text-[9px] font-black uppercase tracking-widest opacity-80 mb-1">Soul Score</h3>
              <p className="text-[9px] font-bold opacity-60">Thriving</p>
            </div>
            <div className="text-3xl font-black">{soulScore}</div>
          </div>
        )}
      </div>

      {/* Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            className={`fixed left-1/2 top-4 z-[100] px-6 py-3 rounded-2xl shadow-2xl backdrop-blur-xl border flex items-center gap-3 min-w-[260px] max-w-[90vw] ${
              notification.type === 'success'
                ? 'bg-purple-500/80 border-purple-400 text-white'
                : 'bg-white/80 border-white/50 text-gray-800'
            }`}
          >
            <p className="font-bold text-xs tracking-tight">{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </ResponsiveLayout>
  );
}
