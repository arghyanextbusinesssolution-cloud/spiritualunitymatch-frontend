import { LoadingLink } from './LoadingLink';
import Image from 'next/image';

interface SpiritualUnityLogoProps {
  className?: string;
  width?: number;
  height?: number;
  showText?: boolean;
}

export const SpiritualUnityLogo = ({
  className = "",
  width = 180,
  height = 52,
  showText = false,
}: SpiritualUnityLogoProps) => {
  return (
    <LoadingLink
      href="/"
      className={`relative z-20 flex items-center space-x-2 transition-opacity hover:opacity-90 ${className}`}
    >
      <div className="relative flex items-center" style={{ width, height }}>
        <Image
          src="/logo2.png"
          alt="Spiritual Unity Logo"
          fill
          className="object-contain object-left"
          priority
        />
      </div>
      {showText && (
        <span className="font-bold text-gray-800 dark:text-white text-lg tracking-tight">
          Spiritual Unity Match
        </span>
      )}
    </LoadingLink>
  );
};