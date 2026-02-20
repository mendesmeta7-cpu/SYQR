import React, { useEffect } from 'react';
import { useQRCode } from '../../hooks/useQRCode';
import { Button, Card } from '../ui';
import { Download, Share2 } from 'lucide-react';
import type { Options } from 'qr-code-styling';

interface QRCodeDisplayProps {
    data: string;
    logo?: string;
}

export const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({ data, logo }) => {
    const { ref, update, download } = useQRCode(data);

    useEffect(() => {
        // Dynamically update based on logo or data
        const options: Partial<Options> = {
            data: data,
            dotsOptions: {
                type: 'rounded',
                gradient: {
                    type: 'linear',
                    rotation: 45,
                    colorStops: [
                        { offset: 0, color: '#00f5ff' }, // neon-cyan
                        { offset: 1, color: '#1d4ed8' }  // deep-blue
                    ]
                }
            },
            cornersSquareOptions: {
                type: 'extra-rounded',
                color: '#00f5ff',
            },
            cornersDotOptions: {
                type: 'dot',
                color: '#1d4ed8',
            },
            image: logo, // Logo URL
            imageOptions: {
                hideBackgroundDots: true,
                imageSize: 0.4,
                margin: 5
            }
        };
        update(options);
    }, [data, logo, update]);

    const handleDownload = (ext: 'png' | 'svg') => {
        download(ext, `syqr-${ext.toUpperCase()}`);
    };

    return (
        <Card className="flex flex-col items-center justify-center gap-8 w-full max-w-md mx-auto p-10 bg-white/5 border-white/5">
            <div className="relative">
                {/* Subtle glow behind QR */}
                <div className="absolute opacity-20"
                    style={{ inset: '-1rem', backgroundColor: 'var(--neon-glow)', borderRadius: '32px', filter: 'blur(32px)' }} />

                <div
                    ref={ref}
                    className="relative p-6 transition-all duration-500 border border-white/10"
                    style={{
                        width: 'fit-content',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                    }}
                />
            </div>

            <div className="flex flex-col gap-4 w-full mt-2">
                <div className="flex gap-4 w-full">
                    <Button
                        variant="primary"
                        fullWidth
                        onClick={() => handleDownload('png')}
                        disabled={!data}
                        style={{ borderRadius: '20px', paddingTop: '1rem', paddingBottom: '1rem' }}
                    >
                        <span className="flex items-center font-bold">
                            PNG <Download size={20} className="ml-2" />
                        </span>
                    </Button>
                    <Button
                        variant="secondary"
                        fullWidth
                        onClick={() => handleDownload('svg')}
                        disabled={!data}
                        style={{ borderRadius: '20px', paddingTop: '1rem', paddingBottom: '1rem', borderColor: 'rgba(255,255,255,0.2)', color: 'white' }}
                    >
                        <span className="flex items-center font-bold">
                            SVG <Download size={20} className="ml-2" />
                        </span>
                    </Button>
                </div>

                {navigator.share && (
                    <Button
                        variant="ghost"
                        fullWidth
                        onClick={() => navigator.share({ title: 'SYQR', text: 'Mon QR Code SYQR', url: window.location.href })}
                        disabled={!data}
                        className="flex items-center justify-center gap-2"
                        style={{ color: 'var(--tech-text-secondary)' }}
                    >
                        <Share2 size={20} />
                        <span className="font-medium text-sm">Partager</span>
                    </Button>
                )}
            </div>
        </Card>
    );
};
