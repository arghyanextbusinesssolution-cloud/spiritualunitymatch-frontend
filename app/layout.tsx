import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { SocketProvider } from "@/contexts/SocketContext";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { TransitionLoader } from "@/components/TransitionLoader";

/* ─── Font Loading ──────────────────────────────────────────────────────────
   Both fonts are subset to latin and display=swap to avoid layout shifts.
   CSS variables allow mixing serif headings + sans body text.
────────────────────────────────────────────────────────────────────────────── */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  preload: true,
  weight: ["400", "500", "600", "700", "800"],
});

/* ─── Site Metadata ──────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://spiritualunitymatch.com"
  ),
  title: {
    default: "Spiritual Unity Match – Find Alignment Before Attraction",
    template: "%s | Spiritual Unity Match",
  },
  description:
    "A conscious dating platform for spiritual souls seeking meaningful, aligned connections. Find depth, intention and spiritual harmony.",
  keywords: [
    "spiritual dating",
    "conscious relationships",
    "spiritual singles",
    "mindful dating",
    "soul connection",
    "spiritual unity",
  ],
  authors: [{ name: "Spiritual Unity Match" }],
  creator: "Next Business Solution",
  publisher: "Spiritual Unity Match",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Spiritual Unity Match – Find Alignment Before Attraction",
    description:
      "Connect with conscious souls who share your spiritual journey.",
    siteName: "Spiritual Unity Match",
    images: [
      {
        url: "https://res.cloudinary.com/dxx54fccl/image/upload/v1776788210/logo_svnirs.webp",
        width: 1200,
        height: 630,
        alt: "Spiritual Unity Match",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Spiritual Unity Match – Find Alignment Before Attraction",
    description:
      "Connect with conscious souls who share your spiritual journey.",
    images: [
      "https://res.cloudinary.com/dxx54fccl/image/upload/v1776788210/logo_svnirs.webp",
    ],
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#7C3AED" },
    { media: "(prefers-color-scheme: dark)", color: "#4C1D95" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ─── Root Layout ────────────────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <LoadingProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <SocketProvider>
                <TransitionLoader />
                {children}
              </SocketProvider>
            </SubscriptionProvider>
          </AuthProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
