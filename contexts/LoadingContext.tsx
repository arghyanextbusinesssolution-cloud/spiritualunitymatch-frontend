'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface LoadingContextType {
  isPageLoading: boolean;
  setIsPageLoading: (loading: boolean) => void;
  startLoading: () => void;
  stopLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isPageLoading, setIsPageLoading] = useState(false);

  const startLoading = useCallback(() => setIsPageLoading(true), []);
  const stopLoading = useCallback(() => setIsPageLoading(false), []);

  return (
    <LoadingContext.Provider
      value={{
        isPageLoading,
        setIsPageLoading,
        startLoading,
        stopLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
