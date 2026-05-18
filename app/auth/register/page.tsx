'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLoading } from '@/contexts/LoadingContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import ComingSoonModal from '@/components/ComingSoonModal';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const { startLoading } = useLoading();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState<{ open: boolean; provider: string }>({ open: false, provider: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(email, password);
      startLoading();
      router.push('/profile/setup');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const bgImage = "/screen.png";

  return (
    <div className="min-h-screen font-body-md text-on-surface antialiased" style={{ 
      backgroundImage: `url('${bgImage}')`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundAttachment: 'fixed', 
      backgroundRepeat: 'no-repeat' 
    }}>
      <main className="relative pt-20 pb-10 px-margin-mobile md:px-margin-desktop flex flex-col items-center justify-center min-h-screen overflow-hidden">
        {/* Registration Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[480px] p-6 md:p-8 rounded-xl floating-card relative z-10 bg-white/85 backdrop-blur-xl"
        >
          <div className="text-center mb-6">
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">Begin Your Soulful Journey</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Join a community of conscious souls.</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-xl mb-4 text-xs"
            >
              {error}
            </motion.div>
          )}

          {/* Social Auth Section */}
          <div className="flex flex-col gap-3 mb-6">
            <button 
              onClick={() => setComingSoonModal({ open: true, provider: 'Google' })}
              className="w-full py-3 px-6 flex items-center justify-center gap-3 border-[1.5px] border-outline-variant rounded-full font-body-md text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
              </svg>
              Continue with Google
            </button>
            <button 
              onClick={() => setComingSoonModal({ open: true, provider: 'Apple' })}
              className="w-full py-3 px-6 flex items-center justify-center gap-3 bg-inverse-surface border-[1.5px] border-inverse-surface rounded-full font-body-md text-inverse-on-surface hover:opacity-90 transition-opacity cursor-pointer active:scale-[0.98]"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96 0-2.04-.6-3.23-.6-1.2 0-2.09.58-3.17.58-1.5 0-3.92-2.31-3.92-5.91 0-3.11 1.95-4.75 3.8-4.75 1.05 0 1.92.68 2.83.68.85 0 1.6-.68 2.8-.68 1.13 0 2.25.53 2.91 1.34-2.58 1.16-2.15 4.79.52 5.86-.73 1.66-1.56 2.84-2.54 2.84zm-3.05-13.62c0-2.11 1.76-3.86 3.84-3.86.13 0 .26.01.38.03-.13 2.14-1.85 3.88-3.83 3.88-.13 0-.27-.01-.39-.05z"></path>
              </svg>
              Continue with Apple
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-grow h-[1px] bg-outline-variant"></div>
            <span className="font-label-caps text-[10px] text-on-surface-variant">OR</span>
            <div className="flex-grow h-[1px] bg-outline-variant"></div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-5 py-3 bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-full font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none" 
                placeholder="example@soul.com" 
              />
            </div>
            <div>
              <label className="block font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3 pr-12 bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-full font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none" 
                  placeholder="Min. 8 characters" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.63-2.92 3.12-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm5.31-7.78l3.15 3.15.02-.02c.52-.04 1.06-.07 1.59-.07 5 0 9.27 3.11 11 7.5-.63 1.91-1.77 3.63-3.25 5.05l.01.01l2.94 2.94 1.27-1.27L4.27 3 3 4.27l9.84 9.84z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block font-label-caps text-[10px] text-on-surface-variant mb-1 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-5 py-3 pr-12 bg-surface-container-low border-none focus:ring-1 focus:ring-primary rounded-full font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 transition-all outline-none" 
                  placeholder="Confirm your password" 
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.63-2.92 3.12-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 001 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm5.31-7.78l3.15 3.15.02-.02c.52-.04 1.06-.07 1.59-.07 5 0 9.27 3.11 11 7.5-.63 1.91-1.77 3.63-3.25 5.05l.01.01l2.94 2.94 1.27-1.27L4.27 3 3 4.27l9.84 9.84z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-6 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-full aura-glow hover:opacity-95 transition-all cursor-pointer active:scale-95 shadow-lg disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create My Account'}
            </button>
            
            <p className="text-center font-label-caps text-[9px] leading-relaxed text-on-surface-variant mt-2">
              Already have an account? <Link href="/auth/login" className="text-primary font-bold hover:underline">Sign In</Link>
            </p>
          </form>
        </motion.div>
      </main>


      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={comingSoonModal.open}
        onClose={() => setComingSoonModal({ open: false, provider: '' })}
        provider={comingSoonModal.provider}
      />
    </div>
  );
}
