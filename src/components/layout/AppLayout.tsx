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
                <header className="z-10 flex flex-col items-center gap-4 mb-4 animate-fade-in text-center">
                    <div
                        className="nav-logo filter drop-shadow-[0_0_15px_var(--neon-glow)]"
                        style={{
                            WebkitMaskImage: `url(${import.meta.env.BASE_URL}logo.png)`,
                            maskImage: `url(${import.meta.env.BASE_URL}logo.png)`,
                            backgroundColor: 'var(--neon-cyan)',
                            width: '64px',
                            height: '64px'
                        }}
                    />
                    <div className="space-y-1">
                        <h1 className="text-5xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_var(--neon-glow)]">
                            SYQR
                        </h1>
                        <p className="text-[var(--tech-text-secondary)] text-sm font-medium tracking-wide uppercase opacity-80">
                            Génération QR Instantanée
                        </p>
                    </div>
                </header>

                {/* Main Content */}
                <main className="w-full max-w-md z-10 flex flex-col gap-8">
                    {children}
                </main>

                <footer className="z-10 mt-8 text-center">
                    <p className="text-[10px] text-[var(--tech-text-secondary)] font-mono tracking-widest uppercase opacity-40">
                        © {new Date().getFullYear()} Synapta • No Data Retention • Local Only
                    </p>
                </footer>
            </div>
        </>
    );
};
