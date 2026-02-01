import React from 'react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-6 gap-8">
            {/* Background Shapes */}
            <div className="fluid-bg">
                <div className="fluid-shape shape-1" />
                <div className="fluid-shape shape-2" />
            </div>

            {/* Header */}
            <header className="z-10 flex flex-col items-center gap-2 mb-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[var(--tech-cyan)] to-[var(--tech-blue)] flex items-center justify-center shadow-[var(--shadow-neon)]">
                    {/* Fallback S-Logo if image fails or for cleaner look */}
                    <span className="text-3xl font-bold text-white font-mono">S</span>
                </div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--tech-cyan)] to-[var(--tech-blue)] drop-shadow-lg">
                    Synapta QR
                </h1>
                <p className="text-[var(--tech-text-secondary)] text-sm max-w-xs text-center">
                    Génération QR sécurisée, locale et instantanée.
                </p>
            </header>

            {/* Main Content */}
            <main className="w-full max-w-md z-10 flex flex-col gap-6">
                {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto text-xs text-[var(--tech-text-secondary)] py-4 opacity-60">
                © {new Date().getFullYear()} Synapta. Aucune donnée stockée.
            </footer>
        </div>
    );
};
