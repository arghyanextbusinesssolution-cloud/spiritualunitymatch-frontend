'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import api from '@/lib/api';
import ResponsiveLayout from '@/components/ResponsiveLayout';
import { CheckCircle2, Leaf, Star, Sparkles, X, Calendar, CreditCard, Compass } from 'lucide-react';

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
    name: 'Standard',
    plan: 'standard',
    price: '$19',
    description: 'Our most popular choice',
    features: [
      '30 daily swipes (likes + rejects)',
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
      'Unlimited daily swipes',
      'Priority search placement',
      'Advanced spiritual filters',
      'Soul compatibility reports',
      'Personal matchmaking insights',
    ],
    icon: <Sparkles className="w-10 h-10 text-primary" />,
  },
];

export default function SubscriptionPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [subscription, setSubscription] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [userProfilePhoto, setUserProfilePhoto] = useState<string>('');
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth/login');
      return;
    }

    if (user) {
      fetchSubscription();
      fetchProfile();
    }
  }, [user, authLoading, router]);

  const fetchSubscription = async () => {
    try {
      const response = await api.get('/subscriptions/my-subscription');
      if (response.data.success) {
        setSubscription(response.data.subscription);
      }
    } catch (error) {
      console.error('Fetch subscription error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await api.get('/profiles/me');
      if (response.data.success && response.data.profile) {
        setProfile(response.data.profile);
        const photo = response.data.profile?.photos?.find((p: any) => p.isPrimary)?.url ||
          response.data.profile?.photos?.[0]?.url;
        setUserProfilePhoto(photo);
      }
    } catch (error) {
      console.error('Fetch profile error:', error);
    }
  };

  const handleCancel = async () => {
    setCancelLoading(true);
    console.log('🗑️ [SUBSCRIPTION] Initiating cancellation');
    try {
      const response = await api.post('/subscriptions/cancel');
      if (response.data.success) {
        showToast(response.data.message || 'Subscription will cancel at the period end.', 'success');
        setShowCancelModal(false);
        await fetchSubscription(); // Refresh state
      }
    } catch (error: any) {
      console.error('🗑️ [SUBSCRIPTION] Cancel error:', error);
      showToast(error.response?.data?.message || 'Error canceling subscription', 'error');
    } finally {
      setCancelLoading(false);
    }
  };

  const handleSelectPlan = async (plan: 'basic' | 'standard' | 'premium') => {
    setCheckoutLoading(true);
    console.log(`💳 [PLANS] Selecting plan inside modal: ${plan}`);
    try {
      const response = await api.post('/subscriptions/create-checkout', {
        plan,
        billingCycle: 'monthly',
      });

      if (response.data.success) {
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;
        } else {
          router.push('/subscription/success');
        }
      }
    } catch (error: any) {
      console.error('💳 [PLANS] Checkout error:', error);
      showToast(error.response?.data?.message || 'Error activating subscription', 'error');
    } finally {
      setCheckoutLoading(false);
    }
  };

  if (authLoading || loading) {
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

  // Filter plans available for upgrade in the popup modal
  const upgradePlans = plans.filter((plan) => {
    if (isFreePlan) {
      // Free users can upgrade to Standard or Premium
      return plan.plan === 'standard' || plan.plan === 'premium';
    } else if (isStandardPlan) {
      // Standard users can upgrade to Premium only
      return plan.plan === 'premium';
    }
    return false; // Premium users cannot upgrade
  });

  const getPlanVisuals = () => {
    if (isPremiumPlan) {
      return {
        badge: 'Divine Premium',
        gradient: 'from-amber-500/10 via-yellow-500/5 to-amber-600/10',
        border: 'border-amber-400',
        text: 'text-amber-600 dark:text-amber-400',
        icon: <Sparkles className="w-12 h-12 text-amber-500" />,
        bgGlow: 'bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,rgba(255,255,255,0)_70%)]'
      };
    } else if (isStandardPlan) {
      return {
        badge: 'Spiritual Standard',
        gradient: 'from-purple-500/10 via-pink-500/5 to-purple-600/10',
        border: 'border-purple-400',
        text: 'text-purple-600 dark:text-purple-400',
        icon: <Star className="w-12 h-12 text-purple-500 fill-purple-500" />,
        bgGlow: 'bg-[radial-gradient(circle,rgba(168,85,247,0.12)_0%,rgba(255,255,255,0)_70%)]'
      };
    } else {
      return {
        badge: 'Free Journeyer',
        gradient: 'from-teal-500/10 via-cyan-500/5 to-teal-600/10',
        border: 'border-teal-400/50',
        text: 'text-teal-600 dark:text-teal-400',
        icon: <Leaf className="w-12 h-12 text-teal-500" />,
        bgGlow: 'bg-[radial-gradient(circle,rgba(20,184,166,0.12)_0%,rgba(255,255,255,0)_70%)]'
      };
    }
  };

  const visuals = getPlanVisuals();
  const isActive = subscription?.isActive || isFreePlan;

  // Format subscription details
  const formattedEndDate = subscription?.endDate
    ? new Date(subscription.endDate).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Ongoing';

  const billingCycleLabel = subscription?.billingCycle === 'yearly' ? 'Yearly' : 'Monthly';

  return (
    <ResponsiveLayout userProfilePhoto={userProfilePhoto}>
      <div className="min-h-screen bg-surface text-on-surface font-body-md relative overflow-hidden pb-24 md:pb-8">
        
        {/* Background Image */}
        <div className="absolute inset-0 -z-10 w-full h-full">
          <img 
            className="w-full h-full object-cover opacity-10" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNj-iIx6rmx0LL3XfqvGFjtyT3FNt0nP4A9PAQCZaBtnub9bJ5fCD0vjvibTO5RXDluWZXwrfb5M6ZulD4buHycjW7SC_l71Cr-rjbr_suBrnEpEeI6HpKnqr4QW36vKlk4jaJb4LIKeMcs3sTE4Haon9MdL33kTw1pPvS5NHMFOJvMKh711enGrgfUcVvFPGBoxhaDH_9mmdWCQoneNkf8trR4n6Z70z6V3kMebQt4Nk7tBtENijRWiRMoj6peh6oiQLAGzawoqwJ" 
            alt="Spiritual Landscape"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface via-transparent to-surface"></div>
        </div>

        {/* Dashboard Frame */}
        <div className="max-w-3xl mx-auto px-4 pt-8">
          
          {/* Header Title */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">Subscription Path</h1>
              <p className="text-sm text-on-surface-variant">Manage your alignment plan & benefits</p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-xs font-bold uppercase tracking-widest bg-white/70 dark:bg-black/30 backdrop-blur border border-white/20 rounded-full hover:scale-105 active:scale-95 transition-transform shadow-sm"
            >
              Back
            </button>
          </div>

          {/* Active Card Details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-card bg-gradient-to-br ${visuals.gradient} backdrop-blur-2xl rounded-3xl p-8 border ${visuals.border} shadow-2xl relative overflow-hidden`}
          >
            <div className={`absolute inset-0 -z-10 rounded-3xl opacity-50 ${visuals.bgGlow}`}></div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/20 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-white/40 dark:bg-white/5 backdrop-blur flex items-center justify-center shadow-inner">
                  {visuals.icon}
                </div>
                <div>
                  <div className="inline-block bg-primary/10 border border-primary/20 text-primary text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-1">
                    {visuals.badge}
                  </div>
                  <h2 className="text-3xl font-extrabold text-on-surface tracking-tight capitalize">{currentRole} Plan</h2>
                </div>
              </div>

              <div className="flex flex-col items-start md:items-end gap-1">
                <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Active Status</span>
                {subscription?.cancelAtPeriodEnd ? (
                  <span className="flex items-center gap-2 text-base font-extrabold text-amber-500">
                    <span className="h-2.5 w-2.5 bg-amber-500 rounded-full animate-pulse"></span>
                    Scheduled to Cancel
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-base font-extrabold text-green-500">
                    <span className="h-2.5 w-2.5 bg-green-500 rounded-full animate-ping"></span>
                    Active Plan
                  </span>
                )}
              </div>
            </div>

            {/* Plan Specific Date and Period details */}
            <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-0.5">Renew Date</span>
                  <span className="text-base font-extrabold text-on-surface">{formattedEndDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-0.5">Billing Cycle</span>
                  <span className="text-base font-extrabold text-on-surface">{isFreePlan ? 'None (Free Tier)' : `${billingCycleLabel} 📅`}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Compass className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant block mb-0.5">Swipe Limit</span>
                  <span className="text-base font-extrabold text-on-surface">
                    {isPremiumPlan ? 'Unlimited 🔥' : isStandardPlan ? '30 daily swipes' : '10 daily swipes'}
                  </span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Current Benefits */}
          <div className="mt-8">
            <h3 className="text-lg font-bold text-on-surface mb-4">Your Active Path Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {isPremiumPlan ? (
                <>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">Unlimited Swipes (likes & rejects)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">Priority search ranking placement</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">Advanced spiritual practice filters</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">Premium Soul Compatibility Reports</span>
                  </div>
                </>
              ) : isStandardPlan ? (
                <>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">30 Daily swipes (likes + rejects)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">Full messaging access</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">See who liked your profile</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">Community spiritual check-ins</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">10 Daily swipes (likes + rejects)</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">Create own profile & photos</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white/40 dark:bg-white/5 backdrop-blur p-4 rounded-2xl border border-white/20 dark:border-white/10">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm font-semibold text-on-surface">View suggested matches</span>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-10 space-y-4">
            {subscription?.cancelAtPeriodEnd && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center">
                <p className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                  ⚠️ Your subscription is scheduled to cancel. You will maintain access to your benefits until {formattedEndDate}.
                </p>
              </div>
            )}

            {!isPremiumPlan && (
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-4 rounded-2xl font-bold uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Upgrade Subscription
              </button>
            )}

            {!isFreePlan && !subscription?.cancelAtPeriodEnd && (
              <button
                onClick={() => setShowCancelModal(true)}
                className="w-full bg-white/60 dark:bg-black/20 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 py-4 rounded-2xl font-bold uppercase tracking-widest border border-red-200 dark:border-red-950/50 transition-all text-xs"
              >
                Cancel Subscription
              </button>
            )}
          </div>

        </div>

        {/* 4. UPGRADATION POPUP MODAL */}
        <AnimatePresence>
          {showUpgradeModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowUpgradeModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              {/* Modal Card Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="bg-white/95 dark:bg-surface-container-high/95 backdrop-blur-2xl rounded-3xl border border-white/20 p-8 shadow-2xl relative w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10"
              >
                
                {/* Close Button */}
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/70 dark:bg-black/30 backdrop-blur border border-white/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                >
                  <X className="w-5 h-5 text-on-surface" />
                </button>

                {/* Header */}
                <div className="text-center mb-8 pr-8">
                  <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">Choose Your Path</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Elevate your connections with higher alignment plans</p>
                </div>

                {/* Grid showing available plans dynamically */}
                <div className={`grid grid-cols-1 ${upgradePlans.length === 1 ? 'max-w-md mx-auto' : 'md:grid-cols-2 max-w-3xl mx-auto'} gap-8 items-stretch`}>
                  {upgradePlans.map((plan, index) => (
                    <motion.div
                      key={plan.plan}
                      whileHover={{ y: -6 }}
                      className={`glass-card bg-white/70 dark:bg-black/40 backdrop-blur-2xl rounded-2xl p-6 flex flex-col items-center border relative ${
                        plan.plan === 'premium' 
                          ? 'border-primary shadow-xl aura-glow-tertiary' 
                          : 'border-white/30 dark:border-white/10 hover:shadow-xl'
                      }`}
                    >
                      {plan.plan === 'premium' && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
                          BEST VALUE
                        </div>
                      )}

                      <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 bg-primary/10`}>
                        {plan.icon}
                      </div>

                      <h3 className="text-xl font-bold mb-1 text-on-surface">{plan.name}</h3>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-4">{plan.description}</p>
                      
                      <div className="mb-6 flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-extrabold text-on-surface">{plan.price}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">/ MONTH</span>
                      </div>

                      <ul className="w-full space-y-3 mb-6 text-left flex-1 border-t border-primary/5 pt-4">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm text-on-surface">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleSelectPlan(plan.plan)}
                        disabled={checkoutLoading}
                        className="w-full py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-gradient-to-r from-primary to-primary-container text-white shadow-md hover:scale-[1.02] disabled:opacity-50"
                      >
                        {checkoutLoading ? 'Processing...' : 'SELECT PLAN'}
                      </button>
                    </motion.div>
                  ))}
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* 5. CANCELLATION CONFIRMATION MODAL */}
        <AnimatePresence>
          {showCancelModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              
              {/* Backdrop Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCancelModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/95 dark:bg-surface-container-high/95 backdrop-blur-2xl rounded-3xl border border-red-500/20 p-8 shadow-2xl relative w-full max-w-md z-10 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
                  <X className="w-8 h-8 text-red-500" />
                </div>

                <h3 className="text-2xl font-extrabold tracking-tight text-on-surface mb-2">Pause Your Spiritual Path?</h3>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
                  Are you sure you want to cancel your {currentRole} plan? You will lose access to matches, unlimited messaging, and priority soul rankings at the end of this billing period ({formattedEndDate}).
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setShowCancelModal(false)}
                    className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-primary to-primary-container text-white shadow-md hover:scale-[1.01] transition-transform"
                  >
                    Keep My Active Plan
                  </button>

                  <button
                    onClick={handleCancel}
                    disabled={cancelLoading}
                    className="w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-xs bg-white/60 dark:bg-black/20 hover:bg-red-50 dark:hover:bg-red-950/20 text-red-500 dark:text-red-400 border border-red-200 dark:border-red-950/50 transition-all"
                  >
                    {cancelLoading ? 'Canceling...' : 'Yes, Cancel Subscription'}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Global Toast Notification */}
        <AnimatePresence>
          {toast && (
            <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200]">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className={`px-6 py-3 rounded-full shadow-2xl backdrop-blur-md border border-white/40 flex items-center gap-3 text-white font-semibold text-sm
                  ${toast.type === 'error' ? 'bg-red-500/80 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'bg-green-500/80 shadow-[0_0_20px_rgba(34,197,94,0.4)]'}`}
              >
                {toast.type === 'error' ? '⚠️' : '✅'} {toast.message}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </ResponsiveLayout>
  );
}
