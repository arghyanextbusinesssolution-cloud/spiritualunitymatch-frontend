"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";
import { Loader } from "@/components/Loader";
import DefaultNavbar from "@/components/DefaultNavbar";

// ── Eagerly loaded (above the fold) ─────────────────────────────────────────
import HeroSection from "@/components/home/HeroSection";

// ── Lazily loaded (below the fold – split into separate JS chunks) ───────────
const AboutSection = dynamic(() => import("@/components/home/AboutSection"), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});
const FeaturesSection = dynamic(
  () => import("@/components/home/FeaturesSection"),
  { loading: () => <SectionSkeleton />, ssr: false }
);
const HowItWorksSection = dynamic(
  () => import("@/components/home/HowItWorksSection"),
  { loading: () => <SectionSkeleton />, ssr: false }
);
const PricingPreviewSection = dynamic(
  () => import("@/components/home/PricingPreviewSection"),
  { loading: () => <SectionSkeleton />, ssr: false }
);
const TestimonialsSection = dynamic(
  () => import("@/components/home/TestimonialsSection"),
  { loading: () => <SectionSkeleton />, ssr: false }
);
const CTASection = dynamic(() => import("@/components/home/CTASection"), {
  loading: () => <SectionSkeleton height="h-64" />,
  ssr: false,
});
const SiteFooter = dynamic(() => import("@/components/home/SiteFooter"), {
  ssr: false,
});

// HeartSync modal – very lazily loaded (triggered after 10 s)
const HeartSyncModal = dynamic(
  () => import("@/components/home/HeartSyncModal"),
  { ssr: false }
);
const BackToTopButton = dynamic(
  () => import("@/components/common/BackToTopButton"),
  { ssr: false }
);

// ── Minimal inline skeleton so the page doesn't jump ────────────────────────
function SectionSkeleton({ height = "h-48" }: { height?: string }) {
  return (
    <div
      className={`section-pad flex items-center justify-center ${height}`}
      aria-hidden
    >
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-purple-300 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showHeartSync, setShowHeartSync] = useState(false);

  // Redirect logged-in users immediately
  useEffect(() => {
    if (!loading && user) {
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/matches/suggested");
      }
    }
  }, [user, loading, router]);

  // Show Heart Sync modal after 10 s for guests only
  useEffect(() => {
    if (loading || user) return;
    const id = setTimeout(() => setShowHeartSync(true), 10_000);
    return () => clearTimeout(id);
  }, [loading, user]);

  if (loading || user) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-white">
      <DefaultNavbar />

      <main>
        {/* ── Above the fold (eager) ── */}
        <HeroSection />

        {/* ── Below the fold (lazy / code-split) ── */}
        <AboutSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingPreviewSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <SiteFooter />

      {/* Floating UI */}
      <BackToTopButton />

      {/* Heart Sync personality quiz – loaded only when needed */}
      <HeartSyncModal
        open={showHeartSync}
        onClose={() => setShowHeartSync(false)}
      />
    </div>
  );
}