import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import { SocketProvider } from '@/contexts/SocketContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { LoadingProvider } from '@/contexts/LoadingContext';
import { TransitionLoader } from '@/components/TransitionLoader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spiritual Unity Match - Find Alignment Before Attraction',
  description: 'Spiritual Unity Match - A conscious dating platform for spiritual connections',
  icons: {
    icon: 'https://res.cloudinary.com/dxx54fccl/image/upload/v1776788210/logo_svnirs.webp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="pt-4">
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
        </div>
      </body>
    </html>
  );
}

