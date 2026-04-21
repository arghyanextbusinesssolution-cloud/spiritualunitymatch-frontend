'use client';

import Link, { LinkProps } from 'next/link';
import { useLoading } from '@/contexts/LoadingContext';
import { ReactNode } from 'react';

interface LoadingLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * A wrapper around next/link that automatically triggers the 
 * global page transition loader before navigating.
 */
export function LoadingLink({ children, onClick, ...props }: LoadingLinkProps) {
  const { startLoading } = useLoading();

  const handleClick = () => {
    startLoading();
    if (onClick) onClick();
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
