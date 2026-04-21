'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface SubscriptionContextType {
    isUpgradeModalOpen: boolean;
    showUpgradeModal: () => void;
    hideUpgradeModal: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    const pathname = usePathname();

    const showUpgradeModal = () => setIsUpgradeModalOpen(true);
    const hideUpgradeModal = () => setIsUpgradeModalOpen(false);

    // Auto-close modal when route changes
    useEffect(() => {
        hideUpgradeModal();
    }, [pathname]);

    return (
        <SubscriptionContext.Provider
            value={{
                isUpgradeModalOpen,
                showUpgradeModal,
                hideUpgradeModal,
            }}
        >
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
}
