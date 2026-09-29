"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Sparkles } from "lucide-react";

const LOGO = "/logo2.png";

const productLinks = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Sign In", href: "/auth/login" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#0b0518] via-[#090414] to-[#040108] text-white relative overflow-hidden border-t border-purple-500/20">
      {/* Top glowing gradient line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-purple-500 via-pink-500 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">

          {/* Logo & Tagline Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="mb-6 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20 inline-block hover:scale-[1.02] transition-transform">
              <div className="relative w-[190px] h-[50px]">
                <Image
                  src={LOGO}
                  alt="Spiritual Unity Match Logo"
                  fill
                  className="object-contain object-left"
                  sizes="190px"
                  priority
                />
              </div>
            </div>
            <p className="text-purple-200/70 font-medium text-sm leading-relaxed max-w-[280px] mb-6">
              Talk, Connect, Fall in Love — Your Spiritual Journey Starts Here
            </p>

            {/* Social Icons Row */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/share/1BozCxJHf4/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-purple-900/40 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-md"
              >
                <Facebook className="w-4 h-4 text-purple-200" />
              </a>
              <a
                href="https://www.instagram.com/spiritualunitymatch?stkn=bnc2NnU5NzV6bGtw"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-purple-900/40 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 border border-purple-500/30 flex items-center justify-center transition-all hover:scale-110 shadow-md"
              >
                <Instagram className="w-4 h-4 text-purple-200" />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 tracking-widest uppercase">Product</h4>
            <ul className="space-y-3.5">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-purple-200/70 hover:text-pink-300 text-sm transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 tracking-widest uppercase">Company</h4>
            <ul className="space-y-3.5">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-purple-200/70 hover:text-pink-300 text-sm transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 tracking-widest uppercase">Legal</h4>
            <ul className="space-y-3.5">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-purple-200/70 hover:text-pink-300 text-sm transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Stay Connected Column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 tracking-widest uppercase">Stay Connected</h4>
            <p className="text-purple-200/60 text-sm mb-5 leading-relaxed">
              Get spiritual insights & community updates.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-full transition-all hover:from-purple-500 hover:to-pink-500 hover:scale-105 shadow-lg shadow-purple-900/50 border border-white/10"
            >
              <Sparkles className="w-3.5 h-3.5" /> Join Free
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-purple-500/15 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
          <p className="text-purple-300/50">
            © Copyright {year}. All Rights Reserved by Spiritual Unity Match
          </p>
          <p className="text-purple-300/60 flex items-center gap-1">
            Designed with <Sparkles className="w-3.5 h-3.5 text-pink-400" /> for Spiritual Unity Match
          </p>
        </div>
      </div>
    </footer>
  );
}
