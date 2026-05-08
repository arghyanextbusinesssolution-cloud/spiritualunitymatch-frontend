'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import api from '@/lib/api';

const PROMPTS = [
  'What did today teach you about love?',
  'What are you healing from right now?',
  'What does conscious connection mean to you?',
  'How do you want to show up in relationships?',
  'What emotion has been visiting you most lately?',
  'What would your soul say if it could speak freely today?',
];

export default function ReflectPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [userProfilePhoto, setUserProfilePhoto] = useState<string | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState(PROMPTS[0]);
  const [entry, setEntry] = useState('');
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) { router.push('/auth/login'); return; }
    if (user) {
      fetchProfile();
      // Pick a random prompt each visit
      setSelectedPrompt(PROMPTS[Math.floor(Math.random() * PROMPTS.length)]);
    }
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

  const handleSave = async () => {
    if (!entry.trim()) return;
    setSaving(true);
    // Simulate save (replace with real API call if journal endpoint exists)
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (authLoading || !user) return null;

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
              📝 Reflect
            </h1>
            <p className="text-xs text-gray-500 font-semibold">Journal your inner world</p>
          </div>
        </div>

        {/* Today's Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500/80 to-indigo-600/80 backdrop-blur-xl rounded-3xl p-5 text-white shadow-xl"
        >
          <p className="text-[9px] font-black uppercase tracking-widest opacity-70 mb-2">Today's Prompt</p>
          <p className="text-base font-black leading-snug">{selectedPrompt}</p>
        </motion.div>

        {/* Other Prompts */}
        <div>
          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Or choose another</p>
          <div className="flex flex-col gap-2">
            {PROMPTS.filter(p => p !== selectedPrompt).map((prompt, i) => (
              <motion.button
                key={prompt}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => { setSelectedPrompt(prompt); setEntry(''); }}
                className="w-full text-left bg-white/30 backdrop-blur-md border border-white/50 rounded-2xl p-3.5 text-sm font-semibold text-gray-700 hover:bg-white/50 active:scale-[0.98] transition-all"
              >
                {prompt}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Journal Entry */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/40 backdrop-blur-2xl rounded-3xl shadow-xl p-5 border border-white/70 space-y-4"
        >
          <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest">
            Your reflection
          </label>
          <textarea
            value={entry}
            onChange={e => setEntry(e.target.value)}
            rows={7}
            placeholder="Let your thoughts flow freely..."
            className="w-full bg-white/50 border border-white/60 rounded-2xl p-4 text-sm text-gray-800 font-semibold placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-gray-400 font-bold">{entry.length} characters</span>
            <button
              onClick={handleSave}
              disabled={!entry.trim() || saving}
              className={`px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-md ${
                saved
                  ? 'bg-green-500 text-white'
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white disabled:opacity-50'
              }`}
            >
              {saving ? 'Saving...' : saved ? '✓ Saved' : 'Save Entry'}
            </button>
          </div>
        </motion.div>

      </div>
    </ResponsiveLayout>
  );
}
