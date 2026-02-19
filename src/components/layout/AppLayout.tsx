import React from 'react';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden p-6 gap-8">
                {/* Background Shapes */}
                <div className="fluid-bg">
                    <div className="fluid-shape shape-1" />
                    <div className="fluid-shape shape-2" />
                </div>

                {/* Header */}
                <header className="z-10 flex flex-col items-center gap-2 mb-4 animate-fade-in">
                    <div 
                        className="nav-logo" 
                        style={{ 
                            WebkitMaskImage: `url(${import.meta.env.BASE_URL}logo.png)`,
                            maskImage: `url(${import.meta.env.BASE_URL}logo.png)` 
                        }} 
                    />
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--tech-cyan)] to-[var(--tech-blue)] drop-shadow-lg">
                        SYQR
                    </h1>
                    <p className="text-[var(--tech-text-secondary)] text-sm max-w-xs text-center">
                        Génération QR sécurisée, locale et instantanée.
                    </p>
                </header>

                {/* Main Content */}
                <main className="w-full max-w-md z-10 flex flex-col gap-6">
                    {children}
                </main>
            </div>

            <footer className="mt-auto text-xs text-[var(--tech-text-secondary)] py-4 opacity-60">
                © {new Date().getFullYear()} développé par Synapta. Aucune donnée stockée.
            </footer>
        </>
    );
};
