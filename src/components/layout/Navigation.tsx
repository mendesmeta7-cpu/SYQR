import React from 'react';
import { clsx } from 'clsx';
import { Wifi, Link } from 'lucide-react';

interface NavigationProps {
    activeTab: 'wifi' | 'link';
    onTabChange: (tab: 'wifi' | 'link') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    return (
        <div className="flex nav-container p-1.5 mb-8 relative border border-white/5 backdrop-blur-xl w-fit mx-auto min-w-[300px]">
            <div
                className={clsx(
                    "absolute nav-pill transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
                    activeTab === 'link' ? 'translate-x-[calc(100%)]' : 'translate-x-0'
                )}
                style={{
                    transform: activeTab === 'link' ? 'translateX(100%)' : 'translateX(0)'
                }}
            />
            <button
                className={clsx(
                    "flex-1 flex items-center justify-center py-3 px-8 z-10 transition-all duration-300",
                    activeTab === 'wifi' ? 'text-white' : 'text-secondary opacity-60'
                )}
                style={{ borderRadius: '999px' }}
                onClick={() => onTabChange('wifi')}
            >
                <Wifi size={20} className={clsx("mr-3", activeTab === 'wifi' && "text-neon-cyan")}
                    style={{ color: activeTab === 'wifi' ? 'var(--neon-cyan)' : 'inherit' }} />
                <span className="text-sm font-semibold tracking-wide">Wi-Fi</span>
            </button>
            <button
                className={clsx(
                    "flex-1 flex items-center justify-center py-3 px-8 z-10 transition-all duration-300",
                    activeTab === 'link' ? 'text-white' : 'text-secondary opacity-60'
                )}
                style={{ borderRadius: '999px' }}
                onClick={() => onTabChange('link')}
            >
                <Link size={20} className={clsx("mr-3", activeTab === 'link' && "text-neon-cyan")}
                    style={{ color: activeTab === 'link' ? 'var(--neon-cyan)' : 'inherit' }} />
                <span className="text-sm font-semibold tracking-wide">Lien</span>
            </button>
        </div>
    );
};
