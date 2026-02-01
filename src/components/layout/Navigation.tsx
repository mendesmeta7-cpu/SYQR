import React from 'react';
import { clsx } from 'clsx';
import { Wifi, Link } from 'lucide-react';

interface NavigationProps {
    activeTab: 'wifi' | 'link';
    onTabChange: (tab: 'wifi' | 'link') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex bg-navy p-1 rounded-xl mb-6 relative">
            <div
                className={clsx(
                    "absolute top-1 bottom-1 w-1/2 bg-white/10 rounded-lg transition-transform duration-300 ease-in-out",
                    activeTab === 'link' ? 'translate-x-[100%]' : 'translate-x-0'
                )}
            />
            <button
                className={clsx(
                    "flex-1 flex items-center justify-center p-3 rounded-lg z-10 transition-colors",
                    activeTab === 'wifi' ? 'text-[var(--tech-cyan)] font-bold' : 'text-[var(--tech-text-secondary)]'
                )}
                onClick={() => onTabChange('wifi')}
            >
                <Wifi size={18} className="mr-2" /> Wi-Fi
            </button>
            <button
                className={clsx(
                    "flex-1 flex items-center justify-center p-3 rounded-lg z-10 transition-colors",
                    activeTab === 'link' ? 'text-[var(--tech-cyan)] font-bold' : 'text-[var(--tech-text-secondary)]'
                )}
                onClick={() => onTabChange('link')}
            >
                <Link size={18} className="mr-2" /> Lien
            </button>
        </div>
    );
};
