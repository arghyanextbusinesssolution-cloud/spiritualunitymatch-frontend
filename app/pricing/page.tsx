"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DefaultNavbar from "@/components/DefaultNavbar";
import SiteFooter from "@/components/home/SiteFooter";
import { useAuth } from "@/contexts/AuthContext";
import { Check, Sparkles, Leaf, Star, ShieldCheck, HelpCircle } from "lucide-react";

export default function PublicPricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { user } = useAuth();
  const router = useRouter();

  const handleSelectPlan = (planName: string) => {
    if (user) {
      router.push("/plans");
    } else {
      router.push("/auth/register");
    }
  };

  const discountMultiplier = billingCycle === "yearly" ? 0.8 : 1;

  const plans = [
    {
      name: "Basic",
      price: "$0",
      period: "forever",
      description: "Explore the community and begin your journey.",
      icon: <Leaf className="w-8 h-8 text-emerald-500" />,
      popular: false,
      color: "border-gray-200",
      buttonText: "Start Free",
      buttonClass: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50",
      features: [
        "Create a detailed spiritual profile",
        "View up to 10 profiles per day",
        "Send limited initial likes",
        "Access basic filter options",
        "Participate in open community polls",
      ],
      notIncluded: [
        "Direct messaging",
        "See who liked your profile",
        "Detailed soul compatibility reports",
        "Priority match placement",
      ],
    },
    {
      name: "Standard",
      price: billingCycle === "yearly" ? "$15" : "$19",
      period: "per month",
      description: "Our most popular plan for active soul seekers.",
      icon: <Star className="w-8 h-8 text-purple-600 fill-purple-600" />,
      popular: true,
      color: "border-purple-500 shadow-xl ring-2 ring-purple-500/20",
      buttonText: "Join Standard",
      buttonClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105",
      features: [
        "Unlimited profile browsing & swipes",
        "Full unlimited messaging",
        "See who liked your profile",
        "Advanced spiritual tag search",
        "Improved profile visibility in feed",
        "Access to conscious event listings",
      ],
      notIncluded: [
        "Personal matchmaking guidance",
        "Soul compatibility deep reports",
      ],
    },
    {
      name: "Premium",
      price: billingCycle === "yearly" ? "$31" : "$39",
      period: "per month",
      description: "The ultimate divine connection experience.",
      icon: <Sparkles className="w-8 h-8 text-amber-500" />,
      popular: false,
      color: "border-amber-400 shadow-lg",
      buttonText: "Get Premium",
      buttonClass: "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:shadow-lg hover:scale-105",
      features: [
        "Everything in Standard",
        "Priority search placement across all feeds",
        "Comprehensive Soul Compatibility Reports",
        "Unlimited rewinds & super likes",
        "Personalized matchmaking recommendations",
        "VIP customer & spiritual support 24/7",
      ],
      notIncluded: [],
    },
  ];

  const faqs = [
    {
      q: "Can I upgrade or downgrade my plan anytime?",
      a: "Yes! You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings with no hidden fees.",
    },
    {
      q: "Is there a free trial?",
      a: "Our Basic tier is 100% free forever so you can create a profile and explore matches before upgrading to Standard or Premium.",
    },
    {
      q: "How does billing work?",
      a: "Subscriptions renew automatically based on your selected cycle (monthly or yearly). You can cancel renewal anytime before the cycle ends.",
    },
    {
      q: "What payment methods are supported?",
      a: "We accept all major credit cards, debit cards, Apple Pay, Google Pay, and secure Stripe checkout payments.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <DefaultNavbar />

      <main className="pt-24 pb-20">
        {/* Header */}
        <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-purple-50/60 via-pink-50/20 to-white text-center">
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest mb-6">
                ✨ Simple & Transparent Pricing
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                Choose Your <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">Spiritual Path</span>
              </h1>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-10">
                Transparent plans designed to support authentic soul connections. No hidden charges or surprise commitments.
              </p>

              {/* Billing Toggle */}
              <div className="inline-flex items-center gap-4 bg-gray-100 p-1.5 rounded-full shadow-inner border border-gray-200">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    billingCycle === "monthly"
                      ? "bg-white text-purple-700 shadow-md"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    billingCycle === "yearly"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Yearly <span className="bg-amber-300 text-purple-950 text-[10px] font-black px-2 py-0.5 rounded-full">Save 20%</span>
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`relative bg-white rounded-3xl p-8 border ${plan.color} flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-purple-50 rounded-2xl">{plan.icon}</div>
                    <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-100/60 px-3 py-1 rounded-full">
                      {plan.name}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-500 text-xs mb-6 min-h-[32px]">{plan.description}</p>

                  <div className="mb-8 flex items-baseline gap-1">
                    <span className="text-5xl font-extrabold text-gray-900 tracking-tight">{plan.price}</span>
                    <span className="text-xs font-bold text-gray-400 uppercase">{plan.period}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">Features included:</div>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectPlan(plan.name)}
                  className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all ${plan.buttonClass}`}
                >
                  {plan.buttonText}
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="max-w-4xl mx-auto px-4 mt-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-base">Got questions about joining or upgrading? We are here to help.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 text-base mb-2 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600 shrink-0" />
                  {faq.q}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security Banner */}
        <section className="max-w-4xl mx-auto px-4 mt-16">
          <div className="bg-purple-50 rounded-3xl p-8 border border-purple-100 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 rounded-full bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-lg">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-purple-950 mb-1">Encrypted & Guaranteed Protection</h4>
              <p className="text-purple-800 text-sm">
                All transactions are processed through end-to-end encrypted financial gateways. Cancel or modify subscription plans effortlessly at any time.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
