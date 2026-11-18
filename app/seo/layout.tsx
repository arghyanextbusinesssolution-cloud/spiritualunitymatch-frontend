'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, ExternalLink, LogOut } from 'lucide-react';

// Roles allowed into the SEO dashboard
const ALLOWED_ROLES = ['seo', 'admin'];

export default function SeoLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading: authLoading, logout } = useAuth();

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace('/auth/login');
    } else if (!ALLOWED_ROLES.includes(user.role)) {
      router.replace('/dashboard');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user || !ALLOWED_ROLES.includes(user.role)) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-700">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white shrink-0">
              <FileText size={18} />
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white leading-tight">SEO Dashboard</h1>
              <p className="text-xs text-neutral-500 truncate">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/blog"
              target="_blank"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              <ExternalLink size={16} />
              View Blog
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-red-50 hover:text-red-600 dark:text-neutral-300 dark:hover:bg-red-900/20"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6">{children}</main>
    </div>
  );
}
