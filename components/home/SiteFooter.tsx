"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Twitter, Facebook, Instagram } from "lucide-react";

const LOGO = "https://res.cloudinary.com/dxx54fccl/image/upload/v1776788210/logo_svnirs.webp";

const productLinks = [
  { label: "Pricing", href: "/plans" },
  { label: "Sign In", href: "/auth/login" },
  { label: "Documentation", href: "#" },
];

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact Us", href: "/contact" },
];

const legalLinks = [
  { label: "Terms & Conditions", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Sitemap", href: "#" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative text-white overflow-hidden">
      {/* ── Red to Pink Gradient Background ── */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to right, #ff1a1a 0%, #ff8080 50%, #ffcccc 100%)",
        }}
      />

      <div className="section-inner relative z-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Logo & Tagline Column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              {/* Using a double bubble icon to match the image's logo style */}
              <div className="relative flex items-center justify-center">
                <MessageSquare className="w-10 h-10 fill-white text-white opacity-90" />
                <MessageSquare className="w-8 h-8 fill-white text-white absolute -right-2 -top-1 border-2 border-[#ff1a1a] rounded-lg" />
              </div>
            </div>
            <p className="text-white font-medium text-sm sm:text-base leading-tight max-w-[240px]">
              Talk, Connect, Fall in Love — Your Journey Starts Here
            </p>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-bold mb-6 text-white tracking-wide">Product</h4>
            <ul className="space-y-4">
              {productLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/80 hover:text-white text-sm transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold mb-6 text-white tracking-wide">Company</h4>
            <ul className="space-y-4">
              {companyLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/80 hover:text-white text-sm transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-sm font-bold mb-6 text-white tracking-wide">Legal</h4>
            <ul className="space-y-4">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-white/80 hover:text-white text-sm transition-colors font-medium">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons Column (Stacked Right) */}
          <div className="md:col-span-2 flex flex-col md:items-end gap-6 pt-2">
            <Link href="#" className="text-white/90 hover:text-white transition-transform hover:scale-110">
              <Twitter className="w-5 h-5 fill-white" />
            </Link>
            <Link href="#" className="text-white/90 hover:text-white transition-transform hover:scale-110">
              <Facebook className="w-5 h-5 fill-white" />
            </Link>
            <Link href="#" className="text-white/90 hover:text-white transition-transform hover:scale-110">
              <Instagram className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-medium tracking-wide uppercase">
          <p className="text-white/70">
            © Copyright {year}. All Rights Reserved by Aditama
          </p>
          <p className="text-white/60">
            Designed with ✨ for Spiritual Unity Match
          </p>
        </div>
      </div>
    </footer>
  );
}
