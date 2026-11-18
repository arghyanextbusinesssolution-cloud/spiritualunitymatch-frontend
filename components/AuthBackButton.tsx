'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

// Back button for the login / sign-up pages.
// Goes to the previous page on this site; if there is none (direct visit, new tab,
// or the user came from another site) it goes to the homepage instead.
export default function AuthBackButton() {
  const router = useRouter();

  const handleBack = () => {
    const cameFromThisSite =
      typeof document !== 'undefined' &&
      document.referrer &&
      new URL(document.referrer).origin === window.location.origin &&
      !new URL(document.referrer).pathname.startsWith('/auth');

    if (cameFromThisSite && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      aria-label="Go back"
      className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/85 backdrop-blur-md border border-white/60 shadow-sm text-sm font-semibold text-neutral-700 hover:bg-white transition-colors"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
