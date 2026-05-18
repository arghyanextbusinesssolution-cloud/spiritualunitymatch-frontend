'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import api from '@/lib/api';
import { useLoading } from '@/contexts/LoadingContext';
import DefaultNavbar from '@/components/DefaultNavbar';
import { CheckCircle2, Leaf, Star, Sparkles } from 'lucide-react';

interface Plan {
  name: string;
  plan: 'basic' | 'standard' | 'premium';
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: React.ReactNode;
}

const plans: Plan[] = [
  {
    name: 'Basic',
    plan: 'basic',
    price: '$0',
    description: 'Start your spiritual journey',
    features: [
      'Create profile',
      'View own profile',
      '10 profile views/day',
      'Limited likes',
    ],
    icon: <Leaf className="w-10 h-10 text-primary" />,
  },
  {
    name: 'Standard',
    plan: 'standard',
    price: '$19',
    description: 'Our most popular choice',
    features: [
      'Unlimited profile browsing',
      'Full messaging access',
      'See who liked you',
      'Improved profile visibility',
    ],
    popular: true,
    icon: <Star className="w-10 h-10 text-primary fill-primary" />,
  },
  {
    name: 'Premium',
    plan: 'premium',
    price: '$39',
    description: 'Divine connection experience',
    features: [
      'Priority search placement',
      'Advanced spiritual filters',
      'Soul compatibility reports',
      'Personal matchmaking',
    ],
    icon: <Sparkles className="w-10 h-10 text-primary" />,
  },
];

export default function PlansPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { startLoading } = useLoading();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, authLoading, router]);

  const handleSelectPlan = async (plan: 'basic' | 'standard' | 'premium') => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    console.log(`💳 [PLANS] Selecting plan: ${plan}`);
    try {
      const response = await api.post('/subscriptions/create-checkout', {
        plan,
        billingCycle: 'monthly',
      });

      console.log('💳 [PLANS] API Response:', response.data);

      if (response.data.success) {
        console.log('💳 [PLANS] Checkout session created. Redirecting to:', response.data.redirectUrl || '/subscription/success');
        startLoading(); // Trigger global loader before redirect
        if (response.data.redirectUrl) {
          // Use window.location.href for external Stripe URL
          window.location.href = response.data.redirectUrl;
        } else {
          router.push('/subscription/success');
        }
      }
    } catch (error: any) {
      console.error('💳 [PLANS] Checkout error:', error);
      alert(error.response?.data?.message || 'Error activating subscription');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentRole = user?.role || 'basic';
  const isFreePlan = currentRole === 'basic' || currentRole === 'user';
  const isStandardPlan = currentRole === 'standard';
  const isPremiumPlan = currentRole === 'premium';

  // Filter plans based on the user's current subscription level
  const visiblePlans = plans.filter((plan) => {
    if (isFreePlan) {
      // Free users see Standard and Premium
      return plan.plan === 'standard' || plan.plan === 'premium';
    } else if (isStandardPlan) {
      // Standard users upgrade to Premium only
      return plan.plan === 'premium';
    }
    return false; // Premium users see no more upgrade plans (congratulations view)
  });

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md overflow-x-hidden">
      <DefaultNavbar />
      
      {/* Main Content Canvas */}
      <main className="relative min-h-screen pt-32 pb-24 overflow-hidden">
        {/* Hero Background Section */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <img 
            className="w-full h-full object-cover opacity-20" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNj-iIx6rmx0LL3XfqvGFjtyT3FNt0nP4A9PAQCZaBtnub9bJ5fCD0vjvibTO5RXDluWZXwrfb5M6ZulD4buHycjW7SC_l71Cr-rjbr_suBrnEpEeI6HpKnqr4QW36vKlk4jaJb4LIKeMcs3sTE4Haon9MdL33kTw1pPvS5NHMFOJvMKh711enGrgfUcVvFPGBoxhaDH_9mmdWCQoneNkf8trR4n6Z70z6V3kMebQt4Nk7tBtENijRWiRMoj6peh6oiQLAGzawoqwJ" 
            alt="Spiritual Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface"></div>
        </div>

        {/* Content Container */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-16 text-center">
          
          {/* 1. PREMIUM USER CONGRATULATIONS PAGE */}
          {isPremiumPlan && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto glass-card bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-3xl p-12 border border-primary/30 shadow-2xl relative aura-glow-tertiary mt-8"
            >
              <div className="absolute inset-0 -z-10 rounded-3xl opacity-50 bg-[radial-gradient(circle,rgba(107,56,212,0.15)_0%,rgba(255,255,255,0)_70%)]"></div>
              
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-primary-container/20 flex items-center justify-center mx-auto mb-8 animate-bounce">
                <Sparkles className="w-12 h-12 text-primary" />
              </div>

              <h1 className="text-4xl font-extrabold mb-4 text-on-surface tracking-tight">
                You possess the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Divine Connection</span>
              </h1>
              <p className="text-lg text-on-surface-variant mb-10 max-w-lg mx-auto">
                Thank you for being a part of our spiritual dating community! You are currently on the top-tier <strong>Premium Plan</strong>. All features are fully unlocked.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-md mx-auto mb-10">
                <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-base font-medium text-on-surface">Unlimited Daily Swipes</span>
                </div>
                <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-base font-medium text-on-surface">Priority Search Ranking</span>
                </div>
                <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-base font-medium text-on-surface">Unlimited Messaging</span>
                </div>
                <div className="flex items-center gap-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                  <span className="text-base font-medium text-on-surface">Soul Compatibility Reports</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/matches/suggested')}
                className="px-10 py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-white text-xs font-bold uppercase tracking-widest transition-transform hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                Go Swiping suggested matches
              </button>
            </motion.div>
          )}

          {/* 2. UPGRADE FROM STANDARD TO PREMIUM ONLY */}
          {!isPremiumPlan && isStandardPlan && (
            <div>
              {/* Header Group */}
              <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-on-surface tracking-tight">
                  Unlock Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Divine Alignment</span>
                </h1>
                <p className="max-w-xl mx-auto text-lg text-on-surface-variant">
                  You are already a Standard member. Upgrade to Premium for absolute connection, advanced spiritual filtering, and personal soul matchmaking.
                </p>
              </div>

              {/* Center focused single Premium Card */}
              <div className="flex justify-center items-stretch max-w-xl mx-auto">
                {visiblePlans.map((plan, index) => (
                  <motion.div
                    key={plan.plan}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -8 }}
                    className="glass-card bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-3xl p-10 flex flex-col items-center border border-primary shadow-2xl aura-glow-tertiary relative w-full"
                  >
                    <div className="absolute inset-0 -z-10 rounded-3xl opacity-50 bg-[radial-gradient(circle,rgba(107,56,212,0.1)_0%,rgba(255,255,255,0)_70%)]"></div>

                    <div className="absolute -top-4 bg-primary text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                      ULTIMATE LEVEL
                    </div>

                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-primary/10">
                      {plan.icon}
                    </div>

                    <h3 className="text-3xl font-extrabold mb-2 text-on-surface">{plan.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">{plan.description}</p>
                    
                    <div className="mb-8 flex items-baseline justify-center gap-1">
                      <span className="text-6xl font-extrabold text-on-surface">{plan.price}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">/ MONTH</span>
                    </div>

                    <ul className="w-full space-y-4 mb-10 text-left flex-1 border-t border-b border-primary/10 py-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-base text-on-surface font-medium">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSelectPlan(plan.plan)}
                      disabled={loading}
                      className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 bg-gradient-to-r from-primary to-primary-container text-white shadow-md hover:scale-[1.02]"
                    >
                      {loading ? 'Processing...' : 'UPGRADE TO PREMIUM'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* 3. UPGRADE FROM FREE (BASIC) TO STANDARD & PREMIUM */}
          {!isPremiumPlan && !isStandardPlan && (
            <div>
              {/* Header Group */}
              <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-on-surface tracking-tight">
                  Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Spiritual Path</span>
                </h1>
                <p className="max-w-xl mx-auto text-lg text-on-surface-variant">
                  Upgrade your journey from Free Tier to unlock more daily swipes, complete messaging, and detailed soul alignment reports.
                </p>
              </div>

              {/* Dynamic Grid showing Standard & Premium side-by-side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
                {visiblePlans.map((plan, index) => (
                  <motion.div
                    key={plan.plan}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className={`glass-card bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-2xl p-8 flex flex-col items-center border ${
                      plan.plan === 'premium' 
                        ? 'border-primary shadow-xl aura-glow-tertiary relative' 
                        : 'border-white/30 dark:border-white/10 hover:shadow-xl aura-glow-primary'
                    }`}
                  >
                    <div className={`absolute inset-0 -z-10 rounded-2xl opacity-50 ${plan.plan === 'premium' ? 'bg-[radial-gradient(circle,rgba(107,56,212,0.08)_0%,rgba(255,255,255,0)_70%)]' : 'bg-[radial-gradient(circle,rgba(182,23,34,0.08)_0%,rgba(255,255,255,0)_70%)]'}`}></div>

                    {plan.plan === 'premium' && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                        RECOMMENDED / BEST VALUE
                      </div>
                    )}

                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${plan.plan === 'premium' ? 'bg-primary/10' : 'bg-surface-container-low dark:bg-white/5'}`}>
                      {plan.icon}
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-on-surface">{plan.name}</h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">{plan.description}</p>
                    
                    <div className="mb-8 flex items-baseline justify-center gap-1">
                      <span className="text-5xl font-extrabold text-on-surface">{plan.price}</span>
                      <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">/ MONTH</span>
                    </div>

                    <ul className="w-full space-y-4 mb-10 text-left flex-1">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span className="text-base text-on-surface">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handleSelectPlan(plan.plan)}
                      disabled={loading}
                      className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all disabled:opacity-50 ${
                        plan.plan === 'premium'
                          ? 'bg-gradient-to-r from-primary to-primary-container text-white shadow-md hover:scale-[1.02]'
                          : 'border-2 border-primary text-primary hover:bg-primary/5'
                      }`}
                    >
                      {loading ? 'Processing...' : 'SELECT PLAN'}
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ/Quick Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-24 max-w-3xl mx-auto glass-card bg-white/70 dark:bg-black/40 backdrop-blur-2xl p-12 rounded-2xl text-left border border-white/30 dark:border-white/10 shadow-lg"
          >
            <h4 className="text-2xl font-bold mb-8 text-on-surface">Ready to find your spiritual connection?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">SAFE & SECURE</h5>
                <p className="text-on-surface-variant text-base">Your spiritual journey is protected by our high-end security protocols.</p>
              </div>
              <div>
                <h5 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">NO HIDDEN FEES</h5>
                <p className="text-on-surface-variant text-base">Transparency is key to a soulful connection. What you see is what you pay.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
